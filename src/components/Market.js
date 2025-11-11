import React from "react";
import "./Market.css";

function Market() {
  const crops = [
    { name: "Wheat", price: "₹2,300 / quintal", location: "Nashik Market" },
    { name: "Rice", price: "₹3,000 / quintal", location: "Nashik Market" },
    { name: "Soybean", price: "₹4,100 / quintal", location: "Nashik Market" },
    { name: "Cotton", price: "₹6,200 / quintal", location: "Kolhapur Market" },
    { name: "Sugarcane", price: "₹3,200 / quintal", location: "Ahmednagar Market" },
  ];

  return (
    <div className="market-container">
      <h1>🌾 Market Prices Today</h1>
      <p>Check the latest crop prices and market locations across Maharashtra.</p>

      <div className="market-grid">
        {crops.map((crop, index) => (
          <div className="market-card" key={index}>
            <h2>{crop.name}</h2>
            <p><strong>Price:</strong> {crop.price}</p>
            <p><strong>Market:</strong> {crop.location}</p>
            <button>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Market;
