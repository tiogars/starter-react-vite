import { createBrowserRouter } from 'react-router';
import Layout from '../components/Layout';
import HomePage from '../pages/HomePage';
import FeaturesPage from '../pages/FeaturesPage';
import RoutePage from '../pages/Settings/RoutePage';
import ErrorPage from '../pages/ErrorPage';
import ArchitecturePage from '../pages/ArchitecturePage';
import SamplePage from '../pages/SamplePage';
import SettingsPage from '../pages/SettingsPage';
import ThemeSettingsPage from '../pages/Settings/ThemeSettingsPage';
import ThemeLightOnlyPage from '../pages/ThemeLightOnlyPage';
import ThemeDarkOnlyPage from '../pages/ThemeDarkOnlyPage';
import ThemeSwitchablePage from '../pages/ThemeSwitchablePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'features',
        element: <FeaturesPage />,
      },
      {
        path: 'routes',
        element: <RoutePage />,
      },
      {
        path: 'architecture',
        element: <ArchitecturePage />,
      },
      {
        path: 'samples',
        element: <SamplePage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: 'settings/theme',
        element: <ThemeSettingsPage />,
      },
      {
        path: 'theme-light',
        element: <ThemeLightOnlyPage />,
      },
      {
        path: 'theme-dark',
        element: <ThemeDarkOnlyPage />,
      },
      {
        path: 'theme-switchable',
        element: <ThemeSwitchablePage />,
      },
    ],
  },
]);
