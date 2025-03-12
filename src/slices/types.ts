export interface DataState {
    questions: Question[];
    currentQuestion: Question;
    selectedOption: string;
    score: number;
}

export interface Question {
    ask: string;
    options: Option[];
    image: string;
}

interface Option {
    text: string;
    isCorrect: boolean;
}

export interface UiState {
    loading: boolean;
    isCorrect: boolean;
    progress: number;
    openedModal: boolean;
    showScoreModal: boolean;
}



export interface RootState {
    ui: UiState;     // Slice para el estado de la UI
    data: DataState; // Slice para el estado de los datos
  }

  