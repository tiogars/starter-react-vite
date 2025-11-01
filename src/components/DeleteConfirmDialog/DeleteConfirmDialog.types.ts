export interface DeleteConfirmDialogProps {
  open: boolean;
  title?: string;
  message?: React.ReactNode;
  loading?: boolean;
  errorMessage?: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}
