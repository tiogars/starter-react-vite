import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  TextField,
  Button,
  Alert,
  AlertTitle,
  Chip,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import BasicPage from '../../../components/BasicPage';
import ApiIcon from '@mui/icons-material/Api';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import { setApiUrl, clearApiUrl, selectApiUrl, selectIsApiConfigured } from '../../../store/apiConfigSlice';
import type { ApiSetupPageProps } from './ApiSetupPage.types';

export const ApiSetupPage = (props: ApiSetupPageProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentApiUrl = useSelector(selectApiUrl);
  const isConfigured = useSelector(selectIsApiConfigured);

  const [apiUrl, setApiUrlInput] = useState(currentApiUrl || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateUrl = (url: string): boolean => {
    if (!url.trim()) {
      setError('API URL is required');
      return false;
    }

    try {
      const parsedUrl = new URL(url);
      if (!parsedUrl.protocol.startsWith('http')) {
        setError('URL must use HTTP or HTTPS protocol');
        return false;
      }
      return true;
    } catch {
      setError('Invalid URL format');
      return false;
    }
  };

  const handleSave = () => {
    setError('');
    setSuccess(false);

    if (!validateUrl(apiUrl)) {
      return;
    }

    // Remove trailing slash if present
    const cleanUrl = apiUrl.trim().replace(/\/$/, '');
    dispatch(setApiUrl(cleanUrl));
    setSuccess(true);

    // Reset success message after 3 seconds
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleClear = () => {
    dispatch(clearApiUrl());
    setApiUrlInput('');
    setError('');
    setSuccess(false);
  };

  const handleTestConnection = async () => {
    setError('');
    setSuccess(false);

    if (!validateUrl(apiUrl)) {
      return;
    }

    try {
      const cleanUrl = apiUrl.trim().replace(/\/$/, '');
      const testUrl = `${cleanUrl}/actuator/health`;
      
      const response = await fetch(testUrl, {
        method: 'GET',
        signal: AbortSignal.timeout(5000),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(`Connection test failed with status: ${response.status}`);
      }
    } catch (err) {
      setError(`Connection test failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  return (
    <BasicPage
      header="API Setup"
      content="Configure the backend API endpoint for the application"
    >
      {/* Info Card */}
      <Alert severity="info" icon={<InfoIcon />}>
        <AlertTitle>Secure Configuration</AlertTitle>
        The API endpoint is stored securely in your browser's local storage. This allows you to configure 
        different API endpoints for different environments or connect to your own backend service.
      </Alert>

      {/* Status Card */}
      {isConfigured && (
        <Card sx={{ backgroundColor: 'success.light', color: 'success.contrastText' }}>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <CheckCircleIcon />
              <Box>
                <Typography variant="h6">API Configured</Typography>
                <Typography variant="body2">
                  Current endpoint: <Chip label={currentApiUrl} size="small" sx={{ ml: 1 }} />
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* Configuration Form */}
      <Card>
        <CardContent>
          <Stack spacing={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ApiIcon color="primary" />
              <Typography variant="h6">API Endpoint Configuration</Typography>
            </Box>

            <TextField
              fullWidth
              label="API Base URL"
              placeholder="http://localhost:8080/api"
              value={apiUrl}
              onChange={(e) => setApiUrlInput(e.target.value)}
              helperText="Enter the full base URL of your backend API (e.g., http://localhost:8080/api)"
              error={!!error}
            />

            {error && (
              <Alert severity="error">
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                API endpoint has been saved successfully!
              </Alert>
            )}

            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                disabled={!apiUrl.trim()}
                sx={{ textTransform: 'none' }}
              >
                Save Configuration
              </Button>

              <Button
                variant="outlined"
                onClick={handleTestConnection}
                disabled={!apiUrl.trim()}
                sx={{ textTransform: 'none' }}
              >
                Test Connection
              </Button>

              {isConfigured && (
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={handleClear}
                  sx={{ textTransform: 'none' }}
                >
                  Clear Configuration
                </Button>
              )}
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {/* Help Card */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            💡 Configuration Tips
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            <ul>
              <li>Make sure to include the protocol (http:// or https://)</li>
              <li>The URL should point to the base path of your API</li>
              <li>Test the connection to verify the API is accessible</li>
              <li>This setting only affects API calls from your browser</li>
              <li>You can change or clear this setting at any time</li>
            </ul>
          </Typography>
        </CardContent>
      </Card>

      {/* Back Button Card */}
      <Card variant="outlined">
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
              Done with API setup?
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

export default ApiSetupPage;
