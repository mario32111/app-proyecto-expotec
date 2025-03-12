import { FormControl, RadioGroup, FormControlLabel, Radio, Slide } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../store";
import { setCurrentQuestion, setSelectedOption } from "../slices/dataSlice";

const Opciones: React.FC = () => {
  // Ahora obtenemos las opciones desde el estado de Redux
  const opciones = useSelector((state: RootState) => state.data.currentQuestion.options);

  const seleccion = useSelector((state: RootState) => state.data.selectedOption);
  const dispatch = useDispatch<AppDispatch>();

  const [isVisibleIndex, setIsVisibleIndex] = useState<number>(-1); // Controla la visibilidad progresiva de opciones
  const containerRef = useRef<HTMLDivElement | null>(null); // Define la referencia

  useEffect(() => {
    // Reinicia la animación cada vez que cambian las opciones
    setIsVisibleIndex(-1);
    // Mostrar las opciones con un retraso progresivo
    opciones.forEach((_, index) => {
      setTimeout(() => {
        setIsVisibleIndex((prev) => prev + 1);
      }, index * 100); // Retraso progresivo de 100ms entre opciones
    });
  }, [opciones]); // Dependencia de 'opciones' para que se ejecute cuando cambien

  useEffect(() => {
    dispatch(setCurrentQuestion())
  },[])

  const manejarSeleccion = (opcion: string) => {
    dispatch(setSelectedOption(opcion));
  };

  return (
    <FormControl
      ref={containerRef}
      sx={{
        marginLeft: { xs: 0, sm: 0, md: "30px" } // Aplica margen izquierdo solo en pantallas medianas y grandes
      }}
    >
      <RadioGroup value={seleccion} onChange={(e) => manejarSeleccion(e.target.value)}>
        {opciones.map((opcion, index) => (
          <Slide key={index} direction="down" in={index <= isVisibleIndex} mountOnEnter unmountOnExit>
            <FormControlLabel value={opcion.text} control={<Radio />} label={opcion.text} />
          </Slide>
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default Opciones;
