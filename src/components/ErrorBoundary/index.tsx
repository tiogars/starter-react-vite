import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            p: 2,
            bgcolor: 'background.default'
          }}
        >
          <Card sx={{ maxWidth: 600, width: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ErrorOutlineIcon color="error" sx={{ fontSize: 48, mr: 2 }} />
                <Typography variant="h4" component="h1">
                  Something went wrong
                </Typography>
              </Box>

              <Typography variant="body1" sx={{ mb: 2 }}>
                The application encountered an unexpected error. Please try the following:
              </Typography>

              <Box component="ul" sx={{ mb: 3 }}>
                <li>Clear your browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)</li>
                <li>Reload the page using the button below</li>
                <li>Try opening the page in an incognito/private window</li>
                <li>Make sure you're using a modern browser</li>
              </Box>

              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={this.handleReset}
                fullWidth
                sx={{ mb: 2 }}
              >
                Reload Application
              </Button>

              {this.state.error && (
                <Box
                  sx={{
                    mt: 3,
                    p: 2,
                    bgcolor: 'grey.100',
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'grey.300'
                  }}
                >
                  <Typography variant="caption" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Technical Details:
                  </Typography>
                  <Typography
                    variant="caption"
                    component="pre"
                    sx={{
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      fontFamily: 'monospace',
                      fontSize: '0.75rem'
                    }}
                  >
                    {this.state.error.toString()}
                    {this.state.errorInfo && (
                      <>
                        {'\n\n'}
                        {this.state.errorInfo.componentStack}
                      </>
                    )}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
