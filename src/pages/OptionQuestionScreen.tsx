import Progreso from "../components/ProgressBar"; 
import { Card, CardContent, CardMedia, Slide, Typography, CircularProgress } from "@mui/material";
import Opciones from "../components/Options";
import Timer from "../components/TimeBar";
import BotonConfirmar from "../components/BotonConfirmar";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./../store";
import { RootState } from "../store";
import { useEffect, useRef } from "react";
import { fetchRandomQuestionByCategory } from "../slices/dataSlice";

const OptionQuestionScreen = () => {
  const imagenUrl = useSelector((state: RootState) => state.data.currentQuestion.image || "");
  const pregunta = useSelector((state: RootState) => state.data.currentQuestion.text);
  const loading = useSelector((state: RootState) => state.ui.loading); // Escucha el estado loading
  const dispatch = useAppDispatch();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      const fetchData = async () => {
        await dispatch(fetchRandomQuestionByCategory());
      };
      fetchData();
    }
  }, [dispatch]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress size={60} thickness={5} color="primary" /> {/* Spinner de carga */}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "500px", minWidth: "350px", width: "50%", margin: "20px auto" }}>
      <div style={{ width: "100%", margin: "auto"}}>
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