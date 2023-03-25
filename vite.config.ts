import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import {config} from 'dotenv';

config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: 'src',
  server: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 3000,
  },
  define: {
    API_URL: process.env.API_URL
  }
})
