import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataState } from "./types"; // Asegúrate de que la interfaz de tipo esté bien definida

const initialState: DataState = {
    questions: [],
    currentQuestion: {
        ask: "",
        options: [
            { text: "Técnicas computacionales que imitan la inteligencia humana.", isCorrect: true },
            { text: "Hardware para cálculos avanzados.", isCorrect: false },
            { text: "Un lenguaje de programación.", isCorrect: false },
            { text: "Un sistema operativo.", isCorrect: false }
        ],
        image: "https://www.seguritecnia.es/wp-content/uploads/2022/03/inteligencia-artificial-900x600.jpg",
    },
    selectedOption:""
};

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        // Acción para establecer la calificación (aunque no hace nada en este momento)
        setCalification: (state, action: PayloadAction<string>) => {
            state.selectedOption= action.payload;
            // Lógica de calificación aquí si es necesario
        },
        // Acción para actualizar la siguiente pregunta basada en el índice de progreso
        nextCurrentQuestion: (state, action: PayloadAction<number>) => {
            const progress = action.payload;
            // Verifica que el índice esté dentro del rango de las preguntas
            if (state.questions[progress]) {
                state.currentQuestion = state.questions[progress];
            }
        },
        setSelectedOption: (state, action: PayloadAction<string>) => {
            state.selectedOption=action.payload;
        },
    }
});

export const { setCalification, nextCurrentQuestion, setSelectedOption } = dataSlice.actions;

export default dataSlice.reducer;
