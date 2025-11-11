import React, { useState } from "react";
import "./Weather.css";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    const api = "https://api.open-meteo.com/v1/forecast?latitude=18.52&longitude=73.85&current_weather=true";
    const res = await fetch(api);
    const data = await res.json();
    setWeather(data.current_weather);
  };

  return (
    <div className="weather-page">
      <div className="weather-header">
        <h2>🌤️ Weather Pulse</h2>
        <p>Get real-time weather updates</p>
      </div>

      <div className="weather-form">
        <input
          type="text"
          placeholder="🔍 Type your city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Check Weather</button>
      </div>

      {weather && (
        <div className="weather-card">
          <h3>📍 {city || "Your Area"}</h3>
          <div className="weather-details">
            <p>🌡️ Temp: <span>{weather.temperature}°C</span></p>
            <p>💨 Wind: <span>{weather.windspeed} km/h</span></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;