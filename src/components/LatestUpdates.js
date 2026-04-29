import React, { useEffect, useMemo, useState } from "react";

const PIB_RSS_URL = "https://pib.gov.in/RssMain.aspx?ModId=6&Lang=1&Regid=6";

function parseRss(xmlText) {
  const doc = new DOMParser().parseFromString(xmlText, "text/xml");
  const items = Array.from(doc.querySelectorAll("item")).map((item) => ({
    title: item.querySelector("title")?.textContent?.trim() ?? "",
    link: item.querySelector("link")?.textContent?.trim() ?? "",
    pubDate: item.querySelector("pubDate")?.textContent?.trim() ?? "",
    description: item.querySelector("description")?.textContent?.trim() ?? "",
  }));
  return items.filter((x) => x.title && x.link);
}

function isAgriRelated(item) {
  const t = `${item.title} ${item.description}`.toLowerCase();
  return [
    "agriculture",
    "farm",
    "farmer",
    "kisan",
    "pm-kisan",
    "pmkisan",
    "crop",
    "irrigation",
    "soil",
    "horticulture",
    "fisheries",
    "dairy",
  ].some((k) => t.includes(k));
}

export default function LatestUpdates({ limit = 8 }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setError("");
      try {
        // CORS can block RSS fetch; if so, show a graceful message + portal link.
        const res = await fetch(PIB_RSS_URL);
        if (!res.ok) throw new Error("Failed to load updates");
        const xml = await res.text();
        const parsed = parseRss(xml);
        if (cancelled) return;
        setItems(parsed);
        setLastUpdated(new Date());
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Failed to load updates");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    const id = setInterval(run, 10 * 60 * 1000); // refresh every 10 minutes
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const filtered = useMemo(() => {
    const agri = items.filter(isAgriRelated);
    return (agri.length > 0 ? agri : items).slice(0, limit);
  }, [items, limit]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Latest Government Updates
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Source: PIB press releases (auto refresh).
          </p>
        </div>
        <a
          href="https://www.pib.gov.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-900 hover:bg-slate-50"
        >
          Open PIB Portal
        </a>
      </div>

      {lastUpdated && (
        <div className="mt-2 text-xs text-slate-500">
          Last updated: {lastUpdated.toLocaleString()}
        </div>
      )}

      {loading && (
        <div className="mt-4 rounded-2xl border bg-white p-4 text-sm text-slate-600">
          Loading latest updates…
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
          Updates couldn’t be loaded in-browser (sometimes RSS is blocked by CORS). Use the
          “Open PIB Portal” button for live updates.
        </div>
      )}

      {!loading && !error && (
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {filtered.map((it) => (
            <a
              key={it.link}
              href={it.link}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border bg-white p-4 hover:bg-slate-50"
            >
              <div className="text-sm font-extrabold text-slate-900">{it.title}</div>
              {it.pubDate && (
                <div className="mt-1 text-xs text-slate-500">{it.pubDate}</div>
              )}
            </a>
          ))}
        </div>
      )}
    </section>
  );
}

