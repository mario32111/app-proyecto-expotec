import { useState, useEffect } from "react";
import { LinearProgress } from "@mui/material";
import ModalResultado from "./ModalResultado";

const Timer: React.FC = () => {
  const [progreso, setProgreso] = useState(0);
  const duracion = 10 * 1000; // 10 segundos en milisegundos

  useEffect(() => {
    const intervalo = 100; // Cada cuánto se actualiza el progreso (en ms)
    const incremento = (intervalo / duracion) * 100; // Cuánto aumenta en cada intervalo

    const timer = setInterval(() => {
      setProgreso((prev) => {
        const nuevoProgreso = prev + incremento;
        if (nuevoProgreso >= 100) {
          clearInterval(timer);
          return 100;
        }
        return nuevoProgreso;
      });
    }, intervalo);

    return () => clearInterval(timer); // Limpia el intervalo al desmontar el componente
  }, []);

  return (
    <div>
      <LinearProgress variant="determinate" value={progreso} color="secondary" />
      {progreso >= 100 &&       <ModalResultado 
        abierto={true} 
        esCorrecto={true}
      />}
    </div>
  );
};

export default Timer;
