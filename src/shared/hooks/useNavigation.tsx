import { useNavigate, useRoutes } from 'react-router-dom';
import OptionQuestionScreen from '../../pages/OptionQuestionScreen';
import NotFound from '../../pages/NotFoundScreen';

export const useNavigation = () => {
    const navigate = useNavigate();

    // Función para cambiar el path
    const changePath = (path: string) => {
        navigate(path);
    };

    return { changePath };
};

// Componente para las rutas de la aplicación
export const AppRoutes = () => {
    return useRoutes([
        { path: '/', element: <OptionQuestionScreen /> },
        { path: '*', element: <NotFound /> }, // Maneja rutas no encontradas
    ]);
};
