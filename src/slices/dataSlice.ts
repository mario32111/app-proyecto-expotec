import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataState, Question } from "./types"; // Asegúrate de que la interfaz de tipo esté bien definida
import { createAsyncThunk } from '@reduxjs/toolkit';
import { config } from "../config/config"
import { setLoading } from "./uiSlice";
interface CategoryUpdatePayload {
    id: number; // Nombre de la categoría (redes, web, etc.)
    value: boolean; // El valor de la categoría (true o false)
}

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
    history: {
        redes: false,
        web: false,
        ia: false,
        bd: false,
        seguridad: false,
    }
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

// Acción para enviar el request PATCH a la API
const incrementUsers = async (ids: number[]) => {
    try {
        const response = await fetch(`${config.api_url}/api/v1/category/incrementUsers`, {
            method: 'PATCH', // Cambiar POST a PATCH
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ids }), // Mantén el body con los ids
        });

        if (!response.ok) {
            throw new Error('Error al actualizar las categorías');
        }
    } catch (error) {
        console.error('Error al hacer la petición a la API:', error);
    }
};

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
            // Recorremos cada pregunta y mezclamos sus opciones
            const shuffledQuestions = action.payload.map(question => ({
                ...question,
                options: question.options.sort(() => Math.random() - 0.5), // Mezcla las opciones
            }));
        
            state.questions = shuffledQuestions;
        },
        setDefaultData() {
            return initialState;
        },
        setHistory: (state, action: PayloadAction<CategoryUpdatePayload>) => {
            // Actualizamos el estado history
            const { id, value } = action.payload;
            const updatedHistory = { ...state.history };

            // Asignamos el valor correspondiente a la categoría en el estado
            switch (id) {
                case 1:
                    updatedHistory.redes = value;
                    break;
                case 2:
                    updatedHistory.web = value;
                    break;
                case 3:
                    updatedHistory.ia = value;
                    break;
                case 4:
                    updatedHistory.bd = value;
                    break;
                case 5:
                    updatedHistory.seguridad = value;
                    break;
                default:
                    return;
            }

            state.history = updatedHistory; // Actualiza el estado del history

            // Filtramos los ids donde el estado es true
            const idsToSend = [];
            if (updatedHistory.redes) idsToSend.push(1);
            if (updatedHistory.web) idsToSend.push(2);
            if (updatedHistory.ia) idsToSend.push(3);
            if (updatedHistory.bd) idsToSend.push(4);
            if (updatedHistory.seguridad) idsToSend.push(5);

            // Si hay ids para enviar, hacemos la solicitud a la API
            if (idsToSend.length > 0 && action.payload.id >=5) {
                incrementUsers(idsToSend); // Llama a la función para enviar los ids a la API
            }
        },
    }
});

export const { setScore,
    nextCurrentQuestion,
    setSelectedOption,
    setCurrentQuestion,
    setQuestions,
    setDefaultData,
    setHistory } = dataSlice.actions;

export default dataSlice.reducer;
