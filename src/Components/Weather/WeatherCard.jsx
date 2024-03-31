/* eslint-disable react/prop-types */
import {
  WiHumidity,
  WiThermometer,
  WiCloud,
  WiDaySunny,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi"; // Importing weather icons from React Icons

const WeatherCard = ({ weather, unit, toggleUnit }) => {
  const temperatureUnitIcon =
    unit === "Celsius" ? <WiThermometer /> : <WiThermometer />;
  const temperatureUnitName = unit === "Celsius" ? "°C" : "°F";

  // Function to select weather icon based on description
  const getWeatherIcon = (description) => {
    switch (description.toLowerCase()) {
      case "clear sky":
        return <WiDaySunny />;
      case "few clouds":
      case "scattered clouds":
      case "broken clouds":
        return <WiCloud />;
      case "shower rain":
      case "rain":
        return <WiRain />;
      case "snow":
        return <WiSnow />;
      case "thunderstorm":
        return <WiThunderstorm />;
      default:
        return <WiCloud />;
    }
  };

  const calculateTemperature = (temp) => {
    return unit === "Celsius"
      ? temp
      : parseFloat((temp * 9) / 5 + 32).toFixed(2);
  };

  const temperature = `${calculateTemperature(
    weather.main.temp
  )}${temperatureUnitName}`;
  const weatherDescription = weather.weather[0].description;
  console.log("Weather Description:", weatherDescription);
  const weatherIcon = getWeatherIcon(weatherDescription);
  console.log("Selected Weather Icon:", weatherIcon);

  return (
    <div className="weather-card">
      <h2 className="text-xl flex justify-center items-center">
        {weather.name}, {weather.sys.country}z
      </h2>
      <p className="flex items-center gap-1 justify-center text-4xl font-bold my-6">
        {weatherIcon} {temperature}
      </p>
      <p className="flex justify-center items-center text-xl pb-4">
        Description: {weather.weather[0].description}
      </p>
      <p className="flex items-center gap-1 justify-center">
        <span className="text-4xl">
          <WiHumidity />
        </span>{" "}
        <p className="text-2xl">Humidity: {weather.main.humidity}%</p>
      </p>
      <button onClick={toggleUnit}>{temperatureUnitName}</button>
    </div>
  );
};

export default WeatherCard;
