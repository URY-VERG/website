import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar({ cart = [], cartCount }) {
  const count =
    typeof cartCount === "number"
      ? cartCount
      : cart.reduce((sum, item) => sum + (item?.qty ?? 0), 0);

  const [open, setOpen] = useState(false);

  const linkClassName = ({ isActive }) =>
    [
      "rounded-lg px-3 py-2 text-sm font-medium transition",
      isActive ? "bg-emerald-600 text-white" : "text-slate-700 hover:bg-slate-100",
    ].join(" ");

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-extrabold tracking-tight text-slate-900">
          <span className="text-xl">ANNADATA</span>
          <span className="text-lg">🌱🌾</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <NavLink to="/" className={linkClassName} end>Home</NavLink>
          <NavLink to="/learning" className={linkClassName}>Learning</NavLink>
          <NavLink to="/weather" className={linkClassName}>Weather</NavLink>
          <NavLink to="/market" className={linkClassName}>Market</NavLink>
          <NavLink to="/livestock" className={linkClassName}>Livestock</NavLink>
          <NavLink to="/products" className={linkClassName}>Products</NavLink>
          <NavLink to="/finance" className={linkClassName}>Schemes</NavLink>
          <NavLink to="/updates" className={linkClassName}>Updates</NavLink>
          <NavLink to="/profit-calculator" className={linkClassName}>Profit</NavLink>
          <NavLink to="/shopping" className={linkClassName}>Shop</NavLink>
          <NavLink
            to="/checkout"
            className={({ isActive }) =>
              [
                "ml-1 rounded-lg px-3 py-2 text-sm font-semibold transition",
                isActive ? "bg-slate-900 text-white" : "bg-slate-900 text-white hover:bg-slate-800",
              ].join(" ")
            }
          >
            Cart ({count})
          </NavLink>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          Menu
        </button>
      </div>

      {open && (
        <div className="border-t bg-white md:hidden">
          <div className="mx-auto grid max-w-6xl gap-1 px-4 py-3">
            <NavLink to="/" className={linkClassName} end onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/learning" className={linkClassName} onClick={() => setOpen(false)}>Learning</NavLink>
            <NavLink to="/weather" className={linkClassName} onClick={() => setOpen(false)}>Weather</NavLink>
            <NavLink to="/market" className={linkClassName} onClick={() => setOpen(false)}>Market</NavLink>
            <NavLink to="/livestock" className={linkClassName} onClick={() => setOpen(false)}>Livestock</NavLink>
            <NavLink to="/products" className={linkClassName} onClick={() => setOpen(false)}>Products</NavLink>
            <NavLink to="/finance" className={linkClassName} onClick={() => setOpen(false)}>Schemes</NavLink>
            <NavLink to="/updates" className={linkClassName} onClick={() => setOpen(false)}>Updates</NavLink>
            <NavLink to="/profit-calculator" className={linkClassName} onClick={() => setOpen(false)}>Profit</NavLink>
            <NavLink to="/shopping" className={linkClassName} onClick={() => setOpen(false)}>Shop</NavLink>
            <NavLink to="/checkout" className={linkClassName} onClick={() => setOpen(false)}>
              Cart ({count})
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
