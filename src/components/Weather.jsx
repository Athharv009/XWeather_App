import { useState } from 'react';
import style from './Weather.module.css';

export default function Weather() {
  const [search, setSearch] = useState("");
  const [cityData, setCityData] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "307caa76cad24cb1bab64149251611";

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = async () => {
    if (!search) return;

    setLoading(true);
    setCityData(null);

    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${search}`
      );

      if (!res.ok) throw new Error("Invalid city");

      const data = await res.json();
      setCityData(data);

    } catch (err) {
      alert("Failed to fetch weather data");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "50px",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {/* Search Bar */}
      <div style={{ display: "flex", gap: "5px", justifyContent: "center", alignItems: "center" }}>
        <input
          placeholder="Enter city name"
          required
          className={style.search}
          onChange={handleChange}
          type='text'
        />
        <button className={style.btn} onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Loading Message */}
      {loading && <p>Loading data...</p>}

      {/* Weather Cards */}
      {cityData && (
        <div className="weather-cards" style={{ display: "flex", gap: "20px" }}>
          <div className="weather-card"
            style={{
              backgroundColor: "white",
              width: "200px",
              height: "80px",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}>
            <p style={{ marginBottom: "0px", paddingTop: "10px" }}>Temperature</p>
            <p style={{ paddingBottom: "10px" }}>{cityData.current.temp_c}°C</p>
          </div>

          <div className="weather-card"
            style={{
              backgroundColor: "white",
              width: "200px",
              height: "80px",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}>
            <p style={{ marginBottom: "0px", paddingTop: "10px" }}>Humidity</p>
            <p style={{ paddingBottom: "10px" }}>{cityData.current.humidity}%</p>
          </div>

          <div className="weather-card"
            style={{
              backgroundColor: "white",
              width: "200px",
              height: "80px",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}>
            <p style={{ marginBottom: "0px", paddingTop: "10px" }}>Condition</p>
            <p style={{ paddingBottom: "10px" }}>{cityData.current.condition.text}</p>
          </div>

          <div className="weather-card"
            style={{
              backgroundColor: "white",
              width: "200px",
              height: "80px",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}>
            <p style={{ marginBottom: "0px", paddingTop: "10px" }}>Wind Speed</p>
            <p style={{ paddingBottom: "10px" }}>{cityData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}
