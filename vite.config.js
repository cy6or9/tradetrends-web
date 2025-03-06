import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  define: {
    'process.env.VITE_FINNHUB_API_KEY': '""' // Prevents exposing API key in the build
  }
});