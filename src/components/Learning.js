import React from "react";
import "./Learning.css";

function Learning() {
  return (
    <div className="learning-page">
      <h2>📘 Learning Center for Farmers</h2>
      <div className="card-container">
        <div className="card">
          <h3>🌾 Crop Rotation</h3>
          <p>Improve soil fertility by growing different crops each season.</p>
        </div>
        <div className="card">
          <h3>💧 Drip Irrigation</h3>
          <p>Save water and increase crop yield with smart irrigation systems.</p>
        </div>
        <div className="card">
          <h3>🐝 Organic Pest Control</h3>
          <p>Use natural predators to reduce chemical pesticides.</p>
        </div>
        <div className="card">
          <h3>☀️ Solar Farming</h3>
          <p>Use solar panels to power pumps and other farm tools.</p>
        </div>
      </div>
    </div>
  );
}

export default Learning;
