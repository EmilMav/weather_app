import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CityState {
  name: string;
}

const initialState: CityState = {
  name: 'London',
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
  },
});

export const { setCity } = citySlice.actions;
export default citySlice.reducer;