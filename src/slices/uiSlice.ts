import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, UiState } from "./types"; // Importa la interfaz desde el archivo de tipos
import { AppThunk } from "../store";
import { setScore } from "./dataSlice"

const initialState: UiState = {
    loading: false,
    isCorrect: false,
    progress: 0,
    openedModal: false,
    showScoreModal: false
}

export const setCorrectWithState = (): AppThunk => (dispatch, getState) => {
    const state = getState() as RootState;  // Accede al estado global
    const currentQuestion = state.data.currentQuestion;  // Accede al estado del slice `data`
    const selectedOption = state.data.selectedOption;  // Accede al estado del slice `data`


    // Busca si la opción seleccionada es correcta
    const selectedAnswer = currentQuestion.options.find(option => option.text === selectedOption);
    if (selectedAnswer && selectedAnswer.isCorrect) {
        dispatch(setCorrect(true));
        dispatch(setScore());
        
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
        setProgress(state) {
            state.progress = state.progress + 1;
        },
        setShowScoreModal(state, action: PayloadAction<boolean>) {
            state.showScoreModal=action.payload
        },
        setDefaultUi() {
            return initialState;
        }
    }
});

export const { setLoading, setCorrect, setProgress, setOpenModal, setShowScoreModal, setDefaultUi } = UiSlice.actions;

export default UiSlice.reducer;
