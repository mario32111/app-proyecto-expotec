import { combineReducers } from "redux";
import DataSlice from "../slices/DataSlice";
import uiReducer from "../slices/uiSlice";


const rootReducer = combineReducers({
    data: DataSlice,
    ui: uiReducer,
});

export default rootReducer;