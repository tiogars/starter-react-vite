import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from '@mui/material';
import type { Route } from '../../../store/routesApi';

interface RouteDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Route) => void;
  initialData?: Route | null;
  isLoading?: boolean;
}

export const RouteDialog = ({
  open,
  onClose,
  onSubmit,
  initialData,
  isLoading = false,
}: RouteDialogProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Route>({
    defaultValues: {
      name: '',
      path: '',
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({ name: '', path: '' });
    }
  }, [initialData, reset, open]);

  const handleFormSubmit = (data: Route) => {
    onSubmit(data);
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {initialData ? 'Edit Route' : 'Create New Route'}
      </DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <Controller
              name="name"
              control={control}
              rules={{
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  disabled={isLoading}
                />
              )}
            />
            <Controller
              name="path"
              control={control}
              rules={{
                required: 'Path is required',
                pattern: {
                  value: /^\/[a-zA-Z0-9/_-]*$/,
                  message: 'Path must start with / and contain only valid characters',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Path"
                  fullWidth
                  error={!!errors.path}
                  helperText={errors.path?.message}
                  placeholder="/example-path"
                  disabled={isLoading}
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
          >
            {initialData ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
