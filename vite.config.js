import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    // Original photos live on iCloud Drive as placeholders; watching them
    // stalls the dev server (stat/read blocks until macOS hydrates the file).
    watch: { ignored: ['**/Fotos and assets/**'] },
  },
  build: { assetsInlineLimit: 2048 },
})
