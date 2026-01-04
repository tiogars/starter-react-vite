import { useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Alert,
  Autocomplete,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Chip,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import type { SampleUpdateDialogProps } from "./SampleUpdateDialog.types";
import type { SampleUpdateForm } from "../../store/sampleApi";
import type { SampleTag } from "../../store/sampleTagApi";
import { useGetAllTagsQuery } from "../../store/sampleTagApi";

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

  // Fetch all available tags
  const { data: tagsData = [] } = useGetAllTagsQuery();

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
      tagNames: [],
    },
  });

  useEffect(() => {
    if (open && initialData) {
      reset({
        id: initialData.id,
        name: initialData.name,
        description: initialData.description,
        active: initialData.active,
        tagNames: (initialData.tags || []).map((tag: SampleTag) => tag.name || ""),
      });
    } else if (open) {
      reset({
        id: undefined,
        name: "",
        description: "",
        active: true,
        tagNames: [],
      });
    }
  }, [initialData, reset, open]);

  const handleFormSubmit = (data: SampleUpdateForm) => {
    if (!initialData?.id) {
      console.error("Cannot submit update form without a valid ID");
      return;
    }
    onSubmit({
      ...data,
      id: initialData.id,
    });
  };

  const handleClose = () => {
    reset();
    onCancel();
  };

  // Convert tag objects to names for autocomplete
  const tagOptions = useMemo(() => {
    return (tagsData || []).map((tag: SampleTag) => tag.name || "");
  }, [tagsData]);

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
              name="tagNames"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  multiple
                  options={tagOptions}
                  value={field.value || []}
                  onChange={(_, newValue) => {
                    field.onChange(newValue || []);
                  }}
                  freeSolo
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        label={option}
                        size="small"
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tags"
                      placeholder="Select or create tags"
                      disabled={submitting}
                    />
                  )}
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
