import { Button } from "@mui/material";
import { useState } from "react";
import ModalResultado from "./ModalResultado";


const BotonConfirmar: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean | null>(false)
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<boolean | null>(true);

  const manejarConfirmacion = () => {
    setOpenModal(true);
    if (respuestaSeleccionada) {
      console.log("Respuesta confirmada:", respuestaSeleccionada);
    } else {
      console.log("Por favor, selecciona una opción.");
    }
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
      {openModal &&       <ModalResultado 
        abierto={true} 
        esCorrecto={true}
      />}
    </>



  );
};

export default BotonConfirmar;
