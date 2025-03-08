import { Button } from "@mui/material";
import { useState } from "react";
import ModalResultado from "./ModalResultado";
import { RootState } from "../store";
import { setCorrectWithState } from "../slices/uiSlice";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';

const BotonConfirmar: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean | null>(false)
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<boolean | null>(true);

  const isCorrect= useSelector((state: RootState) => state.ui.isCorrect)

  const dispatch = useDispatch<AppDispatch>();
  const manejarConfirmacion = () => {
    setOpenModal(true);
    dispatch(setCorrectWithState())
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
      {openModal && <ModalResultado
        abierto={true}
        esCorrecto={isCorrect}
      />}
    </>



  );
};

export default BotonConfirmar;
