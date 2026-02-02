import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Collapse,
  IconButton,
} from "@mui/material";
import { Link as RouterLink, useLocation, useNavigate } from "react-router";
import type { NavigationDrawerProps, DrawerContentProps } from "./NavigationDrawer.types";
import { useAppIcons } from "../../hooks/hookIcons";
import { useState, useEffect } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const drawerWidth = 240;

const DrawerContent = ({
  onClose,
  isMobile,
}: DrawerContentProps) => {
  const { getIcon } = useAppIcons();
  const location = useLocation();
  const navigate = useNavigate();
  const [openSettings, setOpenSettings] = useState(
    location.pathname.startsWith('/settings')
  );

  // Auto-collapse Settings submenu when navigating away from /settings routes
  useEffect(() => {
    if (!location.pathname.startsWith('/settings')) {
      setOpenSettings(false);
    }
  }, [location.pathname]);

  const handleSettingsToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenSettings(!openSettings);
  };

  const handleSettingsClick = () => {
    navigate('/settings');
    if (isMobile) onClose();
  };

  const menuItems = [
    { text: "Home", path: "/", icon: getIcon("home") },
    { text: "Features", path: "/features", icon: getIcon("features") },
    { text: "Routes", path: "/routes", icon: getIcon("routes") },
    { text: "Architecture", path: "/architecture", icon: getIcon("architecture") },
    { text: "Samples", path: "/samples", icon: getIcon("samples") },
    { text: "Repositories", path: "/repositories", icon: getIcon("routes") },
  ];

  const settingsSubmenu = [
    { text: "Theme", path: "/settings/theme", icon: getIcon("themeLight") },
    { text: "Configuration", path: "/settings/config", icon: getIcon("settings") },
  ];

  return (
    <Box>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          React Vite App
        </Typography>
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              onClick={isMobile ? onClose : undefined}
              selected={location.pathname === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        
        {/* Settings with submenu */}
        <ListItem 
          disablePadding
          sx={{
            backgroundColor: location.pathname === '/settings' || location.pathname.startsWith('/settings/') ? 'action.selected' : 'transparent',
          }}
        >
          <ListItemButton
            onClick={handleSettingsClick}
            selected={location.pathname === '/settings' || location.pathname.startsWith('/settings/')}
            sx={{ pr: 0 }}
          >
            <ListItemIcon>{getIcon("settings")}</ListItemIcon>
            <ListItemText primary="Settings" sx={{ flex: 1 }} />
            <IconButton
              size="small"
              onClick={handleSettingsToggle}
              sx={{ 
                mr: 1,
                '&:hover': {
                  backgroundColor: 'transparent',
                }
              }}
            >
              {openSettings ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItemButton>
        </ListItem>
        <Collapse in={openSettings} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {settingsSubmenu.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to={item.path}
                  onClick={isMobile ? onClose : undefined}
                  selected={location.pathname === item.path}
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </Box>
  );
};

const NavigationDrawer = ({
  mobileOpen,
  onClose,
  isMobile,
}: NavigationDrawerProps) => {
  return (
    <>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <DrawerContent onClose={onClose} isMobile={isMobile} />
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            zIndex: (theme) => theme.zIndex.appBar - 1,
          },
        }}
        open
      >
        <DrawerContent onClose={onClose} isMobile={isMobile} />
      </Drawer>
    </>
  );
};

export default NavigationDrawer;
