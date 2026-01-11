/**
 * Hook to provide icons used in the application.
 */
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import HomeIcon from "@mui/icons-material/Home";
import RouteIcon from "@mui/icons-material/Route";
import FeaturesIcon from "@mui/icons-material/Star";
import ScienceIcon from '@mui/icons-material/Science';
import SettingsIcon from '@mui/icons-material/Settings';
import PaletteIcon from '@mui/icons-material/Palette';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import type { JSX } from "react/jsx-dev-runtime";

export const useAppIcons = () => {
  const icons = {
    home: <HomeIcon />,
    features: <FeaturesIcon />,
    architecture: <AccountTreeIcon />,
    routes: <RouteIcon />,
    samples: <ScienceIcon />,
    settings: <SettingsIcon />,
    themeLight: <LightModeIcon />,
    themeDark: <DarkModeIcon />,
    themeSwitchable: <PaletteIcon />
  };

  const getIcon = (key: string) =>
    (icons as Record<string, JSX.Element | undefined>)[key];
  return { ...icons, getIcon };
};
