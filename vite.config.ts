import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 700,
    target: 'esnext',
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  
});
