import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ApiConfigState {
  apiUrl: string | null;
  isConfigured: boolean;
}

// Retrieve the saved API URL from localStorage
const getStoredApiUrl = (): string | null => {
  try {
    const stored = localStorage.getItem('api-endpoint');
    return stored || null;
  } catch {
    return null;
  }
};

const initialState: ApiConfigState = {
  apiUrl: getStoredApiUrl(),
  isConfigured: !!getStoredApiUrl(),
};

export const apiConfigSlice = createSlice({
  name: 'apiConfig',
  initialState,
  reducers: {
    setApiUrl: (state, action: PayloadAction<string>) => {
      state.apiUrl = action.payload;
      state.isConfigured = true;
      try {
        localStorage.setItem('api-endpoint', action.payload);
      } catch (error) {
        console.error('Failed to save API endpoint to localStorage:', error);
      }
    },
    clearApiUrl: (state) => {
      state.apiUrl = null;
      state.isConfigured = false;
      try {
        localStorage.removeItem('api-endpoint');
      } catch (error) {
        console.error('Failed to remove API endpoint from localStorage:', error);
      }
    },
  },
});

export const { setApiUrl, clearApiUrl } = apiConfigSlice.actions;

export const selectApiUrl = (state: { apiConfig: ApiConfigState }) => state.apiConfig.apiUrl;
export const selectIsApiConfigured = (state: { apiConfig: ApiConfigState }) => state.apiConfig.isConfigured;

export default apiConfigSlice.reducer;
