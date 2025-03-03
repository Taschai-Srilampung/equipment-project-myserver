import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: '/docker-project/',
  server: {
    host: '0.0.0.0',
    port: 5173,
    hmr: {
      host: 'www2.math.sc.chula.ac.th',
      protocol: 'ws',
    },
  },
})