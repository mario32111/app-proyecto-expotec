import { useState, useEffect } from "react";
import { LinearProgress } from "@mui/material";
import ModalResultado from "./ModalResultado";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../store";
import { setCorrectWithState, setOpenModal } from "../slices/uiSlice";
import styled, { keyframes, css } from "styled-components";

const blinkAnimation = keyframes`
  0%, 100% { transform: scale(1); color: black; font-weight: normal; }
  50% { transform: scale(1.1); color: darkred; font-weight: bold; }
`;

const TimeDisplay = styled.div<{ $isCritical: boolean }>`
  text-align: right;
  font-size: 1.2em;
  ${({ $isCritical }) => 
    $isCritical &&
    css`
      animation: ${blinkAnimation} 0.8s ease-in-out infinite;
    `}
`;

const Timer: React.FC = () => {
  const [progreso, setProgreso] = useState(0);
  const duracion = 10 * 1000; // 10 segundos en milisegundos
  const dispatch = useDispatch<AppDispatch>();
  const progressBar = useSelector((state: RootState) => state.ui.progress);

  // Calcular el tiempo restante
  const time = 10 - ((progreso / 100) * duracion / 1000);
  const isCritical = time <= 3; // Cuando quedan 3 segundos

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
  }, [progressBar]);

  // Función que valida las respuestas cuando el progreso llega a 100
  useEffect(() => {
    if (progreso >= 100) {
      dispatch(setOpenModal(true));
      dispatch(setCorrectWithState());
    }
  }, [progreso, dispatch]);

  useEffect(() => {
    setProgreso(-5);
  }, [progressBar]);

  return (
    <>
      <div>
        <LinearProgress variant="determinate" value={progreso} color="secondary" />
        {progreso >= 100 && <ModalResultado />}
      </div>
      <TimeDisplay $isCritical={isCritical}>{time.toFixed(1)} s</TimeDisplay>
    </>
  );
};

export default Timer;
