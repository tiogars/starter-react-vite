import { Outlet } from "react-router";
import Footer from "./Footer";
import { AppBar, Box, Container, useTheme, useMediaQuery } from "@mui/material";
import { LayoutToolbar } from "./LayoutToolbar";
import { useState } from "react";
import { NavigationDrawer } from "./NavigationDrawer";
import type { LayoutProps } from "./Layout.types";

const drawerWidth = 240;

const Layout = (props: LayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <LayoutToolbar onMenuClick={handleDrawerToggle} />
      </AppBar>

      <NavigationDrawer
        mobileOpen={mobileOpen}
        onClose={handleDrawerToggle}
        isMobile={isMobile}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
          ml: { xs: 0, md: `${drawerWidth}px` },
        }}
      >
        {/* Décalage pour AppBar fixe */}
        <Box sx={{ height: { xs: 56, md: 64 } }} />
        <Container maxWidth="xl">
          <Outlet />
        </Container>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
