import { Modal, Box, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { setDefaultUi, setShowScoreModal } from "../slices/uiSlice";
import { fetchRandomQuestionByCategory, setDefaultData } from "../slices/dataSlice";
const ScoreModal: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const showScoreModal = useSelector((state: RootState) => state.ui.showScoreModal);
  const score = useSelector((state: RootState) => state.data.score);

  const onCerrar = () => {
    dispatch(setShowScoreModal(false)); // Cierra el modal de resultados
    dispatch(setDefaultUi());
    dispatch(setDefaultData());

    const fetchData = async () => {
      await dispatch(fetchRandomQuestionByCategory());
    };
    fetchData();

  };

  return (
    <Modal open={showScoreModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          maxWidth: "400px",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          textAlign: "center",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          ¡Resultados Finales!
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Tu puntuación final es: <strong>{score}/5</strong>
        </Typography>
        <Button
          onClick={onCerrar}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Reintentar
        </Button>
      </Box>
    </Modal>
  );
};

export default ScoreModal;