import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  Divider,
  Button,
  Alert,
  AlertTitle,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { selectThemeMode, setThemeMode, selectThemeVariant, setThemeVariant } from '../../../store/themeSlice';
import type { ThemeMode, ThemeVariant } from '../../../store/themeSlice';
import BasicPage from '../../../components/BasicPage';
import { useNavigate } from 'react-router';
import PaletteIcon from '@mui/icons-material/Palette';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';

export const ThemeSettingsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const themeMode = useSelector(selectThemeMode);
  const themeVariant = useSelector(selectThemeVariant);

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setThemeMode(event.target.value as ThemeMode));
  };

  const handleThemeVariantChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setThemeVariant(event.target.value as ThemeVariant));
  };

  const handlePreviewTheme = (path: string) => {
    navigate(path);
  };

  const getVariantDescription = (variant: ThemeVariant): { title: string; description: string } => {
    switch (variant) {
      case 'light-only':
        return {
          title: 'Light Only Theme',
          description: 'Professional blue color scheme with fixed light mode'
        };
      case 'dark-only':
        return {
          title: 'Dark Only Theme',
          description: 'Midnight purple color scheme with fixed dark mode'
        };
      case 'switchable':
        return {
          title: 'Switchable Theme',
          description: 'Toggle between light and dark modes for maximum flexibility'
        };
    }
  };

  const variantInfo = getVariantDescription(themeVariant);

  return (
    <BasicPage
      header="Theme Settings"
      content="Customize the visual appearance and color scheme of your application"
    >
      {/* Current Theme Status */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <AlertTitle>Active Theme Configuration</AlertTitle>
        You are currently using <strong>{variantInfo.title}</strong> ({variantInfo.description}). 
        Changes are applied immediately and saved automatically.
      </Alert>

      {/* Theme Variant Selector */}
      <Card>
        <CardContent>
          <Stack spacing={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <DashboardCustomizeIcon color="primary" />
              <Typography variant="h6">Select Theme Variant</Typography>
            </Box>
            <Divider />
            
            <FormControl component="fieldset">
              <FormLabel component="legend">
                <Typography variant="subtitle1" gutterBottom>
                  Choose your preferred theme variant
                </Typography>
              </FormLabel>
              <RadioGroup
                value={themeVariant}
                onChange={handleThemeVariantChange}
                sx={{ mt: 1 }}
              >
                <FormControlLabel
                  value="light-only"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LightModeIcon fontSize="small" />
                      <Box>
                        <Typography variant="body1" fontWeight={500}>Light Only Theme</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Professional blue theme - fixed light mode only
                        </Typography>
                      </Box>
                    </Box>
                  }
                  sx={{ 
                    mb: 2, 
                    p: 2, 
                    border: '1px solid',
                    borderColor: themeVariant === 'light-only' ? 'primary.main' : 'divider',
                    borderRadius: 2,
                    bgcolor: themeVariant === 'light-only' ? 'action.selected' : 'transparent'
                  }}
                />
                <FormControlLabel
                  value="dark-only"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <DarkModeIcon fontSize="small" />
                      <Box>
                        <Typography variant="body1" fontWeight={500}>Dark Only Theme</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Midnight purple theme - fixed dark mode only
                        </Typography>
                      </Box>
                    </Box>
                  }
                  sx={{ 
                    mb: 2,
                    p: 2, 
                    border: '1px solid',
                    borderColor: themeVariant === 'dark-only' ? 'primary.main' : 'divider',
                    borderRadius: 2,
                    bgcolor: themeVariant === 'dark-only' ? 'action.selected' : 'transparent'
                  }}
                />
                <FormControlLabel
                  value="switchable"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PaletteIcon fontSize="small" />
                      <Box>
                        <Typography variant="body1" fontWeight={500}>Switchable Theme</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Toggle between light and dark modes - maximum flexibility
                        </Typography>
                      </Box>
                    </Box>
                  }
                  sx={{ 
                    p: 2, 
                    border: '1px solid',
                    borderColor: themeVariant === 'switchable' ? 'primary.main' : 'divider',
                    borderRadius: 2,
                    bgcolor: themeVariant === 'switchable' ? 'action.selected' : 'transparent'
                  }}
                />
              </RadioGroup>
            </FormControl>

            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: 'action.hover',
              }}
            >
              <Typography variant="subtitle2" gutterBottom>
                💾 Auto-Save Enabled
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Your theme variant preference is automatically saved to localStorage and persists across browser sessions
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Theme Mode Selector - Only for Switchable Theme */}
      {themeVariant === 'switchable' && (
        <Card>
          <CardContent>
            <Stack spacing={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Brightness4Icon color="primary" />
                <Typography variant="h6">Theme Mode (Switchable Only)</Typography>
              </Box>
              <Divider />
              
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  <Typography variant="subtitle1" gutterBottom>
                    Select your preferred light/dark mode
                  </Typography>
                </FormLabel>
                <RadioGroup
                  value={themeMode}
                  onChange={handleThemeChange}
                  sx={{ mt: 1 }}
                >
                  <FormControlLabel
                    value="light"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LightModeIcon fontSize="small" />
                        <Box>
                          <Typography variant="body1" fontWeight={500}>Light Mode</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Bright background with dark text, ideal for well-lit environments
                          </Typography>
                        </Box>
                      </Box>
                    }
                    sx={{ 
                      mb: 2, 
                      p: 2, 
                      border: '1px solid',
                      borderColor: themeMode === 'light' ? 'primary.main' : 'divider',
                      borderRadius: 2,
                      bgcolor: themeMode === 'light' ? 'action.selected' : 'transparent'
                    }}
                  />
                  <FormControlLabel
                    value="dark"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <DarkModeIcon fontSize="small" />
                        <Box>
                          <Typography variant="body1" fontWeight={500}>Dark Mode</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Dark background with light text, reduces eye strain in low-light
                          </Typography>
                        </Box>
                      </Box>
                    }
                    sx={{ 
                      p: 2, 
                      border: '1px solid',
                      borderColor: themeMode === 'dark' ? 'primary.main' : 'divider',
                      borderRadius: 2,
                      bgcolor: themeMode === 'dark' ? 'action.selected' : 'transparent'
                    }}
                  />
                </RadioGroup>
              </FormControl>

              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: 'action.hover',
                }}
              >
                <Typography variant="subtitle2" gutterBottom>
                  💡 Mode Toggle
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  This setting only applies to the Switchable theme variant
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* Theme Variants Showcase */}
      <Card>
        <CardContent>
          <Stack spacing={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <VisibilityIcon color="primary" />
              <Typography variant="h6">Theme Variants Showcase</Typography>
            </Box>
            <Divider />
            
            <Typography variant="body2" color="text.secondary">
              Preview different theme variants with a comprehensive showcase demonstrating all UI components, 
              including forms, tables, charts, and navigation elements.
            </Typography>

            <Stack spacing={2}>
              <Card variant="outlined">
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <LightModeIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        Light Only Theme
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Professional blue color scheme with fixed light mode. 
                        Best for business applications and data-heavy interfaces.
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handlePreviewTheme('/theme-light')}
                        startIcon={<VisibilityIcon />}
                      >
                        Preview Showcase
                      </Button>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              <Card variant="outlined">
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <DarkModeIcon sx={{ fontSize: 40, color: 'secondary.main' }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        Dark Only Theme
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Midnight purple with cyan accents and fixed dark mode. 
                        Perfect for creative applications and extended low-light use.
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        onClick={() => handlePreviewTheme('/theme-dark')}
                        startIcon={<VisibilityIcon />}
                      >
                        Preview Showcase
                      </Button>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              <Card variant="outlined">
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <PaletteIcon sx={{ fontSize: 40, color: 'info.main' }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        Switchable Theme (Current)
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Toggle between light and dark modes for maximum flexibility. 
                        Best for accessibility and user preference support.
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        color="info"
                        onClick={() => handlePreviewTheme('/theme-switchable')}
                        startIcon={<VisibilityIcon />}
                      >
                        Preview Showcase
                      </Button>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {/* Theme Information */}
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h6">About Themes</Typography>
            <Divider />
            <Typography variant="body2" color="text.secondary">
              This application supports multiple theme configurations built with Material-UI v7. 
              All themes follow WCAG accessibility guidelines and provide consistent design patterns 
              across all components.
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Typography variant="body2" component="div">
                ✅ Automatic color contrast adjustments
              </Typography>
              <Typography variant="body2" component="div">
                ✅ Persistent theme preference storage
              </Typography>
              <Typography variant="body2" component="div">
                ✅ Keyboard navigation support
              </Typography>
              <Typography variant="body2" component="div">
                ✅ Responsive design optimization
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </BasicPage>
  );
};

export default ThemeSettingsPage;
