import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
// base must match the GitHub Pages project path in production
// (https://<user>.github.io/car-garage/), but stays "/" in dev so
// `npm run dev` serves at http://localhost:5173 with no prefix.
export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  base: command === 'build' ? '/car-garage/' : '/',
}));
