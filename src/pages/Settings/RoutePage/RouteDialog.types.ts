import type { Route, RouteCreateForm, RouteUpdateForm } from '../../../store/routesApi';

export interface RouteDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: RouteCreateForm | RouteUpdateForm) => void;
  initialData?: Route | null;
  isLoading?: boolean;
}
