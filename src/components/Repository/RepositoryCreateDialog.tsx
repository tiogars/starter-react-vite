import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useCreateRepositoryMutation } from '../../store/repositoryApi';
import type { RepositoryCreateForm } from '../../store/repositoryApi';

interface RepositoryCreateDialogProps {
  open: boolean;
  onClose: () => void;
}

const RepositoryCreateDialog: React.FC<RepositoryCreateDialogProps> = ({ open, onClose }) => {
  const { control, handleSubmit, reset } = useForm<RepositoryCreateForm>({
    defaultValues: {
      name: '',
      description: '',
    },
  });
  const [createRepository, { isLoading }] = useCreateRepositoryMutation();

  const onSubmit = async (data: RepositoryCreateForm) => {
    await createRepository({ repositoryCreateForm: data }).unwrap();
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Repository</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Name is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Name"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Description" fullWidth margin="normal" />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isLoading}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={isLoading}>Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RepositoryCreateDialog;
