import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pokemons: [],
}

export const DataSlice = createSlice(
    {
        name: 'data',
        initialState,
        reducers: {
            setCalification: (state, action) => {
            },
        }
    }
)

export const { setCalification} = DataSlice.actions;

export default DataSlice.reducer;