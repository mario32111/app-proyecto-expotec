import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, UiState } from "./types"; // Importa la interfaz desde el archivo de tipos
import { AppThunk } from "../store";


const initialState: UiState = {
    loading: false,
    isCorrect: false,
    progress: 0,
    openedModal: false,
}

export const setCorrectWithState = (): AppThunk => (dispatch, getState) => {
    const state = getState() as RootState;  // Accede al estado global
    const currentQuestion = state.data.currentQuestion;  // Accede al estado del slice `data`
    const selectedOption = state.data.selectedOption;  // Accede al estado del slice `data`


    // Busca si la opción seleccionada es correcta
    const selectedAnswer = currentQuestion.options.find(option => option.text === selectedOption);
    console.log(selectedAnswer)
    if (selectedAnswer && selectedAnswer.isCorrect) {
        dispatch(setCorrect(true));
        
    } else {
        dispatch(setCorrect(false));
    }
};

export const UiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },

        setCorrect: (state, action: PayloadAction<boolean>) => {
            state.isCorrect = action.payload;
        },

        timeOut: (state, action: PayloadAction<boolean>) => {
            state.isCorrect = action.payload;
            state.progress = state.progress+1;
        },
        setOpenModal: (state, action: PayloadAction<boolean>) => {
            state.openedModal = action.payload;
        },
    }
});

export const { setLoading, setCorrect } = UiSlice.actions;

export default UiSlice.reducer;
