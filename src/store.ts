import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import rootReducer from './reducer/rootReducer';
// Configurar la store con Redux DevTools habilitado
export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production', // DevTools habilitado solo en desarrollo
  });
  
  // Definición del tipo `AppThunk`
  // Un Thunk es una función que puede retornar un resultado asíncrono, y tiene acceso a dispatch, getState y otros
  export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
  
  // Exporta el tipo RootState para que lo puedas usar en cualquier lugar que necesite referirse al estado global
  export type RootState = ReturnType<typeof store.getState>;
  
  // Exporta el dispatch de la tienda para usarlo en componentes de React
  export type AppDispatch = typeof store.dispatch;