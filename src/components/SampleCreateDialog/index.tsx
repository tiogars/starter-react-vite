import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import type { SampleCreateDialogProps } from "./SampleCreateDialog.types";
import type { SampleCreateForm } from "../../store/sampleApi";

export const SampleCreateDialog = (props: SampleCreateDialogProps) => {
  const {
    open,
    onCancel,
    onSubmit,
    submitting,
    errorMessage,
    violations,
  } = props;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SampleCreateForm>({
    defaultValues: {
      name: "",
      description: "",
      active: true,
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: "",
        description: "",
        active: true,
      });
    }
  }, [open, reset]);

  const handleFormSubmit = (data: SampleCreateForm) => {
    onSubmit(data);
  };

  const handleClose = () => {
    reset();
    onCancel();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Sample</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Controller
              name="name"
              control={control}
              rules={{
                required: "Name is required",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  fullWidth
                  required
                  error={!!errors.name || !!violations?.name}
                  helperText={errors.name?.message || violations?.name}
                  disabled={submitting}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  fullWidth
                  multiline
                  rows={3}
                  error={!!violations?.description}
                  helperText={violations?.description}
                  disabled={submitting}
                />
              )}
            />
            <Controller
              name="active"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch
                      checked={field.value || false}
                      onChange={field.onChange}
                      disabled={submitting}
                    />
                  }
                  label="Active"
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={submitting}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={submitting}>
            {submitting ? <CircularProgress size={24} /> : "Create"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SampleCreateDialog;
