import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCity } from "../features/CitySlice";

const CitySelector: React.FC = () => {
  const [city, setCityInput] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city) {
      dispatch(setCity(city));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={city} onChange={handleChange} placeholder="Enter city" />
      <button type="submit">Change City</button>
    </form>
  );
};

export default CitySelector;
