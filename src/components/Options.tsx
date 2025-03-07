import { FormControl, RadioGroup, FormControlLabel, Radio, Slide } from "@mui/material";
import { useState, useEffect, useRef } from "react";

const Opciones: React.FC = () => {
  const opciones = [
    "Técnicas computacionales que imitan la inteligencia humana.",
    "Hardware para cálculos avanzados.",
    "Un lenguaje de programación.",
    "Un sistema operativo."
  ];

  const [seleccion, setSeleccion] = useState<string | null>(null);
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
    setSeleccion(opcion);
    console.log("Opción seleccionada:", opcion);
  };

  return (
    <FormControl ref={containerRef} sx={{ marginLeft: "30px" }}>
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
