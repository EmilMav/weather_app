import React from 'react';
import WeatherCard from './components/WeatherCard';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <WeatherCard city="Tbilisi" />
        </div>
      </header>
    </div>
  );
}

export default App;
