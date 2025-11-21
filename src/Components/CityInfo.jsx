import React, { useState } from "react";
import "./CityInfo.css";

function CityInfo() {
  const [cityData, setCityData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");

  async function fetchCityData() {
    if (!input) return alert("Please enter a city name!");
    setLoading(true);
    setError(null);
    setCityData(null); 
    try {
      const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${input}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setCityData(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      fetchCityData();
    }
  }

  return (
    <div className="city-container">
      <h1 className="CityExplorer">City Explorer</h1>
      <input 
        type="text" 
        placeholder="Enter a city" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        onKeyDown={handleKeyDown} 
      />
      <button onClick={fetchCityData}>Search</button>

      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}

      {error && <p className="error">{error}</p>}

      {cityData && (
        <div className="city-content">
          <h1>{cityData.title}</h1>
          <p>{cityData.description}</p>
          <p>{cityData.extract}</p>
          {cityData.coordinates && (
            <p>Coordinates: {cityData.coordinates.lat}, {cityData.coordinates.lon}</p>
          )}
          <img 
            src={cityData.thumbnail?.source} 
            alt={cityData.title} 
            loading="lazy" 
          />
        </div>
      )}
    </div>
  );
}

export default CityInfo;
