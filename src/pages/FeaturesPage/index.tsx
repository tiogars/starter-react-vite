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

export const FeaturesPage = () => {
  const features = [
    {
      title: 'Easy to Use',
      description: 'Interface intuitive et simple à prendre en main',
      icon: <CheckCircleIcon color="primary" />,
    },
    {
      title: 'Responsive Design',
      description: 'Adapté à tous les écrans : mobile, tablette et desktop',
      icon: <DevicesIcon color="primary" />,
    },
    {
      title: 'Customizable Components',
      description: 'Composants Material-UI personnalisables et modulaires',
      icon: <PaletteIcon color="primary" />,
    },
    {
      title: 'React Router Integration',
      description: 'Navigation fluide avec React Router v7',
      icon: <RouteIcon color="primary" />,
    },
    {
      title: 'Redux Toolkit & RTK Query',
      description: 'Gestion d\'état moderne avec cache et invalidation automatique',
      icon: <StorageIcon color="primary" />,
    },
    {
      title: 'High Performance',
      description: 'Optimisé avec Vite pour un développement ultra-rapide',
      icon: <SpeedIcon color="primary" />,
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Features
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Découvrez toutes les fonctionnalités de notre application starter React + Vite
        </Typography>

        <Box sx={{ mt: 4 }}>
          <List>
            {features.map((feature, index) => (
              <Paper
                key={index}
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
                Technologies Utilisées
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
