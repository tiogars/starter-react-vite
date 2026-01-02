import BasicPage from "../../components/BasicPage";
import { Link as RouterLink } from "react-router";
import { Box, Button, Card, CardContent, Link, Stack } from "@mui/material";
import type { HomePageProps } from "./HomePage.types";
import RouteIcon from '@mui/icons-material/Route';
import StarIcon from '@mui/icons-material/Star';

const usefulLinks = {
  documentation: [
    { label: "React Documentation", url: "https://react.dev/", target: "_blank" },
    { label: "MUI Documentation", url: "https://mui.com/", target: "_blank" },
    { label: "Vite Documentation", url: "https://vite.dev/", target: "_blank" },
    { label: "Vitest Documentation", url: "https://vitest.dev/", target: "_blank" },
    { label: "React Router Documentation", url: "https://reactrouter.com/", target: "_blank" },
    { label: "Redux Toolkit Documentation", url: "https://redux-toolkit.js.org/", target: "_blank" },
  ],
  repositories: [
    { label: "Tiogars@Github", url: "https://github.com/tiogars", target: "_blank" },
    { label: "Starter React Vite Repository", url: "https://github.com/tiogars/starter-react-vite", target: "_blank" },
    { label: "Starter API Spring MySQL Repository", url: "https://github.com/tiogars/starter-api-spring-mysql", target: "_blank" },
  ],
};

const HomePage = (props: HomePageProps) => {
  return (
    <BasicPage
      header="Welcome to the Basic Page"
      content="This is a simple page layout with routing enabled."
    >
      <Box sx={{ mb: 4 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <h3>Quick Actions</h3>
              <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
                <Button
                  component={RouterLink}
                  to="/features"
                  variant="contained"
                  startIcon={<StarIcon />}
                  fullWidth
                  color="secondary"
                >
                  View Features
                </Button>
                <Button
                  component={RouterLink}
                  to="/routes"
                  variant="contained"
                  startIcon={<RouteIcon />}
                  fullWidth
                >
                  Manage Routes
                </Button>
              </Box>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <h3>Welcome</h3>
              <p>
                This starter application provides you with a solid foundation to develop
                your React projects with the best technologies of the moment.
              </p>
              <p>
                Explore the <strong>Features</strong> to discover everything that's included,
                or start directly <strong>managing your routes</strong> with our complete CRUD interface.
              </p>
            </CardContent>
          </Card>
        </Stack>
      </Box>

      <h3>Useful Links</h3>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <h4>Documentation</h4>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {usefulLinks.documentation.map((link) => (
                <Link key={link.url} href={link.url} target={link.target} rel="noopener">
                  {link.label}
                </Link>
              ))}
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <h4>GitHub Repositories</h4>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {usefulLinks.repositories.map((link) => (
                <Link key={link.url} href={link.url} target={link.target} rel="noopener">
                  {link.label}
                </Link>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </BasicPage>
  );
};

export default HomePage;
