import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ThemeMode = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
}

// Retrieve the saved theme or fall back to system preference
const getInitialTheme = (): ThemeMode => {
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

const initialState: ThemeState = {
  mode: getInitialTheme(),
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
  },
});

export const { setThemeMode, toggleThemeMode } = themeSlice.actions;

export const selectThemeMode = (state: any) => state.theme.mode;

export default themeSlice.reducer;
