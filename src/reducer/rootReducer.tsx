import { combineReducers } from "redux";
import DataSlice from "../slices/dataSlice";
import uiReducer from "../slices/uiSlice";
import { RootState } from "../types"; // Asegúrate de importar la interfaz RootState

// Combina los reducers
const rootReducer = combineReducers({
  data: DataSlice,
  ui: uiReducer,
});

// Exporta el tipo RootState basado en el rootReducer
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
