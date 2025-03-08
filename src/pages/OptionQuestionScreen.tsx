import { useState } from "react";
import Progreso from "../components/ProgressBar"; // Asegúrate de que la ruta es correcta
import { Card, CardContent, CardMedia, Slide, Typography } from "@mui/material";
import Opciones from "../components/Options";
import Timer from "../components/TimeBar";
import BotonConfirmar from "../components/BotonConfirmar";

const OptionQuestionScreen = () => {
  const [progreso, setProgreso] = useState<number>(1); // Estado con progreso inicial
  const [pregunta, setPregunta] = useState<string>("¿Qué es la inteligencia artificial?"); // Estado con progreso inicial

  const imagenUrl = "https://www.seguritecnia.es/wp-content/uploads/2022/03/inteligencia-artificial-900x600.jpg"; // URL de una imagen de ejemplo

  return (
    <div style={{ maxWidth: "500px", minWidth: "350px", width: "50%", margin: "20px auto" }}>
      <div style={{ width: "100%" }}>
        <Progreso progreso={progreso} />
      </div>
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <Card sx={{ maxWidth: 500, margin: "auto", mt: 2, p: 2 }}>
          <CardMedia
            component="img"
            height="200"
            image={imagenUrl}
            alt="Imagen ilustrativa"
          />
          <CardContent>
            <Typography sx={{ marginBottom: "30px" }} variant="h5">{pregunta}</Typography>
            <div>
              <Opciones />
            </div>
            <BotonConfirmar />
          </CardContent>
        </Card>
      </Slide>

      <div style={{ width: "100%", marginTop: "20px" }}>
        <Timer />
      </div>
    </div>
  );
};

export default OptionQuestionScreen;
