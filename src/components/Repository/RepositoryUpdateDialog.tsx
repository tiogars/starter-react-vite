import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useUpdateRepositoryMutation } from '../../store/repositoryApi';
import type { RepositoryUpdateForm } from '../../store/repositoryApi';
import type { Repository } from './Repository.types';

interface RepositoryUpdateDialogProps {
  open: boolean;
  onClose: () => void;
  repository: Repository | null;
}

const RepositoryUpdateDialog: React.FC<RepositoryUpdateDialogProps> = ({ open, onClose, repository }) => {
  const { control, handleSubmit, reset } = useForm<RepositoryUpdateForm>({
    defaultValues: {
      name: repository && typeof repository.name === 'string' ? repository.name : '',
      description: repository && typeof repository.description === 'string' ? repository.description : '',
    },
  });
  const [updateRepository, { isLoading }] = useUpdateRepositoryMutation();

  React.useEffect(() => {
    reset({
      name: repository && typeof repository.name === 'string' ? repository.name : '',
      description: repository && typeof repository.description === 'string' ? repository.description : '',
    });
  }, [repository, reset]);

  const onSubmit = async (data: RepositoryUpdateForm) => {
    if (repository) {
      await updateRepository({ id: repository.id, repositoryUpdateForm: data }).unwrap();
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Repository</DialogTitle>
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
          <Button type="submit" variant="contained" disabled={isLoading}>Update</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RepositoryUpdateDialog;
