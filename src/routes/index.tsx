import { createBrowserRouter } from 'react-router';
import Layout from '../components/Layout';
import HomePage from '../pages/HomePage';
import FeaturesPage from '../pages/FeaturesPage';
import RoutePage from '../pages/Settings/RoutePage';
import ErrorPage from '../pages/ErrorPage';
import ArchitecturePage from '../pages/ArchitecturePage';
import SamplePage from '../pages/SamplePage';

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
    ],
  },
]);
