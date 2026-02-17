import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  AlertTitle,
  Button,
  Tooltip,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import BasicPage from '../../../components/BasicPage';
import SettingsIcon from '@mui/icons-material/Settings';
import StorageIcon from '@mui/icons-material/Storage';
import BuildIcon from '@mui/icons-material/Build';
import ApiIcon from '@mui/icons-material/Api';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from 'react';
import type { ConfigItem, ConfigSectionType } from './ConfigSettingsPage.types';
import { selectApiUrl, selectIsApiConfigured } from '../../../store/apiConfigSlice';

export const ConfigSettingsPage = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState<string | null>(null);
  const userConfiguredApiUrl = useSelector(selectApiUrl);
  const isApiConfigured = useSelector(selectIsApiConfigured);

  // Collect environment information
  const configItems: ConfigItem[] = [
    // API Configuration
    {
      key: 'User Configured API URL',
      value: userConfiguredApiUrl || 'Not configured',
      description: 'User-configured API endpoint from localStorage (overrides environment variables)',
      section: 'api',
    },
    {
      key: 'VITE_API_URL',
      value: import.meta.env.VITE_API_URL,
      description: 'Backend API base URL from environment',
      section: 'api',
    },
    {
      key: 'VITE_USE_MOCK_API',
      value: import.meta.env.VITE_USE_MOCK_API,
      description: 'Use mock data instead of real API',
      section: 'api',
    },
    {
      key: 'VITE_SWAGGER_URL',
      value: import.meta.env.VITE_SWAGGER_URL,
      description: 'Swagger/OpenAPI documentation URL',
      section: 'api',
    },
    // App Configuration
    {
      key: 'VITE_APP_NAME',
      value: import.meta.env.VITE_APP_NAME || 'Starter React Vite',
      description: 'Application name',
      section: 'app',
    },
    {
      key: 'APP_VERSION',
      value: import.meta.env.APP_VERSION || 'Development',
      description: 'Application version',
      section: 'app',
    },
    // Build Configuration
    {
      key: 'NODE_ENV',
      value: import.meta.env.MODE,
      description: 'Build environment (development/production)',
      section: 'build',
    },
    {
      key: 'DEV',
      value: import.meta.env.DEV ? 'true' : 'false',
      description: 'Whether running in development mode',
      section: 'build',
    },
    {
      key: 'PROD',
      value: import.meta.env.PROD ? 'true' : 'false',
      description: 'Whether running in production mode',
      section: 'build',
    },
    {
      key: 'SSR',
      value: import.meta.env.SSR ? 'true' : 'false',
      description: 'Whether building for server-side rendering',
      section: 'build',
    },
  ];

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(value);
    setTimeout(() => setCopied(null), 2000);
  };

  const getSectionIcon = (section: ConfigSectionType) => {
    switch (section) {
      case 'api':
        return <ApiIcon sx={{ fontSize: 40, color: 'info.main' }} />;
      case 'app':
        return <StorageIcon sx={{ fontSize: 40, color: 'success.main' }} />;
      case 'build':
        return <BuildIcon sx={{ fontSize: 40, color: 'warning.main' }} />;
      default:
        return <SettingsIcon sx={{ fontSize: 40, color: 'primary.main' }} />;
    }
  };

  const getSectionTitle = (section: ConfigSectionType) => {
    switch (section) {
      case 'api':
        return 'API Configuration';
      case 'app':
        return 'Application Configuration';
      case 'build':
        return 'Build Configuration';
      default:
        return 'Configuration';
    }
  };

  const getSectionDescription = (section: ConfigSectionType) => {
    switch (section) {
      case 'api':
        return 'API and backend service settings';
      case 'app':
        return 'Application-specific settings and metadata';
      case 'build':
        return 'Build and environment runtime information';
      default:
        return '';
    }
  };

  const sections: ConfigSectionType[] = ['api', 'app', 'build'];

  return (
    <BasicPage
      header="Configuration Settings"
      content="View environment variables and application configuration information"
    >
      {/* Welcome Card */}
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SettingsIcon color="primary" />
              <Typography variant="h6">Configuration Overview</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              This page displays the current configuration and environment variables used by the application. 
              These settings are read-only and are determined during the build and startup process.
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      {/* Info Alert */}
      <Alert severity="info">
        <AlertTitle>Environment Information</AlertTitle>
        All configuration values displayed here are from the current environment. Some values may be hidden 
        for security reasons. {isApiConfigured && 'Note: A user-configured API endpoint is currently active.'}
      </Alert>

      {/* Configuration Sections */}
      <Stack spacing={3}>
        {sections.map((section) => {
          const sectionItems = configItems.filter((item) => item.section === section);
          
          if (sectionItems.length === 0) return null;

          return (
            <Card key={section}>
              <CardContent>
                <Stack spacing={3}>
                  {/* Section Header */}
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box>{getSectionIcon(section)}</Box>
                    <Box>
                      <Typography variant="h6">{getSectionTitle(section)}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {getSectionDescription(section)}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Configuration Table */}
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ backgroundColor: 'action.hover' }}>
                          <TableCell sx={{ fontWeight: 'bold' }}>Variable</TableCell>
                          <TableCell sx={{ fontWeight: 'bold' }}>Value</TableCell>
                          <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 'bold' }}>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {sectionItems.map((item) => (
                          <TableRow key={item.key} hover>
                            <TableCell>
                              <Chip
                                label={item.key}
                                size="small"
                                variant="outlined"
                                sx={{ fontFamily: 'monospace' }}
                              />
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="body2"
                                sx={{
                                  fontFamily: 'monospace',
                                  backgroundColor: 'action.hover',
                                  padding: '4px 8px',
                                  borderRadius: 1,
                                  maxWidth: '300px',
                                  overflow: 'auto',
                                  wordBreak: 'break-all',
                                }}
                              >
                                {item.value !== undefined ? String(item.value) : 'Not set'}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" color="text.secondary">
                                {item.description}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              {item.value !== undefined && (
                                <Tooltip title={copied === String(item.value) ? 'Copied!' : 'Copy'}>
                                  <Button
                                    size="small"
                                    startIcon={<ContentCopyIcon />}
                                    onClick={() => handleCopy(String(item.value))}
                                    variant={copied === String(item.value) ? 'contained' : 'outlined'}
                                    sx={{ textTransform: 'none' }}
                                  >
                                    {copied === String(item.value) ? 'Copied' : 'Copy'}
                                  </Button>
                                </Tooltip>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Stack>
              </CardContent>
            </Card>
          );
        })}
      </Stack>

      {/* Back Button Card */}
      <Card variant="outlined">
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
              Want to configure other settings?
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/settings')}
              sx={{ textTransform: 'none' }}
            >
              Back to Settings
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </BasicPage>
  );
};

export default ConfigSettingsPage;
