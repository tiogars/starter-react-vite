import BasicPage from "../../components/BasicPage";
import { Link as RouterLink } from "react-router";
import { Box, Button, Card, CardContent, Link, Stack } from "@mui/material";
import RouteIcon from '@mui/icons-material/Route';
import StarIcon from '@mui/icons-material/Star';

export const HomePage = () => {
  return (
    <BasicPage
      header1="Welcome to the Basic Page"
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
                Cette application starter vous offre une base solide pour développer
                vos projets React avec les meilleures technologies du moment.
              </p>
              <p>
                Explorez les <strong>Features</strong> pour découvrir tout ce qui est inclus,
                ou commencez directement à <strong>gérer vos routes</strong> avec notre interface CRUD complète.
              </p>
            </CardContent>
          </Card>
        </Stack>
      </Box>

      <h3>Useful Links</h3>
      <ul>
        <li>
          <Link href="https://mui.com/" target="_blank" rel="noopener">
            MUI Documentation
          </Link>
        </li>
        <li>
          <Link href="https://react.dev/" target="_blank" rel="noopener">
            React Documentation
          </Link>
        </li>
        <li>
          <Link href="https://vite.dev/" target="_blank" rel="noopener">
            Vite Documentation
          </Link>
        </li>
        <li>
          <Link href="https://vitest.dev/" target="_blank" rel="noopener">
            Vitest Documentation
          </Link>
        </li>
        <li>
          <Link href="https://reactrouter.com/" target="_blank" rel="noopener">
            React Router Documentation
          </Link>
        </li>
        <li>
          <Link
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener"
          >
            Redux Toolkit Documentation
          </Link>
        </li>
        <li>
          <Link
            href="https://github.com/tiogars"
            target="_blank"
            rel="noopener"
          >
            Tiogars@Github
          </Link>
        </li>
        <li>
          <Link
            href="https://github.com/tiogars/starter-react-vite"
            target="_blank"
            rel="noopener"
          >
            Starter React Vite Repository
          </Link>
        </li>
      </ul>
    </BasicPage>
  );
};

export default HomePage;
