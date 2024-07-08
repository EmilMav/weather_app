import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/WeatherCounter';
import weatherReducer from '../features/WeatherSlice';
import { apiSlice } from '../features/dog-api-slice'
import { buildGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        weather: weatherReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiSlice.middleware);

    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
