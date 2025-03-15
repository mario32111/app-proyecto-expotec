import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Bar } from "react-chartjs-2";
import { Box, CircularProgress, Typography, Card, CardContent, Slide } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { config } from "../config/config";

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const socket = io(config.api_url); // Asegúrate de que coincida con la URL de tu backend

// Definir la interfaz para los datos de categorías
interface CategoryData {
  id: number;
  name: string;
  usersQuantity: number;
}

// Definir el tipo del estado de datos
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

const UsersCategoryChart = () => {
  const [data, setData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Función para obtener los datos iniciales
  const fetchData = async () => {
    try {
      const response = await fetch(`${config.api_url}/api/v1/category/users-quantity`);
      const categories: CategoryData[] = await response.json();
      setData(formatChartData(categories));
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Función para formatear los datos para Chart.js
  const formatChartData = (categories: CategoryData[]): ChartData => ({
    labels: categories.map((cat) => cat.name),
    datasets: [
      {
        label: "Usuarios por Categoría",
        data: categories.map((cat) => cat.usersQuantity),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    fetchData(); // Obtener datos al cargar

    // Escuchar el evento de actualización en tiempo real
    socket.on("actualizarCategorias", (newCategories: CategoryData[]) => {
      console.log("🔄 Datos actualizados recibidos:", newCategories);
      setData(formatChartData(newCategories));
    });

    return () => {
      socket.off("actualizarCategorias");
    };
  }, []);

  return (
    <Box sx={{ width: "60%", height: "95vh", minWidth: "280px", margin: "auto", textAlign: "center", padding: 2 }}>
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <Card sx={{ width: "90%", height: "90%", minWidth: "260px", margin: "auto", p: 2 }}>
          <CardContent>
            <Typography variant="h5" sx={{ marginBottom: "20px" }}>
              Usuarios por Categoría
            </Typography>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                <CircularProgress size={60} thickness={5} color="primary" />
              </Box>
            ) : (
              <Box sx={{ height: "400px", maxHeight: "70vh", position: "relative" }}>
                <Bar
                  data={data!}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false, // Permite que el gráfico se ajuste al contenedor
                    plugins: {
                      legend: {
                        position: "top",
                      },
                      title: {
                        display: true,
                        text: "Usuarios por Categoría",
                      },
                    },
                  }}
                />
              </Box>
            )}
          </CardContent>
        </Card>
      </Slide>
    </Box>
  );
};

export default UsersCategoryChart;