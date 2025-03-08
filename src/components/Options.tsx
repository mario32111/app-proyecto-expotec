import { FormControl, RadioGroup, FormControlLabel, Radio, Slide } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../store";
import { setSelectedOption } from "../slices/dataSlice";
const Opciones: React.FC = () => {
  const opciones = [
    "Técnicas computacionales que imitan la inteligencia humana.",
    "Hardware para cálculos avanzados.",
    "Un lenguaje de programación.",
    "Un sistema operativo."
  ];  
  
  const seleccion = useSelector((state: RootState) => state.data.selectedOption);
  const dispatch = useDispatch<AppDispatch>();

  const [isVisibleIndex, setIsVisibleIndex] = useState<number>(-1); // Controla la visibilidad progresiva de opciones
  const containerRef = useRef<HTMLDivElement | null>(null); // Define la referencia

  useEffect(() => {
    opciones.forEach((_, index) => {
      setTimeout(() => {
        setIsVisibleIndex((prev) => prev + 1);
      }, index * 100); // Retraso progresivo de 500ms entre opciones
    });
  }, []);

  const manejarSeleccion = (opcion: string) => {
    dispatch(setSelectedOption(opcion));
    console.log("Opción seleccionada:", opcion);
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
            <FormControlLabel value={opcion} control={<Radio />} label={opcion} />
          </Slide>
        ))}
      </RadioGroup>
    </FormControl>

  );
};

export default Opciones;
