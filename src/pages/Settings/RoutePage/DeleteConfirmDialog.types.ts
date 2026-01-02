import type { Route } from "../../../store/routesApi";

export interface DeleteConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  route: Route | null;
  isLoading?: boolean;
}
