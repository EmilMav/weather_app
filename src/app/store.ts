import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../features/WeatherSlice';
import cityReducer from '../features/CitySlice';

export const store = configureStore({
    reducer: {
        weather: weatherReducer,
        city: cityReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
