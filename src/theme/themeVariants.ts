import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';
import { themeDataGrid } from './themeDatagrid';

// =============================================================================
// THEME VARIANT 1: Light Only Theme (Professional Blue)
// =============================================================================
// A clean, professional light theme with blue accents
// Best for: Business applications, data-heavy interfaces

const lightOnlyOptions: ThemeOptions = {
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
  palette: {
    mode: 'light',
    primary: {
      main: '#0d47a1', // Deep blue
      light: '#5472d3',
      dark: '#002171',
    },
    secondary: {
      main: '#f57c00', // Orange
      light: '#ffad42',
      dark: '#bb4d00',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    success: {
      main: '#2e7d32',
    },
    error: {
      main: '#c62828',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
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
    ...themeDataGrid.components,
  },
};

export const lightOnlyTheme = createTheme(lightOnlyOptions);

// =============================================================================
// THEME VARIANT 2: Dark Only Theme (Midnight Purple)
// =============================================================================
// A sleek dark theme with purple accents
// Best for: Creative applications, extended use in low-light environments

const darkOnlyOptions: ThemeOptions = {
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
    borderRadius: 12, // Slightly more rounded for modern feel
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#7c4dff', // Vibrant purple
      light: '#b47cff',
      dark: '#3f1dcb',
    },
    secondary: {
      main: '#00e5ff', // Cyan
      light: '#6effff',
      dark: '#00b2cc',
    },
    background: {
      default: '#0a0a0a',
      paper: '#1a1a1a',
    },
    success: {
      main: '#00e676',
    },
    error: {
      main: '#ff1744',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 12px rgba(124, 77, 255, 0.15)',
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
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
    ...themeDataGrid.components,
  },
};

export const darkOnlyTheme = createTheme(darkOnlyOptions);

// =============================================================================
// THEME VARIANT 3: Switchable Theme (Current Implementation - Enhanced)
// =============================================================================
// Allows users to toggle between light and dark modes
// Best for: User preference flexibility, accessibility

const commonSwitchableOptions: ThemeOptions = {
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
    ...themeDataGrid.components,
  },
};

const switchableLightOptions: ThemeOptions = {
  ...commonSwitchableOptions,
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

const switchableDarkOptions: ThemeOptions = {
  ...commonSwitchableOptions,
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

export const getSwitchableTheme = (mode: 'light' | 'dark') => {
  return createTheme(mode === 'light' ? switchableLightOptions : switchableDarkOptions);
};
