import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      'Contexts': '/src/Contexts',
      'Shop': '/src/Components/Partials/Shop',
      'Data': '/src/Data',
      'database': '/server-files/database',
    },
  }
})