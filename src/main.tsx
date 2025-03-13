import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./shared/theme";
import { store } from './store.ts';
import { BrowserRouter } from 'react-router-dom';
import ParticlesBackground from './components/ParticlesBackground.tsx';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
      <ParticlesBackground />
        <App />
      </ThemeProvider>
    </Provider>
    </BrowserRouter>

  </StrictMode>
);
