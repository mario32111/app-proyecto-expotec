import { createTheme} from "@mui/material/styles";

export const theme = createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#00C6FF" }, // Azul Cian
      secondary: { main: "#FF4081" }, // Rosa Neón
      success: { main: "#4CAF50" }, // Verde
      error: { main: "#FF3D00" }, // Rojo
      warning: { main: "#FFC107" }, // Amarillo
      background: { default: "#121212", paper: "#1E1E1E" }, // Fondo Oscuro
      text: { primary: "#E0E0E0" }, // Texto Claro
    },
  });
  