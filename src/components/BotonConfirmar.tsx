import { Button } from "@mui/material";
import { useState } from "react";
import ModalResultado from "./ModalResultado";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from 'react-redux';
import { setCorrectWithState, setOpenModal } from "../slices/uiSlice";
import ScoreModal from "./ScoreModal";

const BotonConfirmar: React.FC = () => {
  const [respuestaSeleccionada] = useState<boolean | null>(true);

  //redux
  const openModal = useSelector((state: RootState) => state.ui.openedModal);
  const dispatch: AppDispatch = useDispatch();

  const manejarConfirmacion = () => {
    dispatch(setOpenModal(true));
    dispatch(setCorrectWithState());
  };
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={manejarConfirmacion}
        disabled={!respuestaSeleccionada}
        sx={{ mt: 2, width: "100%" }} // Agrega margen arriba y ancho completo
      >
        Confirmar Respuesta
      </Button>
      {openModal && <ModalResultado/>}     
      <ScoreModal />
 

    </>



  );
};

export default BotonConfirmar;
