import React, { useState } from "react";
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
import Developer from "./components/Developer";

import Checkout from "./pages/Checkout";

import "./App.css";

function App() {
  // 🛒 CART STATE
  const [cart, setCart] = useState([]);

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
            ? { ...item, qty: Math.max(1, item.qty + change) }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  return (
    <Router>
      <div className="App">

        {/* NAVBAR ला CART पास */}
        <Navbar cart={cart} />

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
          <Route path="/developer" element={<Developer />} />

          {/* SHOPPING + CHECKOUT */}
          <Route path="/shopping" element={<Shopping addToCart={addToCart} />} />

          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                updateQuantity={updateQuantity}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
