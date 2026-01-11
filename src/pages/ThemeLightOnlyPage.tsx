import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import ThemeShowcase from '../components/ThemeShowcase';
import { lightOnlyTheme } from '../theme/themeVariants';

export const ThemeLightOnlyPage = () => {
  return (
    <ThemeProvider theme={lightOnlyTheme}>
      <CssBaseline />
      <ThemeShowcase themeVariant="light-only" />
    </ThemeProvider>
  );
};

export default ThemeLightOnlyPage;
