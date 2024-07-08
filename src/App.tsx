import React from 'react';
import WeatherCard from './components/WeatherCard';
import { useAppDispatch, useAppSelector } from './app/hooks'
import { incremented } from './features/WeatherCounter';
import { useFetchBreedsQuery } from './features/dog-api-slice';
import './App.css';

function App() {
  const counter = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const { data = [], isFetching } = useFetchBreedsQuery();

  function handleClick() {
    dispatch(incremented());
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <WeatherCard city="Tbilisi" />
        </div>
        <button onClick={handleClick}>
          count is: {counter}
        </button>
        <div>
          <p>
            Number of dogs fetched: {data.length}</p>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Picture</th>
              </tr>
            </thead>
            <tbody>
              {data.map((breed) => (
                <tr key={breed.id}>
                  <td>{breed.name}</td>
                  <td>
                    <img src={breed.image.url} alt={breed.name} height={250} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </header>
    </div>
  );
}

export default App;
