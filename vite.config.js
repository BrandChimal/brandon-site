import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    // En local no corren las funciones de /api (viven en Vercel):
    // el dev server las redirige a producción para poder probar el motor.
    proxy: {
      '/api': {
        target: 'https://brandon-site-delta.vercel.app',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      // Multi-page: el home (index.html) queda intacto; /pulso es entrada aparte.
      input: {
        main: resolve(__dirname, 'index.html'),
        pulso: resolve(__dirname, 'pulso.html'),
      },
    },
  },
})
