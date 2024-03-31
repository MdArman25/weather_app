import  { useState } from 'react';
import MapLocation from '../../Utils/map';
import WeatherInfo from '../../Utils/WeatherInfo';

const API_KEY = 'YOUR_API_KEY_HERE';

const MapLocationWeather = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (latitude, longitude) => {
    console.log(longitude,latitude);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (error) {
      setError('Error fetching weather data');
      console.error(error);
    }
  };
  const handleLocationSelect = (latitude, longitude) => {
    console.log(latitude,longitude);
    setSelectedLocation({ latitude, longitude });
    fetchWeatherData(latitude, longitude); // Fetch weather data when location is selected
  };
console.log(selectedLocation);

  return (
    <div className="bg-gray-100 min-h-screen">
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Weather App</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <MapLocation onLocationSelect={handleLocationSelect} />
        <WeatherInfo data={weatherData} error={error} />
      </div>
    </div>
  </div>
  );
};
export default MapLocationWeather;