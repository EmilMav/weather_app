import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const OPENWEATHERMAP_API_KEY = 'b7999d89ff415d103612fbb336899cbd';

interface weatherState {
    weather: { [city: string]: any };
}

const initialState: weatherState = {
    weather: {},
};

export const fetchWeatherByCity = createAsyncThunk(
    'weather/fetchWeatherByCity',
    async (city: string) => {
        const responce = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`
        );
        return { city, data: responce.data };
    }
)


