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
})


// export default defineConfig({
//   plugins: [react()],
//   base: "/doomFlags/", // Ensure correct base path for GitHub Pages
// });