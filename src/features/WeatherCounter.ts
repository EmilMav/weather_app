import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface counterState {
    value: number;
}

const initialState: counterState = {
    value: 10,
};

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        // increment
        incremented(state) {
            state.value++;
        }
        // decrement

        // reset

    }
})

export const { incremented } = counterSlice.actions;
export default counterSlice.reducer;  