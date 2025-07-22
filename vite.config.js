import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Needed for Vercel root deployment
  server: {
    port: 5173,
    strictPort: true
  }
});
