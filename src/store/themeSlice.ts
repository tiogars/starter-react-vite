import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export type ThemeMode = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
}

// Récupérer le thème sauvegardé ou utiliser la préférence système
const getInitialTheme = (): ThemeMode => {
  const savedTheme = localStorage.getItem('theme-mode');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }
  // Utiliser la préférence système
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
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

export const selectThemeMode = (state: RootState) => state.theme.mode;

export default themeSlice.reducer;
