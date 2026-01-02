import { Box, Card, CardContent, Link, Stack, Typography } from "@mui/material";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import './ArchitecturePage.css';

const architectureServices = [
  {
    title: "Service Creation",
    description: "A comprehensive architecture for creating new Java services with best practices and standardized patterns.",
    url: "https://github.com/tiogars/architecture-create-java-service",
    icon: <AddCircleIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
  },
  {
    title: "Service Selection",
    description: "An architecture designed for selecting and querying Java services efficiently with optimized patterns.",
    url: "https://github.com/tiogars/architecture-select-java-service",
    icon: <SearchIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
  },
];

const ArchitecturePage = () => {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <AccountTreeIcon sx={{ fontSize: 40 }} />
          <h1 className="architecture-header">Architecture</h1>
        </Box>
        <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
          Welcome to our architecture documentation. Here you'll find comprehensive guides and reference 
          implementations for building robust and scalable Java microservices. Our architecture patterns 
          are designed to promote consistency, maintainability, and best practices across all services.
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Each architecture repository provides complete examples, documentation, and guidelines to help 
          you quickly bootstrap new services or enhance existing ones with proven patterns and industry standards.
        </Typography>
      </Box>

      <h2>Available Architecture Templates</h2>
      <Stack spacing={3} sx={{ mt: 3 }}>
        {architectureServices.map((service) => (
          <Card key={service.url} sx={{ 
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: 4,
            }
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box sx={{ mt: 1 }}>
                  {service.icon}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5" component="h3" sx={{ mb: 1 }}>
                    {service.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
                    {service.description}
                  </Typography>
                  <Link 
                    href={service.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    sx={{ 
                      fontWeight: 'bold',
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      }
                    }}
                  >
                    View Repository →
                  </Link>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </>
  );
};

export default ArchitecturePage;
