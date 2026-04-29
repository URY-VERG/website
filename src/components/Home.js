import React from "react";
import { Link } from "react-router-dom";
import farmImg from "../images/kunal.jpg"; // Ensure this image exists

function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <section className="grid gap-6 md:grid-cols-2 md:items-center">
        <div>
          <p className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
            Farmer-first • Simple • Fast
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Help for farmers, in one place.
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Weather, schemes, learning videos, market rates, and profit calculator—designed for quick use on mobile.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/learning"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700"
            >
              Start Learning
            </Link>
            <Link
              to="/finance"
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50"
            >
              Open Schemes & PDFs
            </Link>
            <Link
              to="/updates"
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50"
            >
              Live Govt Updates
            </Link>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Link to="/weather" className="rounded-2xl border bg-white p-4 hover:bg-slate-50">
              <div className="text-xl">🌤️</div>
              <div className="mt-2 font-bold">Weather</div>
              <div className="text-sm text-slate-600">City-based forecast</div>
            </Link>
            <Link to="/market" className="rounded-2xl border bg-white p-4 hover:bg-slate-50">
              <div className="text-xl">🌾</div>
              <div className="mt-2 font-bold">Market</div>
              <div className="text-sm text-slate-600">Quick price view</div>
            </Link>
            <Link to="/profit-calculator" className="rounded-2xl border bg-white p-4 hover:bg-slate-50">
              <div className="text-xl">💹</div>
              <div className="mt-2 font-bold">Profit</div>
              <div className="text-sm text-slate-600">ROI calculator</div>
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border bg-slate-50">
          <img
            src={farmImg}
            alt="Farm"
            className="h-[340px] w-full object-cover md:h-[420px]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/90 p-4 backdrop-blur">
            <div className="text-sm font-semibold text-slate-900">Quick Help</div>
            <div className="mt-1 text-sm text-slate-700">
              Save links to PDFs, check schemes, and learn step-by-step.
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border bg-white p-6">
        <h2 className="text-xl font-extrabold text-slate-900">Unique features (coming next)</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="font-bold">✅ Offline-ready PDFs</div>
            <div className="text-sm text-slate-600">Important schemes & forms accessible fast.</div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="font-bold">✅ Regional quick tips</div>
            <div className="text-sm text-slate-600">Short actions farmers can do today.</div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="font-bold">✅ Simple UI for mobile</div>
            <div className="text-sm text-slate-600">Big buttons, clear sections, minimal steps.</div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;