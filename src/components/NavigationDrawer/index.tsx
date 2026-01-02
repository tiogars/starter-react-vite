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
} from "@mui/material";
import { Link as RouterLink } from "react-router";
import type { NavigationDrawerProps, DrawerContentProps } from "./NavigationDrawer.types";
import { useAppIcons } from "../../hooks/hookIcons";

const drawerWidth = 240;

const DrawerContent = ({
  onClose,
  isMobile,
}: DrawerContentProps) => {
  const { getIcon} = useAppIcons();

  const menuItems = [
    { text: "Home", path: "/", icon: getIcon("home") },
    { text: "Features", path: "/features", icon: getIcon("features") },
    { text: "Routes", path: "/routes", icon: getIcon("routes") },
    { text: "Architecture", path: "/architecture", icon: getIcon("architecture") },
    { text: "Samples", path: "/samples", icon: getIcon("samples") },
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
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
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
