import { Provider, useSelector } from 'react-redux';
import { RouterProvider } from 'react-router';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { store } from './store/store';
import { router } from './routes';
import { getSwitchableTheme, lightOnlyTheme, darkOnlyTheme } from './theme/themeVariants';
import { selectThemeMode, selectThemeVariant } from './store/themeSlice';

const AppContent = () => {
  const themeMode = useSelector(selectThemeMode);
  const themeVariant = useSelector(selectThemeVariant);
  
  let theme;
  
  if (themeVariant === 'light-only') {
    theme = lightOnlyTheme;
  } else if (themeVariant === 'dark-only') {
    theme = darkOnlyTheme;
  } else {
    // switchable variant
    theme = getSwitchableTheme(themeMode);
  }

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