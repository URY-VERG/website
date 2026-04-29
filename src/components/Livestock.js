import React, { useEffect, useState } from "react";

export default function Livestock() {
  const [month, setMonth] = useState(String(new Date().getMonth() + 1));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  const fetchAdvice = async () => {
    setLoading(true);
    setError("");
    try {
      const r = await fetch(`/api/livestock/advisory?month=${encodeURIComponent(month)}`);
      const d = await r.json();
      if (!r.ok) throw new Error(d?.error || "Failed to fetch advisory");
      setData(d);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to fetch advisory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">🐄 पशुसंवर्धन (Livestock) Help</h1>
          <p className="mt-1 text-sm text-slate-600">
            Monthly guidance + official links. For treatment always contact your local vet.
          </p>
        </div>
        <button
          type="button"
          onClick={fetchAdvice}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800"
          disabled={loading}
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      <section className="mt-5 rounded-3xl border bg-white p-5">
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <div className="text-xs font-bold text-slate-600">Select month</div>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <option value={String(i + 1)} key={i}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2 flex items-end gap-2">
            <button
              type="button"
              className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700"
              onClick={fetchAdvice}
              disabled={loading}
            >
              Get advice
            </button>
            {data?.month ? (
              <div className="text-sm text-slate-600">
                Showing: <span className="font-bold text-slate-900">{data.month}</span>
              </div>
            ) : null}
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
            {error}
          </div>
        )}

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {(data?.tips ?? []).map((t, idx) => (
            <div key={idx} className="rounded-2xl border bg-slate-50 p-4">
              <div className="text-sm font-bold text-slate-900">Tip #{idx + 1}</div>
              <div className="mt-1 text-sm text-slate-700">{t}</div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <div className="text-sm font-extrabold text-slate-900">Official links</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {(data?.links ?? []).map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-900 hover:bg-slate-50"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

