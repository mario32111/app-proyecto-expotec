import { LinearProgress } from "@mui/material";

interface ProgresoProps {
  progreso: number; // Asegura que progreso sea un número
}

function Progreso({ progreso }: ProgresoProps) {
    return (
        <LinearProgress
          variant="determinate"
          value={progreso} 
          color="primary"
        />
      );
      }

export default Progreso;
