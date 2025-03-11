import { Modal, Box, Typography, Button } from "@mui/material";
import { setOpenModal, setProgress } from "../slices/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { nextCurrentQuestion } from "../slices/dataSlice";


const ModalResultado: React.FC = () => {

  //Redux
  const isCorrect = useSelector((state: RootState) => state.ui.isCorrect);
  const openModal = useSelector((state: RootState) => state.ui.openedModal);
  const dispatch: AppDispatch = useDispatch();
  const progress = useSelector((state: RootState) => state.ui.progress);

  const onCerrar = () => {
    dispatch(setOpenModal(false)); // Cierra el modal
  };
  
  const onSiguientePregunta = () => {
    onCerrar(); // Cierra el modal después de navegar
    dispatch(setProgress())
    dispatch(nextCurrentQuestion(progress+1))
  };


  return (
    <Modal open={openModal} onClose={onCerrar}>
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
        <Button onClick={onSiguientePregunta} variant="contained" color="primary" sx={{ mt: 2 }}>
          Siguiente Pregunta
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalResultado;
