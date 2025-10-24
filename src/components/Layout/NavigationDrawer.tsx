import { Link as RouterLink } from "react-router";
import {
  Box,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FeaturesIcon from "@mui/icons-material/Star";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import RouteIcon from "@mui/icons-material/Route";

const drawerWidth = 240;

const menuItems = [
  { text: "Home", path: "/", icon: <HomeIcon /> },
  { text: "Features", path: "/features", icon: <FeaturesIcon /> },
  { text: "Routes", path: "/routes", icon: <RouteIcon /> },
  { text: "Architecture", path: "/architecture", icon: <AccountTreeIcon /> },
  { text: "Samples", path: "/samples", icon: <AccountTreeIcon /> },
];

interface NavigationDrawerProps {
  mobileOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
}

const DrawerContent = ({
  onClose,
  isMobile,
}: {
  onClose: () => void;
  isMobile: boolean;
}) => (
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

export const NavigationDrawer = ({
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
