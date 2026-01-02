import { useRouteError, isRouteErrorResponse, Link as RouterLink } from 'react-router';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
} from '@mui/material';
import type { ErrorPageProps } from './ErrorPage.types';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';

const ErrorPage = (props: ErrorPageProps) => {
  const error = useRouteError();

  let errorMessage = 'An unexpected error occurred';
  let errorStatus = 'Error';

  if (isRouteErrorResponse(error)) {
    errorStatus = `${error.status}`;
    errorMessage = error.statusText || error.data?.message || errorMessage;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <ErrorOutlineIcon
            sx={{ fontSize: 80, color: 'error.main' }}
          />
          <Typography variant="h3" component="h1" gutterBottom>
            {errorStatus}
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Oops! Something went wrong
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {errorMessage}
          </Typography>
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            startIcon={<HomeIcon />}
            size="large"
          >
            Back to Home
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default ErrorPage;
