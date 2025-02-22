import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/doomflags/', // Ensure this matches your GitHub repository name
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  build: {
    rollupOptions: {
      external: [
        'bootstrap/dist/css/bootstrap.min.css'
      ]
    }
  }
})