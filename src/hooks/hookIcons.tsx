/**
 * Hook to provide icons used in the application.
 */
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import HomeIcon from "@mui/icons-material/Home";
import RouteIcon from "@mui/icons-material/Route";
import FeaturesIcon from "@mui/icons-material/Star";
import ScienceIcon from '@mui/icons-material/Science';
import type { JSX } from "react/jsx-dev-runtime";

export const useAppIcons = () => {
  const icons = {
    home: <HomeIcon />,
    features: <FeaturesIcon />,
    architecture: <AccountTreeIcon />,
    routes: <RouteIcon />,
    samples: <ScienceIcon />
  };

  const getIcon = (key: keyof typeof icons | string) =>
    (icons as Record<string, JSX.Element | undefined>)[key];
  return { ...icons, getIcon };
};
