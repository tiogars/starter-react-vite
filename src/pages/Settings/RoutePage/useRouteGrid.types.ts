import type { Route } from '../../../store/routesApi';

export interface UseRouteGridProps {
  onEdit: (route: Route) => void;
  onDelete: (route: Route) => void;
}

export interface UseRouteGridResult {
  columns: import('@mui/x-data-grid').GridColDef<Route>[];
}