import React from "react";
import "./Home.css";
import farmImg from "../images/kunal.jpg"; // Ensure this image exists

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <img src={farmImg} alt="Farm" className="hero-image" />
        <div className="hero-text">
          <h1>
            Welcome <span className="highlight"></span>
          </h1>
          <p className="tagline">Empowering Farmers with Smart Technology</p>
          <button className="learn-btn">🚀 Start Learning</button>
        </div>
      </div>
    </div>
  );
}

export default Home;