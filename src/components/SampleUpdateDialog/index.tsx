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
import type { SampleUpdateDialogProps } from "./SampleUpdateDialog.types";
import type { SampleUpdateForm } from "../../store/sampleApi";

export const SampleUpdateDialog = (props: SampleUpdateDialogProps) => {
  const {
    open,
    initialData,
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
  } = useForm<SampleUpdateForm>({
    defaultValues: {
      id: undefined,
      name: "",
      description: "",
      active: true,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        id: initialData.id,
        name: initialData.name,
        description: initialData.description,
        active: initialData.active,
      });
    } else {
      reset({
        id: undefined,
        name: "",
        description: "",
        active: true,
      });
    }
  }, [initialData, reset, open]);

  const handleFormSubmit = (data: SampleUpdateForm) => {
    if (initialData?.id) {
      onSubmit({
        ...data,
        id: initialData.id,
      });
    }
  };

  const handleClose = () => {
    reset();
    onCancel();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Update Sample</DialogTitle>
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
            {submitting ? <CircularProgress size={24} /> : "Update"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SampleUpdateDialog;
