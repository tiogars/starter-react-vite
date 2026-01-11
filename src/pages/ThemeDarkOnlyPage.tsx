import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import ThemeShowcase from '../components/ThemeShowcase';
import { darkOnlyTheme } from '../theme/themeVariants';

export const ThemeDarkOnlyPage = () => {
  return (
    <ThemeProvider theme={darkOnlyTheme}>
      <CssBaseline />
      <ThemeShowcase themeVariant="dark-only" />
    </ThemeProvider>
  );
};

export default ThemeDarkOnlyPage;
