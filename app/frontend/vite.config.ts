/**
 * Frog Frontend Vite Configuration
 * - Uses fixed port 4142 in development by project requirement.
 * - Proxies API traffic to backend port 4141.
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4142,
    strictPort: true,
    proxy: {
      '/api': 'http://127.0.0.1:4141'
    }
  }
});
