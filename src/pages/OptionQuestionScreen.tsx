import Progreso from "../components/ProgressBar"; 
import { Card, CardContent, CardMedia, Slide, Typography } from "@mui/material";
import Opciones from "../components/Options";
import Timer from "../components/TimeBar";
import BotonConfirmar from "../components/BotonConfirmar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect, useRef } from "react";
import { fetchRandomQuestionByCategory } from "../slices/dataSlice";

const OptionQuestionScreen = () => {
  const imagenUrl = useSelector((state: RootState) => state.data.currentQuestion.image);
  const pregunta = useSelector((state: RootState) => state.data.currentQuestion.text);
  const dispatch = useDispatch();
  const hasFetched = useRef(false); // Bandera para controlar la ejecución

  useEffect(() => {
    if (!hasFetched.current) { // Solo ejecutar si no se ha hecho antes
      hasFetched.current = true; // Marcar como ejecutado
      const fetchData = async () => {
        await dispatch(fetchRandomQuestionByCategory());
      };
      fetchData();
    }
  }, [dispatch]);
  
  return (
    <div style={{ maxWidth: "500px", minWidth: "350px", width: "50%", margin: "20px auto" }}>
      <div style={{ width: "100%" }}>
        <Progreso />
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

      <div style={{ width: "100%", marginTop: "10px" }}>
        <Timer />
      </div>
    </div>
  );
};

export default OptionQuestionScreen;
