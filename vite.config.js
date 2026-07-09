import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
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
