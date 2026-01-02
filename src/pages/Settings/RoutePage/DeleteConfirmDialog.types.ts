import type { Route } from "../../../store/routesApi";

export interface DeleteConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  route: Route | null;
  isLoading?: boolean;
}
