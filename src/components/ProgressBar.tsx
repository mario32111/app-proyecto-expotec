import { LinearProgress } from "@mui/material";
import { RootState } from "../store";
import { useSelector } from 'react-redux';

function Progreso() {
  const progreso = useSelector((state: RootState) => state.ui.progress)*20;
  return (
    <LinearProgress
      variant="determinate"
      value={progreso}
      color="primary"
    />
  );
}

export default Progreso;
