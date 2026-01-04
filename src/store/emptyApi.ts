// https://redux-toolkit.js.org/rtk-query/usage/code-generation#usage
// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Check if we're in development mode and if the API URL is available
const isDevelopment = import.meta.env.MODE === 'development';
// Use proxy in development, direct URL in production
const apiUrl = isDevelopment ? '/api' : (import.meta.env.VITE_API_URL || 'http://localhost:8080');

export const API_TIMEOUT_MS = 5000;

// Binary media types that should be returned as Blob
const BINARY_MEDIA_TYPES = [
  'application/octet-stream',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/zip',
  'text/csv',
  'application/pdf',
  'application/xml',
  'application/json',
];

// Content-aware base query that automatically handles binary and text responses
const rawBaseQuery = fetchBaseQuery({
  baseUrl: apiUrl,
  timeout: API_TIMEOUT_MS,
  responseHandler: async (response) => {
    const contentType = response.headers.get('content-type') ?? '';
    
    // Handle binary responses (downloads, exports)
    const isBinaryExport = response.url.includes('/export') 
      && BINARY_MEDIA_TYPES.some(type => contentType.includes(type));
    
    if (isBinaryExport) {
      return await response.blob();
    }
    
    // Handle text responses
    if (contentType.startsWith('text/')) {
      return await response.text();
    }
    
    // Handle 204 No Content
    if (response.status === 204) {
      return undefined;
    }
    
    // Default: parse as JSON
    return await response.json();
  },
});

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = (args, api, extra) =>
  rawBaseQuery(args, api, extra);

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
  baseQuery,
  endpoints: () => ({}),
})

export { isDevelopment }