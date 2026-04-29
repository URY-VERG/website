import React, { useState } from "react";
import "./Weather.css";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [resolvedPlace, setResolvedPlace] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    setError("");
    setWeather(null);
    setResolvedPlace("");
    setLoading(true);

    try {
      // default: Pune coords (fallback)
      let latitude = 18.52;
      let longitude = 73.85;
      let placeLabel = "Pune, Maharashtra";

      const name = city.trim();
      if (name) {
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            name
          )}&count=1&language=en&format=json`
        );
        if (!geoRes.ok) throw new Error("Failed to resolve city");
        const geo = await geoRes.json();
        const top = geo?.results?.[0];
        if (!top) {
          throw new Error("City not found. Try a nearby town name.");
        }
        latitude = top.latitude;
        longitude = top.longitude;
        placeLabel = [top.name, top.admin1, top.country]
          .filter(Boolean)
          .join(", ");
      }

      const api = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
      const res = await fetch(api);
      if (!res.ok) throw new Error("Failed to fetch weather");
      const data = await res.json();
      if (!data?.current_weather) throw new Error("Weather data unavailable");

      setResolvedPlace(placeLabel);
      setWeather(data.current_weather);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
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
        <button onClick={getWeather} disabled={loading}>
          {loading ? "Checking..." : "Check Weather"}
        </button>
      </div>

      {error && <p style={{ color: "#b91c1c", marginTop: 12 }}>{error}</p>}

      {weather && (
        <div className="weather-card">
          <h3>📍 {resolvedPlace || city || "Your Area"}</h3>
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