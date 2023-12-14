import React, { useState, useEffect } from 'react';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState(''); // State to store the city input

  const API_KEY = '699ed530c87a44009b2150604230712';
  const API_URL = `http://api.weatherapi.com/v1/current.json`;

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `${API_URL}?key=${API_KEY}&q=${city}&aqi=no`
        /*"http://api.weatherapi.com/v1/current.json?key=699ed530c87a44009b2150604230712&q=London&aqi=no"*/
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  return (
    <div>
      <h1>Weather App</h1>
      <label>
        Enter city:
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </label>

      {weatherData && (
        <div>
          <h2>Weather in {weatherData.location.name}, {weatherData.location.country}</h2>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Description: {weatherData.current.condition.text}</p>
          <p>Humidity: {weatherData.current.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
