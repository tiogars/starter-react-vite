import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router';
import type { LayoutToolbarProps } from './LayoutToolbar.types';
import { ThemeToggle } from '../ThemeToggle';

const LayoutToolbar = ({ onMenuClick }: LayoutToolbarProps) => (
  <Toolbar>
    <IconButton
      color="inherit"
      aria-label="open drawer"
      edge="start"
      onClick={onMenuClick}
      sx={{ mr: 2, display: { md: 'none' } }}
    >
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
      Starter React Vite
    </Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Button color="inherit" component={RouterLink} to="/">
        Home
      </Button>
      <Button color="inherit" component={RouterLink} to="/features">
        Features
      </Button>
      <Button color="inherit" component={RouterLink} to="/routes">
        Routes
      </Button>
      <ThemeToggle />
    </Box>
  </Toolbar>
);

export default LayoutToolbar;
