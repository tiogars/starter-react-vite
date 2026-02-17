/**
 * Configuration utility
 * 
 * Access environment variables and user-configured settings.
 * Uses Vite's built-in environment variable system (import.meta.env).
 */

interface RuntimeConfig {
  VITE_API_URL?: string;
  VITE_USE_MOCK_API?: boolean;
  VITE_SWAGGER_URL?: string;
  VITE_APP_NAME?: string;
}

/**
 * Get configuration from environment variables
 */
export const getRuntimeConfig = (): RuntimeConfig => {
  return {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    VITE_USE_MOCK_API: import.meta.env.VITE_USE_MOCK_API === 'true',
    VITE_SWAGGER_URL: import.meta.env.VITE_SWAGGER_URL,
    VITE_APP_NAME: import.meta.env.VITE_APP_NAME,
  };
};

/**
 * Get API URL for backend calls
 * Priority: localStorage > environment variable > default
 */
export const getApiUrl = (): string => {
  // First, check localStorage for user-configured API endpoint
  try {
    const storedApiUrl = localStorage.getItem('api-endpoint');
    if (storedApiUrl) {
      return storedApiUrl;
    }
  } catch {
    // localStorage might not be available in some contexts
  }

  // Fall back to environment variables
  return import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
};

/**
 * Check if using mock API
 */
export const useMockApi = (): boolean => {
  return import.meta.env.VITE_USE_MOCK_API === 'true';
};

/**
 * Get app name
 */
export const getAppName = (): string => {
  return import.meta.env.VITE_APP_NAME || 'Starter React Vite';
};

export default getRuntimeConfig;
