import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/sandbox/', // For GitHub Pages at username.github.io/sandbox/
  build: {
    outDir: 'dist'
  }
})
