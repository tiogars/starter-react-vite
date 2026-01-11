import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ThemeMode = 'light' | 'dark';
export type ThemeVariant = 'light-only' | 'dark-only' | 'switchable';

interface ThemeState {
  mode: ThemeMode;
  variant: ThemeVariant;
}

// Retrieve the saved theme mode or fall back to system preference
const getInitialThemeMode = (): ThemeMode => {
  const savedTheme = localStorage.getItem('theme-mode');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  const matchMedia = globalThis?.matchMedia?.('(prefers-color-scheme: dark)');
  if (matchMedia?.matches) {
    return 'dark';
  }

  return 'light';
};

// Retrieve the saved theme variant or default to switchable
const getInitialThemeVariant = (): ThemeVariant => {
  const savedVariant = localStorage.getItem('theme-variant');
  if (savedVariant === 'light-only' || savedVariant === 'dark-only' || savedVariant === 'switchable') {
    return savedVariant;
  }
  return 'switchable';
};

const initialState: ThemeState = {
  mode: getInitialThemeMode(),
  variant: getInitialThemeVariant(),
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      localStorage.setItem('theme-mode', action.payload);
    },
    toggleThemeMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme-mode', state.mode);
    },
    setThemeVariant: (state, action: PayloadAction<ThemeVariant>) => {
      state.variant = action.payload;
      localStorage.setItem('theme-variant', action.payload);
      // For light-only and dark-only variants, set the appropriate mode
      if (action.payload === 'light-only') {
        state.mode = 'light';
        localStorage.setItem('theme-mode', 'light');
      } else if (action.payload === 'dark-only') {
        state.mode = 'dark';
        localStorage.setItem('theme-mode', 'dark');
      }
    },
  },
});

export const { setThemeMode, toggleThemeMode, setThemeVariant } = themeSlice.actions;

export const selectThemeMode = (state: { theme: ThemeState }) => state.theme.mode;
export const selectThemeVariant = (state: { theme: ThemeState }) => state.theme.variant;

export default themeSlice.reducer;
