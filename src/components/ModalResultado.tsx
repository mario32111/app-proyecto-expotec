import { Modal, Box, Typography, Button } from "@mui/material";

interface ModalResultadoProps {
  abierto: boolean;
  esCorrecto: boolean;
}

const ModalResultado: React.FC<ModalResultadoProps> = ({ abierto, esCorrecto}) => {
    const onCerrar = () => {

    }
  return (
    <Modal open={abierto} onClose={onCerrar}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          textAlign: "center",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" color={esCorrecto ? "green" : "red"}>
          {esCorrecto ? "¡Respuesta Correcta! 🎉" : "Respuesta Incorrecta ❌"}
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }} /* onClick={onSiguientePregunta} */>
          Siguiente Pregunta
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalResultado;
