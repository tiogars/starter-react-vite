import { defineConfig } from 'vitest/config'
import { loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables for the current mode into `env`.
  // Using empty prefix ('') to get both VITE_* and other vars if needed.
  const env = loadEnv(mode, process.cwd(), '')

  // Prefer the VITE_ prefixed value from loaded env; fall back to process.env
  const VITE_API_URL = env.VITE_API_URL || process.env.VITE_API_URL

  const isDev = mode === 'development'

  return {
    plugins: [react()],
    // Enable Vite dev server proxy only during development.
    // Production build served by nginx will use the runtime reverse-proxy instead.
    ...(isDev
      ? {
          server: {
            proxy: {
              '/api': {
                target: VITE_API_URL,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
              },
            },
          },
        }
      : {}),
    test: {
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
      css: true,
      server: {
        deps: {
          inline: ['@mui/x-data-grid'],
        },
      },
      coverage: {
        reporter: ['text', 'html'],
      },
    },
  }
})
