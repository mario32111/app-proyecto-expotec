import { useState, useEffect } from "react";
import { LinearProgress } from "@mui/material";
import ModalResultado from "./ModalResultado";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../store";
import { setCorrectWithState } from "../slices/uiSlice";

const Timer: React.FC = () => {
  const [progreso, setProgreso] = useState(0);
  const duracion = 10 * 1000; // 10 segundos en milisegundos
  const dispatch = useDispatch<AppDispatch>();
  const isCorrect = useSelector((state: RootState) => state.ui.isCorrect);

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

  // Función que valida las respuestas cuando el progreso llega a 100
  useEffect(() => {
    if (progreso >= 100) {
      dispatch(setCorrectWithState());
    }
  }, [progreso, dispatch]);

  return (
    <div>
      <LinearProgress variant="determinate" value={progreso} color="secondary" />
      {progreso >= 100 && <ModalResultado abierto={true} esCorrecto={isCorrect} />}
    </div>
  );
};

export default Timer;
