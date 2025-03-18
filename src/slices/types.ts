//DATOS DE LA API
export interface Question {
  id: number;
  categoryId: number;
  text: string;
  image: string | null;
  category: Category;
  options: Option[];
}

export interface Option {
  id: number;
  questionId: number;
  text: string;
  isCorrect: boolean;
}

export interface Category {
  id: number;
  name: string;
  usersQuantity: number;
}

export interface History {
  redes: boolean;
  web: boolean;
  ia: boolean;
  bd: boolean;
  seguridad: boolean;
}


export interface DataState {
  questions: Question[];
  currentQuestion: Question;
  selectedOption?: string;
  score: number;
  history: History,
}







//UI
export interface UiState {
  loading: boolean;
  isCorrect: boolean;
  progress: number;
  openedModal: boolean;
  showScoreModal: boolean;
  images: stikers
}

interface stikers {
  buenas: string[],
  malas: string[]
}


export interface RootState {
  ui: UiState;     // Slice para el estado de la UI
  data: DataState; // Slice para el estado de los datos
}

