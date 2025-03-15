import { LinearProgress } from "@mui/material";
import { RootState } from "../store";
import { useSelector } from 'react-redux';
import styled from "styled-components";

const ProgressContainer = styled.div`
  max-width: 600px; // Ancho máximo para centrar
  width: 90%; // Ancho relativo para dispositivos pequeños
  margin: 0 auto; // Centrado horizontal
`;

function Progreso() {
  const progreso = useSelector((state: RootState) => state.ui.progress) * 20;
  return (
    <ProgressContainer>
      <LinearProgress
        variant="determinate"
        value={progreso}
        color="primary"
      />
    </ProgressContainer>
  );
}

export default Progreso;