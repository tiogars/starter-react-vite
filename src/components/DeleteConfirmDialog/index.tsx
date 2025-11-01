import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, CircularProgress } from "@mui/material";
import type { DeleteConfirmDialogProps } from "./DeleteConfirmDialog.types";

export const DeleteConfirmDialog = (props: DeleteConfirmDialogProps) => {
  const {
    open,
    title = "Confirm Delete",
    message = "Are you sure you want to delete this item? This action cannot be undone.",
    loading,
    errorMessage,
    onCancel,
    onConfirm,
    confirmLabel = "Delete",
    cancelLabel = "Cancel",
  } = props;

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        {typeof message === "string" ? (
          <Typography>{message}</Typography>
        ) : (
          message
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={loading}>{cancelLabel}</Button>
        <Button onClick={onConfirm} variant="contained" color="error" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
