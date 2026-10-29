import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    open: false,
  },
  build: {
    rollupOptions: {
      output: {
        // Split vendor libraries and heavy UI sections
        manualChunks: {
          // third‑party libraries
          vendor: ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
          // heavy UI components
          hostPortal: ['src/components/HostPortalPage.tsx'],
          notificationCenter: ['src/components/NotificationCenterModal.tsx'],
          interactiveMap: ['src/components/InteractiveMap.tsx'],
        },
      },
    },
  },
})
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    open: false
  }
})
