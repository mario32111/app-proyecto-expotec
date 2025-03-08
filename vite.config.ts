import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // Permite conexiones desde cualquier dirección en la red
    port: 5173, // Usa el puerto por defecto de Vite o el que estés utilizando
  },
  plugins: [react()],
})
