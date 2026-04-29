import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Weather from "./components/Weather";
import Learning from "./components/Learning";
import Products from "./components/Products";
import Market from "./components/Market";
import Shopping from "./components/Shopping";
import ProfitCalculator from "./components/ProfitCalculator";
import About from "./components/About";
import Finance from "./components/Finance";
import LatestUpdates from "./components/LatestUpdates";
import Livestock from "./components/Livestock";

import Checkout from "./pages/Checkout";

import "./App.css";

const CART_STORAGE_KEY = "agrilink:cart:v1";

function readCartFromStorage() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((x) => x && typeof x === "object")
      .map((x) => ({
        name: String(x.name ?? ""),
        price: Number(x.price ?? 0),
        qty: Number(x.qty ?? 0),
      }))
      .filter(
        (x) =>
          x.name &&
          Number.isFinite(x.price) &&
          Number.isFinite(x.qty) &&
          x.qty > 0
      );
  } catch {
    return [];
  }
}

function App() {
  // 🛒 CART STATE
  const [cart, setCart] = useState(() => readCartFromStorage());

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore storage failures (private mode / quota)
    }
  }, [cart]);

  const cartCount = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + (Number.isFinite(item.qty) ? item.qty : 0),
        0
      ),
    [cart]
  );

  // ➕ ADD TO CART FUNCTION (with quantity)
  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.name === item.name);

      if (exists) {
        return prev.map((i) =>
          i.name === item.name ? { ...i, qty: i.qty + 1 } : i
        );
      }

      return [...prev, { ...item, qty: 1 }];
    });
  };

  // 🔄 QUANTITY UPDATE FUNCTION
  const updateQuantity = (name, change) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.name === name
            ? { ...item, qty: Math.max(0, item.qty + change) }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const clearCart = () => setCart([]);

  return (
    <Router>
      <div className="App">

        {/* NAVBAR ला CART पास */}
        <Navbar cart={cart} cartCount={cartCount} />

        <Routes>
          {/* NORMAL ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/profit-calculator" element={<ProfitCalculator />} />
          <Route path="/market" element={<Market />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/updates" element={<LatestUpdates />} />
          <Route path="/livestock" element={<Livestock />} />

          {/* SHOPPING + CHECKOUT */}
          <Route path="/shopping" element={<Shopping addToCart={addToCart} />} />

          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                updateQuantity={updateQuantity}
                clearCart={clearCart}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
