import { useState, useEffect, useMemo } from "react";
import WeatherCard from "../Components/Weather/WeatherCard";
import SearchBar from "../Components/Weather/Searchbar";
import {
  fetchForecastByLocation,
  fetchForecastByLocationSearch,
  fetchWeatherByLocation,
  fetchWeatherBySearchLocation,
} from "../Components/Weather/wearherServices";

const MainPages = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("Celsius");

  useEffect(() => {
    fetchCurrentLocationWeather();
  }, []);

  const fetchCurrentLocationWeather = async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const weatherResponse = await fetchWeatherByLocation(
            latitude,
            longitude
          );
          const forecastResponse = await fetchForecastByLocation(
            latitude,
            longitude
          ); // Fetch forecast using correct function
          setWeatherData(weatherResponse);
          setForecastData(forecastResponse);
          setError(null);
        } catch (error) {
          setError("Error fetching weather data.");
        }
      },
      (error) => {
        setError("Please allow location access to fetch weather data.");
      }
    );
  };

  const handleSearch = async (location) => {
    try {
      const weatherResponse = await fetchWeatherBySearchLocation(location);
      const forecastResponse = await fetchForecastByLocationSearch(location); // Use correct function to fetch forecast
      setWeatherData(weatherResponse);
      setForecastData(forecastResponse);
      console.log();
      setError(null);
    } catch (error) {
      setError("Error fetching weather data.");
    }
  };

  const toggleUnit = () => {
    setUnit(unit === "Celsius" ? "Fahrenheit" : "Celsius");
  };

  // Memoize weather data to prevent unnecessary re-renders
  const memoizedWeatherData = useMemo(() => weatherData, [weatherData]);

  // Memoize forecast data to prevent unnecessary re-renders
  const memoizedForecastData = useMemo(() => forecastData, [forecastData]);

  return (
    <div className="App w-full  lg:grid grid-cols-7">
      <div className="lg:col-span-5 w-full pt-6 px-5  bg-slate-200">
        {/* <div>
          <div>
          <SearchBar onSearch={handleSearch} />
        {error && <p>{error}</p>}
        <div>
          {memoizedWeatherData && (
            <WeatherCard weather={memoizedWeatherData} unit={unit} toggleUnit={toggleUnit} />
          )}
        </div>
          </div>
        </div> */}
        <div
          className="hero h-96   rounded-2xl w-full"
          style={{
            backgroundImage:
              "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <SearchBar onSearch={handleSearch} />
          {error && <p>{error}</p>}
   
        </div>
      </div>

      <div className="lg:col-span-2 bg-[#01257D] grid justify-center text-white">
        <div>
        <div className="lg:py-20 ">
            {memoizedWeatherData && (
              <WeatherCard
                weather={memoizedWeatherData}
                unit={unit}
                toggleUnit={toggleUnit}
              />
            )}
          </div>
        </div>
        <div className="my-20 ">
          {memoizedForecastData && memoizedForecastData.list ? (
            <div>
              <h2>5-Day Forecast</h2>
              {memoizedForecastData.list.map((forecast, index) => (
                <div key={index} className="grid mt-5">
                  <p>Date: {forecast.dt_txt}</p>
                  <p>
                    Temperature: {forecast.main.temp}°{unit}
                  </p>
                  <p>Description: {forecast.weather[0].description}</p>
                  <hr />
                </div>
              ))}
            </div>
          ) : (
            <p>No forecast data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPages;
