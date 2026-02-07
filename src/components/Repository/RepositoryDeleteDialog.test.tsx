import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RepositoryDeleteDialog from './RepositoryDeleteDialog';
import type { Repository } from './Repository.types';
import { useDeleteRepositoryMutation } from '../../store/repositoryApi';

vi.mock('../../store/repositoryApi', () => ({
  useDeleteRepositoryMutation: vi.fn(),
}));

const mockUseDeleteRepositoryMutation = vi.mocked(useDeleteRepositoryMutation);

describe('RepositoryDeleteDialog', () => {
  beforeEach(() => {
    mockUseDeleteRepositoryMutation.mockReset();
  });

  it('renders the repository name in the confirmation message', () => {
    const repo: Repository = { id: 5, name: 'Alpha Repo' };
    const deleteRepository = vi.fn();

    mockUseDeleteRepositoryMutation.mockReturnValue([
      deleteRepository,
      { isLoading: false, error: undefined },
    ] as never);

    render(
      <RepositoryDeleteDialog
        open={true}
        onClose={vi.fn()}
        repository={repo}
      />
    );

    expect(
      screen.getByText(/delete "Alpha Repo"/i)
    ).toBeInTheDocument();
  });

  it('calls delete mutation and closes on confirm', async () => {
    const repo: Repository = { id: 12, name: 'Beta Repo' };
    const onClose = vi.fn();
    const unwrap = vi.fn().mockResolvedValue({});
    const deleteRepository = vi.fn().mockReturnValue({ unwrap });

    mockUseDeleteRepositoryMutation.mockReturnValue([
      deleteRepository,
      { isLoading: false, error: undefined },
    ] as never);

    render(
      <RepositoryDeleteDialog open={true} onClose={onClose} repository={repo} />
    );

    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));

    expect(deleteRepository).toHaveBeenCalledWith({ id: 12 });
    expect(unwrap).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call delete mutation when repository is missing', async () => {
    const onClose = vi.fn();
    const deleteRepository = vi.fn();

    mockUseDeleteRepositoryMutation.mockReturnValue([
      deleteRepository,
      { isLoading: false, error: undefined },
    ] as never);

    render(
      <RepositoryDeleteDialog
        open={true}
        onClose={onClose}
        repository={null}
      />
    );

    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));

    expect(deleteRepository).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });
});
