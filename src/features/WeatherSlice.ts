import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const OPENWEATHERMAP_API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

interface WeatherState {
    weather: { [city: string]: any };
    forecast: { [city: string]: any };
    weatherStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    forecastStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: WeatherState = {
    weather: {},
    forecast: {},
    weatherStatus: 'idle',
    forecastStatus: 'idle',
    error: null,
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

export const fetchForecastByCity = createAsyncThunk(
    'weather/fetchForecastByCity',
    async (city: string) => {
        const responce = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`
        );
        return { city, data: responce.data };
    }
)

// Документация
// const fetchUserById = createAsyncThunk(
//     'users/fetchByIdStatus',
//     async (userId: number, thunkAPI) => {
//         const response = await userAPI.fetchById(userId)
//         return response.data
//     },
// )

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeatherByCity.pending, (state) => {
                state.weatherStatus = 'loading';
            })
            .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
                state.weatherStatus = 'succeeded';
                state.weather[action.payload.city] = action.payload.data;
            })
            .addCase(fetchWeatherByCity.rejected, (state, action) => {
                state.weatherStatus = 'failed';
                state.error = action.error.message || null;
            })
            .addCase(fetchForecastByCity.pending, (state) => {
                state.forecastStatus = 'loading';

            })
            .addCase(fetchForecastByCity.fulfilled, (state, action) => {
                console.log('Reducer reached');
                state.forecastStatus = 'succeeded';
                state.forecast[action.payload.city] = action.payload.data;
                console.log('Forecast data received:', action.payload.data);
                console.log('хуй1');
            })
            .addCase(fetchForecastByCity.rejected, (state, action) => {
                state.forecastStatus = 'failed';
                state.error = action.error.message || null;
            });
    },
});
console.log('хуй2');
export default weatherSlice.reducer;
