import React from 'react';
import WeatherCard from './components/WeatherCard';
import './App.css';
import CitySelector from './components/CitySelector';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <CitySelector />
          <WeatherCard />
        </div>
      </header>
    </div>
  );
}

export default App;
