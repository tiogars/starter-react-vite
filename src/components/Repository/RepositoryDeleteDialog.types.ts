import type { Repository } from './Repository.types';

export interface RepositoryDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  repository: Repository | null;
}
