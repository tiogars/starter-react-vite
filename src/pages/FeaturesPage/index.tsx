import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SpeedIcon from '@mui/icons-material/Speed';
import DevicesIcon from '@mui/icons-material/Devices';
import PaletteIcon from '@mui/icons-material/Palette';
import RouteIcon from '@mui/icons-material/Route';
import StorageIcon from '@mui/icons-material/Storage';

const FeaturesPage = () => {
  const features = [
    {
      title: 'Easy to Use',
      description: 'Intuitive interface that is simple to get started with',
      icon: <CheckCircleIcon color="primary" />,
    },
    {
      title: 'Responsive Design',
      description: 'Adapted to all screens: mobile, tablet and desktop',
      icon: <DevicesIcon color="primary" />,
    },
    {
      title: 'Customizable Components',
      description: 'Customizable and modular Material-UI components',
      icon: <PaletteIcon color="primary" />,
    },
    {
      title: 'React Router Integration',
      description: 'Smooth navigation with React Router v7',
      icon: <RouteIcon color="primary" />,
    },
    {
      title: 'Redux Toolkit & RTK Query',
      description: 'Modern state management with automatic caching and invalidation',
      icon: <StorageIcon color="primary" />,
    },
    {
      title: 'High Performance',
      description: 'Optimized with Vite for ultra-fast development',
      icon: <SpeedIcon color="primary" />,
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Features
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Discover all the features of our React + Vite starter application
        </Typography>

        <Box sx={{ mt: 4 }}>
          <List>
            {features.map((feature) => (
              <Paper
                key={feature.title}
                elevation={2}
                sx={{ mb: 2, transition: 'all 0.3s', '&:hover': { elevation: 4, transform: 'translateY(-2px)' } }}
              >
                <ListItem alignItems="flex-start">
                  <ListItemIcon sx={{ mt: 1 }}>
                    {feature.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="h6" component="h3">
                        {feature.title}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {feature.description}
                      </Typography>
                    }
                  />
                </ListItem>
              </Paper>
            ))}
          </List>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Technologies Used
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                {[
                  'React 19',
                  'TypeScript',
                  'Vite',
                  'Material-UI v7',
                  'React Router v7',
                  'Redux Toolkit',
                  'RTK Query',
                  'React Hook Form',
                  'MUI X Data Grid',
                  'Vitest',
                ].map((tech) => (
                  <Paper
                    key={tech}
                    sx={{
                      px: 2,
                      py: 1,
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                    }}
                  >
                    <Typography variant="body2">{tech}</Typography>
                  </Paper>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default FeaturesPage;
