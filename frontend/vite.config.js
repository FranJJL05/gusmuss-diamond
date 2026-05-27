import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Proxy: las llamadas a /api desde React se redirigen a Symfony (puerto 8000)
// Así evitamos problemas de CORS en desarrollo.
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: true, // Permite conexiones desde el dominio de IONOS
  },
  server: {
    allowedHosts: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
