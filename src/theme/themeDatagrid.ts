import { createTheme } from '@mui/material';
import type {} from '@mui/x-data-grid/themeAugmentation';

export const themeDataGrid = createTheme({
  components: {
    // Use `MuiDataGrid` on DataGrid, DataGridPro and DataGridPremium
    MuiDataGrid: {
      styleOverrides: {
        root: {
            border: 'none',
        },
      },
    },
  },
});