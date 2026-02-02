/**
 * Runtime configuration utility
 * 
 * Access environment variables that are set at container runtime.
 * These values are injected by docker-entrypoint.sh into a config.js file.
 */

interface RuntimeConfig {
  VITE_API_URL?: string;
  VITE_USE_MOCK_API?: boolean;
  VITE_SWAGGER_URL?: string;
  VITE_APP_NAME?: string;
  API_UPSTREAM?: string;
}

export const getRuntimeConfig = (): RuntimeConfig => {
  // Try to get config from window.__RUNTIME_CONFIG__ (set by config.js at runtime)
  if (typeof window !== 'undefined' && (window as any).__RUNTIME_CONFIG__) {
    return (window as any).__RUNTIME_CONFIG__;
  }

  // Fallback to build-time env vars if running in dev mode
  return {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    VITE_USE_MOCK_API: import.meta.env.VITE_USE_MOCK_API === 'true',
    VITE_SWAGGER_URL: import.meta.env.VITE_SWAGGER_URL,
    VITE_APP_NAME: import.meta.env.VITE_APP_NAME,
  };
};

/**
 * Get API URL for backend calls
 */
export const getApiUrl = (): string => {
  const config = getRuntimeConfig();
  return config.VITE_API_URL || 'http://localhost:8080/api';
};

/**
 * Check if using mock API
 */
export const useMockApi = (): boolean => {
  const config = getRuntimeConfig();
  return config.VITE_USE_MOCK_API === true || config.VITE_USE_MOCK_API === 'true' as any;
};

/**
 * Get app name
 */
export const getAppName = (): string => {
  const config = getRuntimeConfig();
  return config.VITE_APP_NAME || 'Starter React Vite';
};

export default getRuntimeConfig;
