import React from "react";
import "./Learning.css";

const lessons = [
  {
    id: 1,
    title: "🌾 Organic Farming",
    desc: "Natural fertilizers, composting, and pest control methods.",
    link: "https://www.youtube.com/watch?v=5XExample1" // replace with real YouTube link
  },
  {
    id: 2,
    title: "💧 Smart Irrigation",
    desc: "Drip irrigation, scheduling, and water-saving tips.",
    link: "https://www.youtube.com/watch?v=5XExample2"
  },
  {
    id: 3,
    title: "🚜 Modern Equipment",
    desc: "Use of tractors, planters, and low-cost mechanization.",
    link: "https://www.youtube.com/watch?v=5XExample3"
  },
  {
    id: 4,
    title: "📱 Mobile Apps for Farmers",
    desc: "Useful mobile apps for weather, market prices and advisories.",
    link: "https://www.youtube.com/watch?v=5XExample4"
  }
];

function Learning() {
  return (
    <div className="learning-page">
      <h2>📘 Learning Center</h2>
      <p className="lead">Short videos and articles — Marathi & English — to help farmers learn practical techniques.</p>

      <div className="learning-grid">
        {lessons.map(item => (
          <div className="learn-card" key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <div className="card-actions">
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn">
                Watch Video
              </a>
              <a href={`/resources/${item.title.replace(/\s+/g,'-').toLowerCase()}.pdf`} target="_blank" rel="noopener noreferrer" className="btn-outline">
                Read PDF
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Learning;
