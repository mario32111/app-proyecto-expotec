import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataState, Question } from "./types"; // Asegúrate de que la interfaz de tipo esté bien definida
import { createAsyncThunk } from '@reduxjs/toolkit';

const initialState: DataState = {
    questions: [
        {
            id: 1,
            categoryId: 1,
            text: "¿Qué significa 'CPU' en informática?",
            image: "https://www.seguritecnia.es/wp-content/uploads/2022/03/inteligencia-artificial-900x600.jpg",
            category: {
                id: 1,
                name: "Informática",
                usersQuantity: 0,
            },
            options: [
                { id: 101, questionId: 1, text: "Unidad Central de Procesamiento", isCorrect: true },
                { id: 102, questionId: 1, text: "Controlador Principal de Usuario", isCorrect: false },
                { id: 103, questionId: 1, text: "Computadora Personal Universal", isCorrect: false },
            ],
        },
        {
            id: 2,
            categoryId: 1,
            text: "¿Qué es un 'byte'?",
            image: "https://www.seguritecnia.es/wp-content/uploads/2022/03/inteligencia-artificial-900x600.jpg",
            category: {
                id: 1,
                name: "Informática",
                usersQuantity: 0,
            },
            options: [
                { id: 201, questionId: 2, text: "Un tipo de dato que almacena un carácter", isCorrect: false },
                { id: 202, questionId: 2, text: "Una unidad de información compuesta por 8 bits", isCorrect: true },
                { id: 203, questionId: 2, text: "Un lenguaje de programación", isCorrect: false },
            ],
        },
        {
            id: 3,
            categoryId: 2,
            text: "¿Qué hace un 'firewall'?",
            image: "https://www.seguritecnia.es/wp-content/uploads/2022/03/inteligencia-artificial-900x600.jpg",
            category: {
                id: 2,
                name: "Seguridad",
                usersQuantity: 0,
            },
            options: [
                { id: 301, questionId: 3, text: "Protege una red de accesos no autorizados", isCorrect: true },
                { id: 302, questionId: 3, text: "Acelera la velocidad de internet", isCorrect: false },
                { id: 303, questionId: 3, text: "Almacena datos en la nube", isCorrect: false },
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
      const response = await fetch(`http://localhost:3000/api/v1/question/random-by-category`);
      
      if (!response.ok) {
        throw new Error('Error al obtener la pregunta');
      }

      const data: Question[] = await response.json();
      console.log('Pregunta recibida:', data);

      // Despachar setQuestions con los datos recibidos
      dispatch(setQuestions(data));
      dispatch(setCurrentQuestion())

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
            state.score=state.score+1;
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
        setCurrentQuestion: (state)=>{
            const firstQuestion = state.questions[0]
            state.currentQuestion = firstQuestion;
        },
        setSelectedOption: (state, action: PayloadAction<string>) => {
            state.selectedOption = action.payload;
        },
        setQuestions: (state, action: PayloadAction<Question[]>) => {
            state.questions = action.payload;
          },
    }
});

export const { setScore, nextCurrentQuestion, setSelectedOption, setCurrentQuestion, setQuestions } = dataSlice.actions;

export default dataSlice.reducer;
