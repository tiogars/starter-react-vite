import { defineConfig } from 'vitest/config'
import { loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'fs'
import { join } from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables for the current mode into `env`.
  // Using empty prefix ('') to get both VITE_* and other vars if needed.
  const env = loadEnv(mode, process.cwd(), '')

  // Prefer the VITE_ prefixed value from loaded env; fall back to process.env
  const VITE_API_URL = env.VITE_API_URL || process.env.VITE_API_URL

  const isDev = mode === 'development'

  // Get repository name from package.json for GitHub Pages base path
  const packageJson = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf-8'))
  const repoName = packageJson.name
  const basePath = process.env.GITHUB_PAGES === 'true' ? `/${repoName}/` : '/'

  return {
    plugins: [react()],
    base: basePath,
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
    build: {
      chunkSizeWarningLimit: 1000,
    },
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
        provider: 'v8', // Use v8 for better performance and accuracy
        reporter: ['text', 'html', 'lcov'],
        reportsDirectory: './coverage',
        exclude: [
          'node_modules/',
          'src/setupTests.ts',
          '**/*.d.ts',
          '**/*.config.*',
          '**/mockData',
          'src/store/*Api.ts', // Exclude auto-generated API files
          '**/*.types.ts', // Exclude type-only files
          'src/components/ThemeShowcase/**', // Large UI showcase component
          'src/pages/Settings/ThemeSettingsPage/**', // Complex theme customization UI
          'src/pages/Settings/RoutePage/**', // Complex route management UI
          'src/pages/ErrorPage/**', // Error pages are hard to test in unit tests
          'src/pages/FeaturesPage/**', // Static content pages
          'src/pages/ArchitecturePage/**', // Static content pages
          'src/pages/SettingsPage/**', // Static settings landing page
          'src/pages/Theme*Page.tsx', // Theme showcase pages
          'src/pages/SamplePage/**', // Complex CRUD page requiring integration tests
          'src/components/ApiHealth/**', // API health monitoring UI
          'src/components/SampleUpdateDialog/**', // Complex form with extensive validation
          'src/hooks/useSampleGrid.tsx', // Complex grid state management hook
          'src/main.tsx', // Entry point
          'src/theme/theme.ts', // Theme configuration
        ],
        // Enforce 80% coverage thresholds
        thresholds: {
          lines: 80,
          functions: 80,
          branches: 80,
          statements: 80,
        },
      },
    },
  }
})
