import express from "express";
import cors from "cors";
import NodeCache from "node-cache";
import path from "path";

const PORT = Number(process.env.PORT || 5050);
const cache = new NodeCache({ stdTTL: 60 * 10 }); // 10 min cache

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

// --- GOV UPDATES (PIB RSS) --------------------------------------------------
const PIB_RSS_URL = "https://pib.gov.in/RssMain.aspx?ModId=6&Lang=1&Regid=6";

app.get("/api/updates/pib", async (_req, res) => {
  const cached = cache.get("pib:rss");
  if (cached) return res.json(cached);

  try {
    const r = await fetch(PIB_RSS_URL);
    if (!r.ok) throw new Error("Failed to fetch PIB RSS");
    const xml = await r.text();
    // lightweight XML parsing without extra deps
    const items = Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/g)).map((m) => {
      const block = m[1];
      const pick = (tag) => {
        const mm = block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i"));
        return mm?.[1]?.replace(/<!\\[CDATA\\[|\\]\\]>/g, "")?.trim() ?? "";
      };
      return {
        title: pick("title"),
        link: pick("link"),
        pubDate: pick("pubDate"),
        description: pick("description"),
      };
    }).filter((x) => x.title && x.link);

    const payload = { source: "PIB", fetchedAt: new Date().toISOString(), items };
    cache.set("pib:rss", payload);
    res.json(payload);
  } catch (e) {
    res.status(502).json({ error: e?.message || "Failed to fetch updates" });
  }
});

// --- LIVE MARKET PRICES (AGMARKNET via data.gov.in) -------------------------
// Dataset: "Current daily price of various commodities from various markets (Mandi)"
// Resource ID is widely used across examples and docs.
const AGMARKNET_RESOURCE_ID = "9ef84268-d588-465a-a308-a864a43d0070";

function buildAgmarknetUrl({ apiKey, limit, offset, commodity, state, district, market, date }) {
  const u = new URL(`https://api.data.gov.in/resource/${AGMARKNET_RESOURCE_ID}`);
  u.searchParams.set("api-key", apiKey);
  u.searchParams.set("format", "json");
  u.searchParams.set("limit", String(limit ?? 20));
  u.searchParams.set("offset", String(offset ?? 0));

  // Filters (data.gov.in supports filters[field]=value)
  if (commodity) u.searchParams.set("filters[commodity]", commodity);
  if (state) u.searchParams.set("filters[state]", state);
  if (district) u.searchParams.set("filters[district]", district);
  if (market) u.searchParams.set("filters[market]", market);
  if (date) u.searchParams.set("filters[arrival_date]", date); // usually DD/MM/YYYY
  return u.toString();
}

app.get("/api/market/prices", async (req, res) => {
  const {
    commodity = "",
    state = "",
    district = "",
    market = "",
    date = "",
    limit = "20",
    offset = "0",
  } = req.query;

  const apiKey = process.env.DATA_GOV_IN_API_KEY || "";
  const cacheKey = `ag:${commodity}:${state}:${district}:${market}:${date}:${limit}:${offset}:${apiKey ? "k" : "nok"}`;
  const cached = cache.get(cacheKey);
  if (cached) return res.json(cached);

  // If no API key, return demo payload so UI still works.
  if (!apiKey) {
    const demo = {
      source: "demo",
      note: "Set DATA_GOV_IN_API_KEY in server env for live Agmarknet prices.",
      fetchedAt: new Date().toISOString(),
      records: [
        { commodity: "Wheat", state: "Maharashtra", district: "Nashik", market: "Nashik", variety: "-", arrival_date: "29/04/2026", min_price: "2200", max_price: "2500", modal_price: "2350", unit: "₹/Quintal" },
        { commodity: "Soyabean", state: "Maharashtra", district: "Kolhapur", market: "Kolhapur", variety: "-", arrival_date: "29/04/2026", min_price: "3800", max_price: "4300", modal_price: "4050", unit: "₹/Quintal" },
      ],
    };
    cache.set(cacheKey, demo, 60);
    return res.json(demo);
  }

  try {
    const url = buildAgmarknetUrl({
      apiKey,
      limit: Number(limit) || 20,
      offset: Number(offset) || 0,
      commodity: String(commodity).trim() || undefined,
      state: String(state).trim() || undefined,
      district: String(district).trim() || undefined,
      market: String(market).trim() || undefined,
      date: String(date).trim() || undefined,
    });
    const r = await fetch(url);
    if (!r.ok) throw new Error("Failed to fetch market prices");
    const data = await r.json();
    const payload = {
      source: "data.gov.in (AGMARKNET)",
      fetchedAt: new Date().toISOString(),
      records: Array.isArray(data?.records) ? data.records : [],
      raw: { count: data?.count ?? null, total: data?.total ?? null },
    };
    cache.set(cacheKey, payload);
    res.json(payload);
  } catch (e) {
    res.status(502).json({ error: e?.message || "Failed to fetch market prices" });
  }
});

// --- LIVESTOCK ADVISORY -----------------------------------------------------
const monthNames = [
  "January","February","March","April","May","June","July","August","September","October","November","December"
];

function livestockAdvice(monthIdx) {
  // Generic high-signal guidance (non-medical). Encourage local vet for treatment.
  const hotMonths = new Set([3, 4, 5]); // Apr-Jun
  const monsoonMonths = new Set([6, 7, 8]); // Jul-Sep
  const winterMonths = new Set([11, 0, 1]); // Dec-Feb

  const tips = [];
  if (hotMonths.has(monthIdx)) {
    tips.push("Heat stress: keep shade + ventilation, plenty of clean water, avoid transport at noon.");
    tips.push("Milk drop prevention: mineral mixture + electrolytes as advised, keep shed cool.");
  }
  if (monsoonMonths.has(monthIdx)) {
    tips.push("Monsoon: keep floor dry, control ticks/flies, clean drinking water, avoid muddy standing.");
    tips.push("Deworming schedule: consult local vet for deworming timing.");
  }
  if (winterMonths.has(monthIdx)) {
    tips.push("Winter: prevent cold stress for calves, dry bedding, avoid dampness.");
  }
  tips.push("Vaccination: follow your local veterinary department schedule for FMD/HS/BCQ etc.");
  tips.push("If animal is sick (fever, no appetite, diarrhea): contact vet immediately—don’t self-medicate.");
  return tips;
}

app.get("/api/livestock/advisory", (req, res) => {
  const now = new Date();
  const month = String(req.query.month ?? "");
  const monthIdx = month ? Math.max(0, Math.min(11, Number(month) - 1)) : now.getMonth();
  res.json({
    month: monthNames[monthIdx],
    monthIdx: monthIdx + 1,
    tips: livestockAdvice(monthIdx),
    links: [
      { label: "DAHD (Animal Husbandry) portal", url: "https://dahd.nic.in/" },
      { label: "NADRS (Disease reporting)", url: "https://nadrsapps.gov.in/" },
      { label: "PM-KISAN portal", url: "https://pmkisan.gov.in/" },
    ],
    fetchedAt: new Date().toISOString(),
  });
});

// --- SIMPLE PROXY FOR EXTERNAL FILES (PDFS/OTHER) -------------------------
// Allows the client to preview or download files that block embedding or
// set restrictive headers. This proxy applies basic checks to avoid
// proxying internal hostnames. Response is streamed/backed as a buffer.
app.get("/api/proxy", async (req, res) => {
  const raw = String(req.query.url ?? "");
  if (!raw) return res.status(400).json({ error: "missing url query param" });

  let u;
  try {
    u = new URL(raw);
  } catch (e) {
    return res.status(400).json({ error: "invalid url" });
  }

  // only allow http(s)
  if (!["http:", "https:"].includes(u.protocol)) {
    return res.status(400).json({ error: "unsupported protocol" });
  }

  // disallow localhost and private addresses to avoid open-proxy risk
  const forbiddenHosts = new Set(["localhost", "127.0.0.1", "::1"]);
  if (forbiddenHosts.has(u.hostname)) {
    return res.status(400).json({ error: "hostname not allowed" });
  }

  try {
    const r = await fetch(u.toString());
    if (!r.ok) return res.status(502).json({ error: "failed to fetch resource" });

    const contentType = r.headers.get("content-type") || "application/octet-stream";
    res.setHeader("content-type", contentType);

    // if download=1, force download filename
    if (String(req.query.download ?? "") === "1") {
      const filename = path.basename(u.pathname) || "file";
      res.setHeader("content-disposition", `attachment; filename="${filename}"`);
    }

    // stream the response body
    const arrayBuffer = await r.arrayBuffer();
    res.send(Buffer.from(arrayBuffer));
  } catch (e) {
    res.status(502).json({ error: e?.message || "fetch failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

