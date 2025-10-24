import { Provider, useSelector } from 'react-redux';
import { RouterProvider } from 'react-router';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { store } from './store/store';
import { router } from './routes';
import { getTheme } from './theme/theme';
import { selectThemeMode } from './store/themeSlice';

const AppContent = () => {
  const themeMode = useSelector(selectThemeMode);
  const theme = getTheme(themeMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;