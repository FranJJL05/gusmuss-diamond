import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Proxy: las llamadas a /api desde React se redirigen a Symfony
// En Kubernetes (K3s) el backend se expone en el NodePort 30080
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
        target: 'http://localhost:30080',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:30080',
        changeOrigin: true,
      },
    },
  },
})

