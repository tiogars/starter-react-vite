import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import type { SampleCreateDialogProps } from "./SampleCreateDialog.types";
import SampleCreateForm from "../SampleCreateForm";

export const SampleCreateDialog = (props: SampleCreateDialogProps) => {
  const {
    open,
    value,
    onChange,
    onCancel,
    onSubmit,
    submitting,
    errorMessage,
    violations,
  } = props;

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Sample</DialogTitle>
      <DialogContent>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <SampleCreateForm
          value={value}
          onChange={onChange}
          violations={violations}
          disabled={submitting}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={submitting}>Cancel</Button>
        <Button onClick={onSubmit} variant="contained" disabled={submitting || !value.name}>
          {submitting ? <CircularProgress size={24} /> : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SampleCreateDialog;
