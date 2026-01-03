import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import type { SampleUpdateDialogProps } from "./SampleUpdateDialog.types";
import SampleUpdateForm from "../SampleUpdateForm";

export const SampleUpdateDialog = (props: SampleUpdateDialogProps) => {
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
      <DialogTitle>Update Sample</DialogTitle>
      <DialogContent>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <SampleUpdateForm
          value={value}
          onChange={onChange}
          violations={violations}
          disabled={submitting}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={submitting}>Cancel</Button>
        <Button onClick={onSubmit} variant="contained" disabled={submitting || !value.name}>
          {submitting ? <CircularProgress size={24} /> : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SampleUpdateDialog;
