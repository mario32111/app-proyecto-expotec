import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataState } from "./types"; // Asegúrate de que la interfaz de tipo esté bien definida

const initialState: DataState = {
    questions : [
        {
            ask: "¿Qué significa 'CPU' en informática?",
            options: [
                { text: "Unidad Central de Procesamiento", isCorrect: true },
                { text: "Controlador Principal de Usuario", isCorrect: false },
                { text: "Computadora Personal Universal", isCorrect: false },
                { text: "Centro de Procesos Unidos", isCorrect: false }
            ],
            image: "https://www.seguritecnia.es/wp-content/uploads/2022/03/inteligencia-artificial-900x600.jpg",
        },
        {
            ask: "¿Qué es un 'byte'?",
            options: [
                { text: "Un tipo de dato que almacena un carácter", isCorrect: false },
                { text: "Una unidad de información compuesta por 8 bits", isCorrect: true },
                { text: "Un lenguaje de programación", isCorrect: false },
                { text: "Un dispositivo de almacenamiento", isCorrect: false }
            ],
            image: "https://www.seguritecnia.es/wp-content/uploads/2022/03/inteligencia-artificial-900x600.jpg",
        },
        {
            ask: "¿Qué hace un 'firewall'?",
            options: [
                { text: "Protege una red de accesos no autorizados", isCorrect: true },
                { text: "Acelera la velocidad de internet", isCorrect: false },
                { text: "Almacena datos en la nube", isCorrect: false },
                { text: "Convierte archivos a diferentes formatos", isCorrect: false }
            ],
            image: "https://www.seguritecnia.es/wp-content/uploads/2022/03/inteligencia-artificial-900x600.jpg",
        },
        {
            ask: "¿Qué es un 'URL'?",
            options: [
                { text: "Un lenguaje de programación", isCorrect: false },
                { text: "Un protocolo de transferencia de archivos", isCorrect: false },
                { text: "La dirección de una página web", isCorrect: true },
                { text: "Un tipo de virus informático", isCorrect: false }
            ],
            image: "https://www.seguritecnia.es/wp-content/uploads/2022/03/inteligencia-artificial-900x600.jpg",
        },
        {
            ask: "¿Qué es 'HTML'?",
            options: [
                { text: "Un lenguaje de programación para aplicaciones móviles", isCorrect: false },
                { text: "Un sistema operativo", isCorrect: false },
                { text: "Un lenguaje de marcado para crear páginas web", isCorrect: true },
                { text: "Un tipo de base de datos", isCorrect: false }
            ],
            image: "https://www.seguritecnia.es/wp-content/uploads/2022/03/inteligencia-artificial-900x600.jpg",
        }
    ],
    currentQuestion: {
        ask: "",
        options: [
            { text: "", isCorrect: false},
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false }
        ],
        image: "",
    },
    selectedOption: ""
};

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        // Acción para establecer la calificación (aunque no hace nada en este momento)
        setCalification: (state, action: PayloadAction<string>) => {
            state.selectedOption = action.payload;
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
    }
});

export const { setCalification, nextCurrentQuestion, setSelectedOption, setCurrentQuestion } = dataSlice.actions;

export default dataSlice.reducer;
