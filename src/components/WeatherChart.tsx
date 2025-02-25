import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, AppDispatch } from '../app/store';
import { fetchForecastByCity } from '../features/WeatherSlice';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

interface WeatherChartProps {
    city: string;
}

const WeatherChart: React.FC<WeatherChartProps> = ({ city }) => {
    const dispatch = useDispatch<AppDispatch>();
    const forecastData = useSelector((state: RootState) => state.weather.forecast[city]);
    const forecastStatus = useSelector((state: RootState) => state.weather.forecastStatus);
    const error = useSelector((state: RootState) => state.weather.error);

    useEffect(() => {
        console.log(`Current forecastStatus: ${forecastStatus}`);
        if (forecastStatus === 'idle' || !forecastData) {
            dispatch(fetchForecastByCity(city));
        }
    }, [dispatch, city, forecastStatus, forecastData]);

    if (forecastStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (forecastStatus === 'failed') {
        return <div>Error: {error}</div>;
    }

    if (!forecastData) {
        return <div>No forecast data available</div>;
    }

    const labels = forecastData.list.map((entry: any) => {
        const date = new Date(entry.dt * 1000);
        return date.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit' });
    });

    const data = {
        labels,
        datasets: [
            {
                data: forecastData.list.map((entry: any) => entry.main.temp),
                backgroundColor: 'rgba(33, 150, 243, 0.2)',
                borderColor: '#2196F3',
                fill: true,
                pointRadius: 0,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    title: function () {
                        return '';
                    },
                    label: function (context: any) {
                        return `${context.raw}°C`;
                    },
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                grid: {
                    display: false,
                },
                beginAtZero: true,
                ticks: {
                    display: false,
                },
            },
        },
        elements: {
            line: {
                borderWidth: 1,
                tension: 0.4,
            },
        },
    };

    return (
        <div>
            <Line options={options} data={data} />
        </div>
    );
};

export default WeatherChart;
