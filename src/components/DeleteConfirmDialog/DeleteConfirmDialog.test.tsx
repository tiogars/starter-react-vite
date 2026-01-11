/**
 * Test File for DeleteConfirmDialog
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeleteConfirmDialog from './index';

describe('DeleteConfirmDialog', () => {
  const mockOnCancel = vi.fn();
  const mockOnConfirm = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render dialog when open is true', () => {
      render(
        <DeleteConfirmDialog
          open={true}
          onCancel={mockOnCancel}
          onConfirm={mockOnConfirm}
        />
      );
      
      expect(screen.getByText('Confirm Delete')).toBeInTheDocument();
      expect(screen.getByText(/Are you sure you want to delete/)).toBeInTheDocument();
    });

    it('should render custom title and message', () => {
      render(
        <DeleteConfirmDialog
          open={true}
          title="Delete Item"
          message="This will permanently remove the item"
          onCancel={mockOnCancel}
          onConfirm={mockOnConfirm}
        />
      );
      
      expect(screen.getByText('Delete Item')).toBeInTheDocument();
      expect(screen.getByText('This will permanently remove the item')).toBeInTheDocument();
    });

    it('should render error message when provided', () => {
      render(
        <DeleteConfirmDialog
          open={true}
          errorMessage="Something went wrong"
          onCancel={mockOnCancel}
          onConfirm={mockOnConfirm}
        />
      );
      
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('should render custom button labels', () => {
      render(
        <DeleteConfirmDialog
          open={true}
          confirmLabel="Remove"
          cancelLabel="Go Back"
          onCancel={mockOnCancel}
          onConfirm={mockOnConfirm}
        />
      );
      
      expect(screen.getByText('Remove')).toBeInTheDocument();
      expect(screen.getByText('Go Back')).toBeInTheDocument();
    });

    it('should render loading state', () => {
      render(
        <DeleteConfirmDialog
          open={true}
          loading={true}
          onCancel={mockOnCancel}
          onConfirm={mockOnConfirm}
        />
      );
      
      // CircularProgress should be visible
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toBeInTheDocument();
      
      // Buttons should be disabled
      const cancelButton = screen.getByText('Cancel').closest('button');
      expect(cancelButton).toBeDisabled();
    });

    it('should render React node as message', () => {
      const customMessage = (
        <div>
          <p>Custom React Node</p>
          <strong>Warning!</strong>
        </div>
      );
      
      render(
        <DeleteConfirmDialog
          open={true}
          message={customMessage}
          onCancel={mockOnCancel}
          onConfirm={mockOnConfirm}
        />
      );
      
      expect(screen.getByText('Custom React Node')).toBeInTheDocument();
      expect(screen.getByText('Warning!')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('should call onCancel when cancel button is clicked', async () => {
      const user = userEvent.setup();
      
      render(
        <DeleteConfirmDialog
          open={true}
          onCancel={mockOnCancel}
          onConfirm={mockOnConfirm}
        />
      );
      
      await user.click(screen.getByText('Cancel'));
      expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });

    it('should call onConfirm when confirm button is clicked', async () => {
      const user = userEvent.setup();
      
      render(
        <DeleteConfirmDialog
          open={true}
          onCancel={mockOnCancel}
          onConfirm={mockOnConfirm}
        />
      );
      
      await user.click(screen.getByText('Delete'));
      expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    });

    it('should disable buttons when loading', () => {
      render(
        <DeleteConfirmDialog
          open={true}
          loading={true}
          onCancel={mockOnCancel}
          onConfirm={mockOnConfirm}
        />
      );
      
      const cancelButton = screen.getByText('Cancel').closest('button');
      const buttons = screen.getAllByRole('button');
      
      expect(cancelButton).toBeDisabled();
      // Both buttons should be disabled
      buttons.forEach(button => {
        expect(button).toBeDisabled();
      });
    });
  });
});
