import { useState, useEffect, useRef } from "react";
import { LinearProgress } from "@mui/material";
import ModalResultado from "./ModalResultado";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../store";
import { setCorrectWithState, setOpenModal } from "../slices/uiSlice";
import styled, { keyframes, css } from "styled-components";
import ScoreModal from "./ScoreModal";

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

const TimerContainer = styled.div`
  max-width: 600px; // Ancho máximo para centrar
  width: 90%; // Ancho relativo para dispositivos pequeños
  margin: 0 auto; // Centrado horizontal
`;

const Timer: React.FC = () => {
  const [progreso, setProgreso] = useState(0);
  const duracion = 15 * 1000; // 10 segundos en milisegundos
  const dispatch = useDispatch<AppDispatch>();
  const progressBar = useSelector((state: RootState) => state.ui.progress);
  const showScoreModal = useSelector((state: RootState) => state.ui.showScoreModal);
  const modalAbierto = useSelector((state: RootState) => state.ui.openedModal); // Nuevo selector para verificar si el modal ya está abierto
  const timerInterval = useRef<NodeJS.Timeout | null>(null); // Referencia para el intervalo

  // Calcular el tiempo restante
  const time = 15 - ((progreso / 100) * duracion / 1000);
  const isCritical = time <= 5; // Cuando quedan 3 segundos

  useEffect(() => {
    if (progressBar === 5 || modalAbierto) { // Si el progreso es 5 o el modal ya está abierto, no iniciar el timer
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
        timerInterval.current = null;
      }
      return;
    }

    const intervalo = 100; // Cada cuánto se actualiza el progreso (en ms)
    const incremento = (intervalo / duracion) * 100; // Cuánto aumenta en cada intervalo

    timerInterval.current = setInterval(() => {
      setProgreso((prev) => {
        const nuevoProgreso = prev + incremento;
        if (nuevoProgreso >= 100) {
          if (!modalAbierto) { // Verifica si el modal NO está abierto antes de abrirlo
            dispatch(setOpenModal(true));
            dispatch(setCorrectWithState());
          }
          if (timerInterval.current) {
            clearInterval(timerInterval.current);
            timerInterval.current = null;
          }
          return 100;
        }
        return nuevoProgreso;
      });
    }, intervalo);

    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
        timerInterval.current = null;
      }
    }; // Limpia el intervalo al desmontar el componente o al cambiar las dependencias
  }, [progressBar, dispatch, modalAbierto]);

  useEffect(() => {
    setProgreso(0); // Reinicia el progreso a 0 cuando cambia la pregunta
  }, [progressBar]);

  return (
    <TimerContainer>
      <LinearProgress variant="determinate" value={progreso} color="secondary" />
      {modalAbierto && !showScoreModal && <ModalResultado />} {/* Usa el selector modalAbierto */}
      <ScoreModal />
      <TimeDisplay $isCritical={isCritical}>{time.toFixed(1)} s</TimeDisplay>
    </TimerContainer>
  );
};

export default Timer;