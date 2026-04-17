import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Production base: GitHub Pages uses repo subpath; Netlify serves from site root.
// Netlify sets NETLIFY=true during build. Override anytime with VITE_BASE_URL (must end with /).
function productionBase() {
  const fromEnv = process.env.VITE_BASE_URL
  if (fromEnv) {
    return fromEnv.endsWith('/') ? fromEnv : `${fromEnv}/`
  }
  if (process.env.NETLIFY === 'true') {
    return '/'
  }
  return '/MajeedLabWebsiteMain-Frontend/'
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'

  return {
    plugins: [react()],
    base: isProd ? productionBase() : '/',
    build: {
      outDir: 'dist',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
          },
        },
      },
    },
  }
})
