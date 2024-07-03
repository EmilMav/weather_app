import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherChart from './WeatherChart';
import '../App.css';



const OPENWEATHERMAP_API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

interface WeatherCardProps {
    city: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city }) => {
    const [weatherData, setWeatherData] = useState<any>(null);
    const [forecastData, setForecastData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                setLoading(true);
                const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`);
                const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`);
                setWeatherData(weatherResponse.data);
                setForecastData(forecastResponse.data);
            } catch (error) {
                setError('Error fetching weather data');
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [city]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const dayOfWeekShort = new Date(weatherData.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
    const dayOfMonth = new Date(weatherData.dt * 1000).toLocaleDateString('en-US', { day: 'numeric' });
    const month = new Date(weatherData.dt * 1000).toLocaleDateString('en-US', { month: 'long' });
    const time = new Date(weatherData.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false });

    return (
        <div className="weather-card">
            <h2>{weatherData.name}, {weatherData.sys.country}</h2>
            <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt="weather icon" />
            <p>{weatherData.weather[0].description}</p>
            <p>Temperature: {weatherData.main.temp} °C</p>
            <p>Wind: {weatherData.wind.speed} m/s</p>
            <p>Humidity: {weatherData.main.humidity} %</p>
            <p>Pressure: {weatherData.main.pressure} hPa</p>
            <p>Feels like: {weatherData.main.feels_like} °C</p>
            <p>{dayOfWeekShort}, {dayOfMonth} {month}, {time}</p>
            {forecastData && <WeatherChart forecastData={forecastData} />}
        </div>
    );
};

export default WeatherCard;
