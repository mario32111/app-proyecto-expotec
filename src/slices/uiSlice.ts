import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, UiState } from "./types"; // Importa la interfaz desde el archivo de tipos
import { AppThunk } from "../store";
import { setScore } from "./dataSlice"

const initialState: UiState = {
    loading: false,
    isCorrect: false,
    progress: 0,
    openedModal: false,
    showScoreModal: false,
    images: {
        malas: [
            "https://i.pinimg.com/736x/17/ef/f5/17eff5d4df16b95d8a30184f57a13ed5.jpg",
            "https://i.pinimg.com/736x/e9/eb/9e/e9eb9ec1b0da71003807507b2368cd21.jpg",
            "https://i.pinimg.com/736x/cc/01/94/cc0194b9bdf66583c66c443b4de51981.jpg",
            "https://i.pinimg.com/736x/11/33/ee/1133ee10c4b315f61a33d5ac912636c1.jpg",
            "https://i.pinimg.com/736x/3a/00/5c/3a005cdab19043899433a90c09bc5f35.jpg",
            "https://i.pinimg.com/736x/86/fa/cc/86facc99efdb03aa3ea2c2abe03721aa.jpg",
            "https://i.pinimg.com/736x/1b/9e/2f/1b9e2f401bcc7364ba356bde6b4a40fb.jpg",
            "https://i.pinimg.com/736x/16/ec/69/16ec69a25dcff3ffca8780f8baa340e4.jpg",
            "https://i.pinimg.com/736x/89/f5/c4/89f5c4595553cfb45bad52c558604307.jpg",
            "https://i.pinimg.com/736x/24/9d/5e/249d5e83ae46ccb9f997aa96977d4b2f.jpg",
        ],
        buenas: [
            "https://i.pinimg.com/736x/e7/38/67/e738676e3f188f420dd9bf70557f2bba.jpg",
            "https://i.pinimg.com/736x/a5/97/d9/a597d9c19a2be1657f85bd75910c22c3.jpg",
            "https://i.pinimg.com/736x/08/97/5b/08975b323d6a22bbb3d48cafbcd971e7.jpg",
            "https://i.pinimg.com/736x/b0/40/e7/b040e76ad3b62145df9c938f4c96e5b8.jpg",
            "https://i.pinimg.com/736x/5d/40/21/5d4021094b8d27b68de13897bc1846f5.jpg",
            "https://i.pinimg.com/736x/4f/02/df/4f02dfee13911418e0b975e75379e7de.jpg",
            "https://i.pinimg.com/736x/70/33/2d/70332df596e43c7d8b218ae0510629da.jpg",
            "https://i.pinimg.com/736x/ef/89/eb/ef89ebd99876f3768ba4e9f69c660191.jpg",
            "https://i.pinimg.com/736x/13/5c/27/135c27e76a14e2477059cea160c81dac.jpg",
            "https://i.pinimg.com/736x/73/da/9f/73da9ff79fd9fa19603d15163f65ebbf.jpg",
            "https://i.pinimg.com/736x/f9/90/ac/f990acfb4ffa531de59f1021d5efcdcc.jpg",
        ]
    }
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
            state.progress = state.progress + 1;
        },
        setOpenModal: (state, action: PayloadAction<boolean>) => {
            state.openedModal = action.payload;
        },
        setProgress(state) {
            state.progress = state.progress + 1;
        },
        setShowScoreModal(state, action: PayloadAction<boolean>) {
            state.showScoreModal = action.payload
        },
        setDefaultUi() {
            return initialState;
        }
    }
});

export const { setLoading, setCorrect, setProgress, setOpenModal, setShowScoreModal, setDefaultUi } = UiSlice.actions;

export default UiSlice.reducer;
