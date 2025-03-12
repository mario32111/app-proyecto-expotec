import { Modal, Box, Typography, Button } from "@mui/material";
import { setOpenModal, setProgress, setShowScoreModal } from "../slices/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { nextCurrentQuestion } from "../slices/dataSlice";

const ModalResultado: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isCorrect = useSelector((state: RootState) => state.ui.isCorrect);
  const openModal = useSelector((state: RootState) => state.ui.openedModal);
  const progress = useSelector((state: RootState) => state.ui.progress);

  const onCerrar = () => {
    dispatch(setOpenModal(false)); // Cierra el modal actual
  };

  const onSiguientePregunta = () => {
    onCerrar(); // Cierra el modal actual
    dispatch(setProgress()); // Incrementa el progreso
    dispatch(nextCurrentQuestion(progress + 1)); // Pasa a la siguiente pregunta

    if (progress + 1 >= 5) {
      // Si el progreso es igual o mayor a 5, muestra el modal de resultados
      dispatch(setShowScoreModal(true));
    }
  };

  return (
    <Modal open={openModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          maxWidth: "280px",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          textAlign: "center",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" color={isCorrect ? "green" : "red"}>
          {isCorrect ? "¡Respuesta Correcta! 🎉" : "Respuesta Incorrecta ❌"}
        </Typography>
        <Button
          onClick={onSiguientePregunta}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Siguiente Pregunta
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalResultado;