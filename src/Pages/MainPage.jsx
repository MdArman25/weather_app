import { useState, useEffect } from "react";

import WeatherCard from "../Components/Weather/WeatherCard";
import {
  fetchForecastByLocation,
  
  fetchWeatherByLocation,
} from "../Components/Weather/wearherServices";
import SearchBar from "../Components/Weather/Searchbar";

const MainPages = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCurrentLocationWeather();
  }, []);

  const fetchCurrentLocationWeather = async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const weatherResponse = await fetchWeatherByLocation(latitude, longitude);
          const forecastResponse = await fetchForecastByLocation(latitude, longitude);
          setWeatherData(weatherResponse);
          setForecastData(forecastResponse);
          setError(null);
        } catch (error) {
          setError(error.message);
        }
      },
      (error) => {
        console.log(error);
        setError("Please allow location access to fetch weather data.");
      }
    );
  };

  const handleSearch = async (location) => {
    try {
      const weatherResponse = await fetchWeatherByLocation(location);
      const forecastResponse = await fetchForecastByLocation(location);
      setWeatherData(weatherResponse);
      setForecastData(forecastResponse);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="App c grid grid-cols-5">
<div className="col-span-4 bg-slate-200">
<SearchBar onSearch={handleSearch} />
    {error && <p>{error}</p>}
<div>
{weatherData && <WeatherCard weather={weatherData} />}
</div>
</div>
<div className="bg-blue-700">

  <div>
  {forecastData && (
      <div>
        <h2>5-Day Forecast</h2>
        {forecastData.list.map((forecast, index) => (
          <div key={index}>
            <p>Date: {forecast.dt_txt}</p>
            <p>Temperature: {forecast.main.temp}°C</p>
            <p>Description: {forecast.weather[0].description}</p>
            <hr />
          </div>
        ))}
      </div>
    )}
  </div>
</div>
  </div>
  );
};

export default MainPages;
