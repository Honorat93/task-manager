// /frontend/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // Le serveur frontend tourne sur le port 3001
    proxy: {
      '/tasks': {
        target: 'http://localhost:3000', // Redirige les requêtes vers le backend sur le port 3000
        changeOrigin: true,
      },
    },
  },
});
