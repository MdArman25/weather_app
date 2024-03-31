/* eslint-disable react/prop-types */

import { useState } from "react";

const WeatherCard = ({ weather }) => {
  const [unit, setUnit] = useState("Celsius");

  const toggleUnit = () => {
    setUnit(unit === "Celsius" ? "Fahrenheit" : "Celsius");
  };
  const temperature =
    unit === "Celsius"
      ? `${weather.main.temp}°C`
      : `${(weather.main.temp * 9) / 5 + 32}°F`;

  return (
    <div className="weather-card">
      <h2>
        {weather.name}, {weather.sys.country}
      </h2>
      <p>Temperature: {temperature}</p>
      <p>Description: {weather.weather[0].description}</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <button onClick={toggleUnit}>Toggle Unit</button>
    </div>
  );
};

export default WeatherCard;
