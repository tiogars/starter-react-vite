// https://redux-toolkit.js.org/rtk-query/usage/code-generation#usage
// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Check if we're in development mode and if the API URL is available
const isDevelopment = import.meta.env.MODE === 'development';
// Use proxy in development, direct URL in production
const apiUrl = isDevelopment ? '/api' : (import.meta.env.VITE_API_URL || 'http://localhost:8080');

export const API_TIMEOUT_MS = 5000;

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({ 
    baseUrl: apiUrl,
    // Add a timeout to fail faster if the backend is not available
    timeout: API_TIMEOUT_MS,
  }),
  endpoints: () => ({}),
})

export { isDevelopment }