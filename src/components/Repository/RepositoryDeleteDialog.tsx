import DeleteConfirmDialog from '../DeleteConfirmDialog';
import { useDeleteRepositoryMutation } from '../../store/repositoryApi';
import type { RepositoryDeleteDialogProps } from './RepositoryDeleteDialog.types';

const getErrorMessage = (error: unknown) => {
  if (!error) return undefined;

  if (typeof error === 'string') {
    return error;
  }

  if (typeof error === 'object' && error && 'data' in error) {
    const data = (error as { data?: { message?: string; error?: string } }).data;
    return data?.message || data?.error || 'Unable to delete repository.';
  }

  if (typeof error === 'object' && error && 'message' in error) {
    return String((error as { message?: string }).message);
  }

  return 'Unable to delete repository.';
};

export const RepositoryDeleteDialog = (props: RepositoryDeleteDialogProps) => {
  const { open, onClose, repository } = props;
  const [deleteRepository, { isLoading, error }] = useDeleteRepositoryMutation();

  const handleConfirm = async () => {
    if (!repository?.id) return;

    try {
      await deleteRepository({ id: repository.id }).unwrap();
      onClose();
    } catch {
      // Error handled by RTK Query state
    }
  };

  const message = repository?.name
    ? `Are you sure you want to delete "${repository.name}"? This action cannot be undone.`
    : 'Are you sure you want to delete this repository? This action cannot be undone.';

  return (
    <DeleteConfirmDialog
      open={open}
      title="Delete Repository"
      message={message}
      loading={isLoading}
      errorMessage={getErrorMessage(error)}
      onCancel={onClose}
      onConfirm={handleConfirm}
      confirmLabel="Delete"
      cancelLabel="Cancel"
    />
  );
};

export default RepositoryDeleteDialog;
