import React, { useState } from "react";
import "./Shopping.css";

function Shopping({ addToCart }) {
  const itemsData = [
    { name: "Wheat", price: 40 },
    { name: "Rice", price: 55 },
    { name: "Sugar", price: 38 },
    { name: "Cotton", price: 65 },
    { name: "Corn", price: 30 }
  ];

  const [items, setItems] = useState(itemsData);

  // Sorting Functions
  const sortLowHigh = () => setItems([...items].sort((a, b) => a.price - b.price));
  const sortHighLow = () => setItems([...items].sort((a, b) => b.price - a.price));
  const sortAtoZ = () => setItems([...items].sort((a, b) => a.name.localeCompare(b.name)));
  const sortZtoA = () => setItems([...items].sort((a, b) => b.name.localeCompare(a.name)));

  return (
    <div className="shop-container">
      <h1 className="shop-title">Market Rates</h1>

      {/* SORT BUTTONS */}
      <div className="sort-buttons">
        <button onClick={sortLowHigh}>Price: Low → High</button>
        <button onClick={sortHighLow}>Price: High → Low</button>
        <button onClick={sortAtoZ}>A → Z</button>
        <button onClick={sortZtoA}>Z → A</button>
      </div>

      {/* ITEMS GRID */}
      <div className="market-grid">
        {items.map((item, idx) => (
          <div key={idx} className="item-card">
            <h3>{item.name}</h3>
            <p className="price">₹{item.price} / kg</p>

            <button className="add-btn" onClick={() => addToCart(item)}>
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shopping;
