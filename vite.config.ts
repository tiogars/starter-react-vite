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

  const escapeForRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const matchesDependency = (id: string, pkg: string) => {
    const escaped = escapeForRegex(pkg).replace(/\\\//g, '[\\\\/]')
    const pattern = new RegExp(`[\\\\/]node_modules[\\\\/](?:\\.pnpm[\\\\/])?${escaped}[\\\\/]`)
    return pattern.test(id)
  }

  const manualChunksMap: Record<string, string[]> = {
    react: ['react', 'react-dom', 'react-router'],
    muiCore: ['@mui/material', '@emotion/react', '@emotion/styled'],
    muiIcons: ['@mui/icons-material'],
    muiDataGrid: ['@mui/x-data-grid'],
    muiPickers: ['@mui/x-date-pickers'],
    redux: ['@reduxjs/toolkit', 'react-redux'],
    forms: ['react-hook-form'],
    dates: ['luxon'],
  }

  return {
    plugins: [react()],
    // Split heavy vendor libraries to avoid oversized bundles in production.
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (!id.includes('node_modules')) return undefined

            const match = Object.entries(manualChunksMap).find(([, packages]) =>
              packages.some((pkg) => matchesDependency(id, pkg)),
            )

            if (match) return match[0]

            return 'vendor'
          },
        },
      },
      chunkSizeWarningLimit: 900,
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
