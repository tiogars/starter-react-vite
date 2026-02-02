import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
} from '@mui/material';
import BasicPage from '../../components/BasicPage';
import { useNavigate } from 'react-router';
import PaletteIcon from '@mui/icons-material/Palette';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StorageIcon from '@mui/icons-material/Storage';

export const SettingsPage = () => {
  const navigate = useNavigate();

  const settingsSections = [
    {
      title: 'Theme Settings',
      description: 'Customize the visual appearance and color scheme of your application',
      icon: <PaletteIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      path: '/settings/theme',
      color: 'primary.main',
    },
    {
      title: 'Configuration Settings',
      description: 'View environment variables and application configuration information',
      icon: <StorageIcon sx={{ fontSize: 48, color: 'success.main' }} />,
      path: '/settings/config',
      color: 'success.main',
    },
    // Future settings sections can be added here
  ];

  return (
    <BasicPage
      header="Settings"
      content="Configure your application preferences and customize your experience"
    >
      {/* Welcome Card */}
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SettingsIcon color="primary" />
              <Typography variant="h6">Configuration Center</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Welcome to the settings page. Here you can configure various aspects of the application 
              to suit your preferences and workflow. Select a category below to get started.
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      {/* Settings Categories */}
      <Stack spacing={3}>
        {settingsSections.map((section) => (
          <Card 
            key={section.path}
            sx={{
              transition: 'all 0.3s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
              }
            }}
          >
            <CardContent>
              <Stack direction="row" spacing={3} alignItems="center">
                <Box>{section.icon}</Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {section.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {section.description}
                  </Typography>
                  <Button
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => navigate(section.path)}
                    sx={{ textTransform: 'none' }}
                  >
                    Configure
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* Info Card */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            💡 <strong>Tip:</strong> All your settings are automatically saved and will persist 
            across browser sessions. You can change them at any time.
          </Typography>
        </CardContent>
      </Card>
    </BasicPage>
  );
};

export default SettingsPage;
