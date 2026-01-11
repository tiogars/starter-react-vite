/**
 * Test File for ExportDialog
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExportDialog from './index';

describe('ExportDialog', () => {
  const mockOnCancel = vi.fn();
  const mockOnSubmit = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render dialog when open', () => {
      render(
        <ExportDialog
          open={true}
          onCancel={mockOnCancel}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByText('Export Samples')).toBeInTheDocument();
      expect(screen.getByText('File Format')).toBeInTheDocument();
    });

    it('should render all format options', () => {
      render(
        <ExportDialog
          open={true}
          onCancel={mockOnCancel}
          onSubmit={mockOnSubmit}
        />
      );

      // Click to open the select dropdown
      const selectElement = screen.getByRole('combobox');
      expect(selectElement).toBeInTheDocument();
    });

    it('should render export scope options', () => {
      render(
        <ExportDialog
          open={true}
          onCancel={mockOnCancel}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByLabelText('All Records')).toBeInTheDocument();
      expect(screen.getByLabelText('Current Page')).toBeInTheDocument();
      expect(screen.getByLabelText('Selected Records')).toBeInTheDocument();
    });

    it('should render zip compression option', () => {
      render(
        <ExportDialog
          open={true}
          onCancel={mockOnCancel}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByText('Compress as ZIP')).toBeInTheDocument();
    });

    it('should disable selection option when hasSelection is false', () => {
      render(
        <ExportDialog
          open={true}
          hasSelection={false}
          onCancel={mockOnCancel}
          onSubmit={mockOnSubmit}
        />
      );

      const selectionRadio = screen.getByLabelText('Selected Records');
      expect(selectionRadio).toBeDisabled();
    });

    it('should enable selection option when hasSelection is true', () => {
      render(
        <ExportDialog
          open={true}
          hasSelection={true}
          onCancel={mockOnCancel}
          onSubmit={mockOnSubmit}
        />
      );

      const selectionRadio = screen.getByLabelText('Selected Records');
      expect(selectionRadio).not.toBeDisabled();
    });

    it('should render error message when provided', () => {
      render(
        <ExportDialog
          open={true}
          errorMessage="Export failed"
          onCancel={mockOnCancel}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByText('Export failed')).toBeInTheDocument();
    });

    it('should show loading state', () => {
      render(
        <ExportDialog
          open={true}
          loading={true}
          onCancel={mockOnCancel}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /cancel/i })).toBeDisabled();
    });
  });

  describe('Interactions', () => {
    it('should call onCancel when cancel button is clicked', async () => {
      const user = userEvent.setup();

      render(
        <ExportDialog
          open={true}
          onCancel={mockOnCancel}
          onSubmit={mockOnSubmit}
        />
      );

      await user.click(screen.getByText('Cancel'));
      expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });

    it('should call onSubmit when export button is clicked', async () => {
      const user = userEvent.setup();

      render(
        <ExportDialog
          open={true}
          onCancel={mockOnCancel}
          onSubmit={mockOnSubmit}
        />
      );

      await user.click(screen.getByText('Export'));
      
      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      });
    });

    it('should submit with default values', async () => {
      const user = userEvent.setup();

      render(
        <ExportDialog
          open={true}
          onCancel={mockOnCancel}
          onSubmit={mockOnSubmit}
        />
      );

      await user.click(screen.getByText('Export'));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          format: 'json',
          zip: false,
          scope: 'all',
        });
      });
    });

    it('should toggle zip compression', async () => {
      const user = userEvent.setup();

      render(
        <ExportDialog
          open={true}
          onCancel={mockOnCancel}
          onSubmit={mockOnSubmit}
        />
      );

      const zipSwitch = screen.getByRole('switch', { name: /compress as zip/i });
      await user.click(zipSwitch);

      await user.click(screen.getByText('Export'));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            zip: true,
          })
        );
      });
    });

    it('should change export scope', async () => {
      const user = userEvent.setup();

      render(
        <ExportDialog
          open={true}
          onCancel={mockOnCancel}
          onSubmit={mockOnSubmit}
        />
      );

      const currentPageRadio = screen.getByLabelText('Current Page');
      await user.click(currentPageRadio);

      await user.click(screen.getByText('Export'));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            scope: 'currentPage',
          })
        );
      });
    });

    it('should select "Selected Records" when hasSelection is true', async () => {
      const user = userEvent.setup();

      render(
        <ExportDialog
          open={true}
          hasSelection={true}
          onCancel={mockOnCancel}
          onSubmit={mockOnSubmit}
        />
      );

      const selectionRadio = screen.getByLabelText('Selected Records');
      await user.click(selectionRadio);

      await user.click(screen.getByText('Export'));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            scope: 'selection',
          })
        );
      });
    });
  });
});
