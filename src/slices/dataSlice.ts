import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataState, Question } from "./types"; // Asegúrate de que la interfaz de tipo esté bien definida
import { createAsyncThunk } from '@reduxjs/toolkit';
import { config } from "../config/config"
import { setLoading } from "./uiSlice";

const initialState: DataState = {
    questions: [
        {
            id: 1,
            categoryId: 1,
            text: "",
            image: "",
            category: {
                id: 1,
                name: "",
                usersQuantity: 0,
            },
            options: [
                { id: 101, questionId: 1, text: "", isCorrect: true },
                { id: 102, questionId: 1, text: "", isCorrect: false },
                { id: 103, questionId: 1, text: "", isCorrect: false },
            ],
        },

    ],
    currentQuestion: {
        id: 0,
        categoryId: 0,
        text: "",
        image: null,
        category: {
            id: 0,
            name: "",
            usersQuantity: 0,
        },
        options: [],
    },
    selectedOption: undefined,
    score: 0,
};

export const fetchRandomQuestionByCategory = createAsyncThunk<
    Question[], // Tipo de dato que devuelve el thunk
    void,       // No recibe parámetros
    { rejectValue: string } // Tipo de error esperado
>(
    'data/fetchRandomQuestionByCategory',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setLoading(true));

            const response = await fetch(`${config.api_url}/api/v1/question/random-by-category`);

            if (!response.ok) {
                throw new Error('Error al obtener la pregunta');
            }

            const data: Question[] = await response.json();
            console.log('Pregunta recibida:', data);

            // Despachar setQuestions con los datos recibidos
            dispatch(setQuestions(data));
            dispatch(setCurrentQuestion())
            dispatch(setLoading(false));

            return data; // Devuelve los datos para que estén disponibles en el estado
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Error desconocido');
        }
    }
);
export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        // Acción para establecer la calificación (aunque no hace nada en este momento)
        setScore: (state) => {
            state.score = state.score + 1;
            // Lógica de calificación aquí si es necesario
        },
        // Acción para actualizar la siguiente pregunta basada en el índice de progreso
        nextCurrentQuestion: (state, action: PayloadAction<number>) => {
            const progress = action.payload;

            // Verifica si el índice está dentro del rango del array
            if (progress >= 0 && progress < state.questions.length) {
                state.currentQuestion = state.questions[progress];
            } else {
                // Si no hay más preguntas, puedes manejarlo de alguna manera
                console.log("No hay más preguntas disponibles.");
                // Opcional: Reiniciar el progreso o mostrar un mensaje al usuario
            }
        },
        setCurrentQuestion: (state) => {
            const firstQuestion = state.questions[0]
            state.currentQuestion = firstQuestion;
        },
        setSelectedOption: (state, action: PayloadAction<string>) => {
            state.selectedOption = action.payload;
        },
        setQuestions: (state, action: PayloadAction<Question[]>) => {
            state.questions = action.payload;
        },
        setDefaultData() {
            return initialState;
        }
    }
});

export const { setScore, nextCurrentQuestion, setSelectedOption, setCurrentQuestion, setQuestions, setDefaultData } = dataSlice.actions;

export default dataSlice.reducer;
