import React, { useEffect, useMemo, useState } from "react";

function Market() {
  const [commodity, setCommodity] = useState("Wheat");
  const [stateName, setStateName] = useState("Maharashtra");
  const [district, setDistrict] = useState("");
  const [market, setMarket] = useState("");
  const [date, setDate] = useState(""); // DD/MM/YYYY (optional)

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [payload, setPayload] = useState(null);

  const query = useMemo(() => {
    const p = new URLSearchParams();
    if (commodity) p.set("commodity", commodity);
    if (stateName) p.set("state", stateName);
    if (district) p.set("district", district);
    if (market) p.set("market", market);
    if (date) p.set("date", date);
    p.set("limit", "25");
    return p.toString();
  }, [commodity, stateName, district, market, date]);

  const fetchPrices = async () => {
    setLoading(true);
    setError("");
    try {
      const r = await fetch(`/api/market/prices?${query}`);
      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || "Failed to fetch prices");
      setPayload(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to fetch prices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const records = payload?.records ?? [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">🌾 Live Mandi Prices</h1>
          <p className="mt-1 text-sm text-slate-600">
            Source: {payload?.source ?? "—"} • {payload?.fetchedAt ? new Date(payload.fetchedAt).toLocaleString() : ""}
          </p>
        </div>
        <button
          type="button"
          onClick={fetchPrices}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800"
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <section className="mt-5 rounded-3xl border bg-white p-5">
        <div className="grid gap-3 md:grid-cols-5">
          <div>
            <div className="text-xs font-bold text-slate-600">Commodity</div>
            <input
              value={commodity}
              onChange={(e) => setCommodity(e.target.value)}
              className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
              placeholder="Wheat"
            />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-600">State</div>
            <input
              value={stateName}
              onChange={(e) => setStateName(e.target.value)}
              className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
              placeholder="Maharashtra"
            />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-600">District (optional)</div>
            <input
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
              placeholder="Nashik"
            />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-600">Market (optional)</div>
            <input
              value={market}
              onChange={(e) => setMarket(e.target.value)}
              className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
              placeholder="Nashik"
            />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-600">Arrival date (optional)</div>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
              placeholder="DD/MM/YYYY"
            />
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={fetchPrices}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700"
            disabled={loading}
          >
            Search
          </button>
          <div className="text-sm text-slate-600">
            {payload?.note ? (
              <span className="rounded-lg bg-amber-50 px-2 py-1 text-amber-800">
                {payload.note}
              </span>
            ) : null}
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
            {error}
          </div>
        )}

        <div className="mt-4 overflow-auto rounded-2xl border">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-600">
              <tr>
                <th className="px-4 py-3">Commodity</th>
                <th className="px-4 py-3">Market</th>
                <th className="px-4 py-3">District</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Min</th>
                <th className="px-4 py-3">Modal</th>
                <th className="px-4 py-3">Max</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {records.length === 0 ? (
                <tr>
                  <td className="px-4 py-4 text-slate-600" colSpan={7}>
                    {loading ? "Loading..." : "No records found. Try removing filters (district/market/date)."}
                  </td>
                </tr>
              ) : (
                records.map((r, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-900">{r.commodity}</td>
                    <td className="px-4 py-3">{r.market}</td>
                    <td className="px-4 py-3">{r.district}</td>
                    <td className="px-4 py-3">{r.arrival_date}</td>
                    <td className="px-4 py-3">₹{r.min_price}</td>
                    <td className="px-4 py-3 font-bold">₹{r.modal_price}</td>
                    <td className="px-4 py-3">₹{r.max_price}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default Market;
