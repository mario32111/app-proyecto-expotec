import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer/rootReducer';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./shared/theme";

// Configurar la store con Redux DevTools habilitado
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production', // DevTools habilitado solo en desarrollo
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
