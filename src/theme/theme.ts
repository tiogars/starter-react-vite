import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';
import type { ThemeMode } from '../store/themeSlice';
import { themeDataGrid } from './themeDatagrid';

// Options communes aux deux thèmes
const commonOptions: ThemeOptions = {
  typography: {
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
        },
      },
    },
    ...themeDataGrid.components
  },
};

// Thème clair
const lightThemeOptions: ThemeOptions = {
  ...commonOptions,
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
};

// Thème sombre
const darkThemeOptions: ThemeOptions = {
  ...commonOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
};

export const getTheme = (mode: ThemeMode) => {
  return createTheme(mode === 'light' ? lightThemeOptions : darkThemeOptions);
};
