import { LinearProgress } from "@mui/material";

function Progreso() {
  const progreso = 1;
  return (
    <LinearProgress
      variant="determinate"
      value={progreso}
      color="primary"
    />
  );
}

export default Progreso;
