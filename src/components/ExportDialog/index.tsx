import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  Stack,
  Switch,
} from "@mui/material";
import type { ExportDialogProps, ExportFormat, ExportScope } from "./ExportDialog.types";

interface ExportFormData {
  format: ExportFormat;
  zip: boolean;
  scope: ExportScope;
}

export const ExportDialog = (props: ExportDialogProps) => {
  const {
    open,
    loading = false,
    errorMessage,
    onCancel,
    onSubmit,
    disableSelection = false,
    hasSelection = false,
  } = props;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExportFormData>({
    defaultValues: {
      format: "json",
      zip: false,
      scope: "all",
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        format: "json",
        zip: false,
        scope: "all",
      });
    }
  }, [open, reset]);

  const handleFormSubmit = (data: ExportFormData) => {
    onSubmit(data);
  };

  const handleClose = () => {
    reset();
    onCancel();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Export Samples</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        
        <Stack spacing={3}>
          {/* Format Selection */}
          <FormControl fullWidth>
            <FormLabel sx={{ mb: 1 }}>File Format</FormLabel>
            <Controller
              name="format"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  disabled={loading}
                >
                  <MenuItem value="json">JSON</MenuItem>
                  <MenuItem value="xml">XML</MenuItem>
                  <MenuItem value="csv">CSV</MenuItem>
                  <MenuItem value="xlsx">Excel (XLSX)</MenuItem>
                </Select>
              )}
            />
          </FormControl>

          {/* Zip Option */}
          <FormControl fullWidth>
            <Controller
              name="zip"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Switch {...field} checked={field.value} disabled={loading} />}
                  label="Compress as ZIP"
                />
              )}
            />
          </FormControl>

          {/* Export Scope */}
          <FormControl fullWidth disabled={loading}>
            <FormLabel sx={{ mb: 1 }}>Export Scope</FormLabel>
            <Controller
              name="scope"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <FormControlLabel
                    value="all"
                    control={<Radio />}
                    label="All Records"
                  />
                  <FormControlLabel
                    value="currentPage"
                    control={<Radio />}
                    label="Current Page"
                  />
                  <FormControlLabel
                    value="selection"
                    control={<Radio />}
                    label="Selected Records"
                    disabled={!hasSelection}
                  />
                </RadioGroup>
              )}
            />
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(handleFormSubmit)}
          variant="contained"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Export"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExportDialog;
