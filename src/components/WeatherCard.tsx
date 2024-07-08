import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { fetchWeatherByCity } from '../features/WeatherSlice';
import WeatherChart from './WeatherChart';
import '../App.css';

interface WeatherCardProps {
    city: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city }) => {
    const dispatch: AppDispatch = useDispatch();
    const weatherData = useSelector((state: RootState) => state.weather.weather[city]);
    const forecastData = useSelector((state: RootState) => state.weather.forecast[city]);
    const status = useSelector((state: RootState) => state.weather.weatherStatus);
    const error = useSelector((state: RootState) => state.weather.error);

    useEffect(() => {
        dispatch(fetchWeatherByCity(city));
    }, [city, dispatch]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!weatherData) {
        return <div>No data available</div>;
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
            {forecastData && <WeatherChart city={city} />}
        </div>
    );
};

export default WeatherCard;
