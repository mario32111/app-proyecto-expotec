import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    isCorrect: false,
}

export const UiSlice = createSlice(
    {
        name: 'ui',
        initialState,
        reducers: {
            setLoading: (state, action) => {
                state.loading = action.payload;
            },

            setCorrect: (state, action) => {
                state.isCorrect = action.payload;
            }

        }
    }
)

export const { setLoading, setCorrect } = UiSlice.actions;

export default UiSlice.reducer;