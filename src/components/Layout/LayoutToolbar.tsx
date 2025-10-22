import {
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router';
import React from 'react';

interface LayoutToolbarProps {
  onMenuClick: () => void;
}

export const LayoutToolbar: React.FC<LayoutToolbarProps> = ({ onMenuClick }) => (
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
    <Button color="inherit" component={RouterLink} to="/">
      Home
    </Button>
    <Button color="inherit" component={RouterLink} to="/features">
      Features
    </Button>
    <Button color="inherit" component={RouterLink} to="/routes">
      Routes
    </Button>
  </Toolbar>
);

export default LayoutToolbar;
