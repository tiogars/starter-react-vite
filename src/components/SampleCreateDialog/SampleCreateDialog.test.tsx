/**
 * Example Test File for SampleCreateDialog
 * Demonstrates testing dialogs, forms, and user interactions
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithProviders, screen, userEvent, waitFor } from '../../test-utils';
import { within } from '@testing-library/react';
import { SampleCreateDialog } from './index';
import * as sampleTagApi from '../../store/sampleTagApi';

// Mock the RTK Query hook
vi.mock('../../store/sampleTagApi', () => ({
  useGetAllTagsQuery: vi.fn(),
}));

describe('SampleCreateDialog', () => {
  const mockOnSubmit = vi.fn();
  const mockOnCancel = vi.fn();

  const defaultProps = {
    open: true,
    onSubmit: mockOnSubmit,
    onCancel: mockOnCancel,
    submitting: false,
    errorMessage: null,
    violations: null,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock the tags query to return empty array by default
    vi.mocked(sampleTagApi.useGetAllTagsQuery).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: undefined,
    } as any);
  });

  describe('Dialog Visibility', () => {
    it('should render dialog when open is true', () => {
      renderWithProviders(<SampleCreateDialog {...defaultProps} />);
      
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Create New Sample')).toBeInTheDocument();
    });

    it('should not render dialog when open is false', () => {
      const { container } = renderWithProviders(<SampleCreateDialog {...defaultProps} open={false} />);
      // Scope to container to avoid any stray portals
      expect(within(container).queryByRole('dialog')).toBeNull();
    });

    it('should call onCancel when close button is clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<SampleCreateDialog {...defaultProps} />);
      
      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      await user.click(cancelButton);
      
      expect(mockOnCancel).toHaveBeenCalledOnce();
    });
  });

  describe('Form Rendering', () => {
    it('should render all form fields', () => {
      renderWithProviders(<SampleCreateDialog {...defaultProps} />);
      const dialog = screen.getByRole('dialog');
      expect(within(dialog).getByLabelText(/name/i)).toBeInTheDocument();
      expect(within(dialog).getByLabelText(/description/i)).toBeInTheDocument();
      // MUI Switch is role "switch"
      expect(within(dialog).getByRole('switch', { name: /active/i })).toBeInTheDocument();
    });

    it('should initialize active switch as checked', () => {
      renderWithProviders(<SampleCreateDialog {...defaultProps} />);
      const dialog = screen.getByRole('dialog');
      const activeSwitch = within(dialog).getByRole('switch', { name: /active/i });
      expect(activeSwitch).toBeChecked();
    });

    it('should render submit button', () => {
      renderWithProviders(<SampleCreateDialog {...defaultProps} />);
      
      expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
    });
  });

  describe('Form Interactions', () => {
    it('should allow typing in name field', async () => {
      const user = userEvent.setup();
      renderWithProviders(<SampleCreateDialog {...defaultProps} />);
      const dialog = screen.getByRole('dialog');
      const nameInput = within(dialog).getByLabelText(/name/i);
      await user.type(nameInput, 'Test Sample');
      
      expect(nameInput).toHaveValue('Test Sample');
    });

    it('should allow typing in description field', async () => {
      const user = userEvent.setup();
      renderWithProviders(<SampleCreateDialog {...defaultProps} />);
      const dialog = screen.getByRole('dialog');
      const descInput = within(dialog).getByLabelText(/description/i);
      await user.type(descInput, 'Test Description');
      
      expect(descInput).toHaveValue('Test Description');
    });

    it('should toggle active switch', async () => {
      const user = userEvent.setup();
      renderWithProviders(<SampleCreateDialog {...defaultProps} />);
      const dialog = screen.getByRole('dialog');
      const activeSwitch = within(dialog).getByRole('switch', { name: /active/i });
      expect(activeSwitch).toBeChecked();
      
      await user.click(activeSwitch);
      expect(activeSwitch).not.toBeChecked();
    });
  });

  describe('Form Submission', () => {
    it('should call onSubmit with form data when submitted', async () => {
      const user = userEvent.setup();
      renderWithProviders(<SampleCreateDialog {...defaultProps} />);
      const dialog = screen.getByRole('dialog');
      // Fill out the form
      await user.type(within(dialog).getByLabelText(/name/i), 'New Sample');
      await user.type(within(dialog).getByLabelText(/description/i), 'Sample description');
      
      // Submit the form
      const submitButton = within(dialog).getByRole('button', { name: /create/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            name: 'New Sample',
            description: 'Sample description',
            active: true,
          })
        );
      });
    });

    it('should disable submit button when submitting', () => {
      renderWithProviders(<SampleCreateDialog {...defaultProps} submitting={true} />);
      // Dialog renders in a portal, so select globally by submit type
      const submitButton = document.querySelector('button[type="submit"]') as HTMLButtonElement | null;
      expect(submitButton).not.toBeNull();
      expect(submitButton).toBeDisabled();
    });

    it('should show loading indicator when submitting', () => {
      renderWithProviders(<SampleCreateDialog {...defaultProps} submitting={true} />);
      
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should display error message when provided', () => {
      const errorMessage = 'Failed to create sample';
      renderWithProviders(
        <SampleCreateDialog {...defaultProps} errorMessage={errorMessage} />
      );
      
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('should display validation violations', () => {
      const violations = {
        name: 'Name is required',
        description: 'Description too short',
      } as any;
      renderWithProviders(
        <SampleCreateDialog {...defaultProps} violations={violations} />
      );
      const dialog = screen.getByRole('dialog');
      expect(within(dialog).getByText(/Name is required/i)).toBeInTheDocument();
      expect(within(dialog).getByText(/Description too short/i)).toBeInTheDocument();
    });
  });

  describe('Tags Integration', () => {
    it('should load and display available tags', () => {
      const mockTags = [
        { id: 1, name: 'Tag1' },
        { id: 2, name: 'Tag2' },
      ];
      
      vi.mocked(sampleTagApi.useGetAllTagsQuery).mockReturnValue({
        data: mockTags,
        isLoading: false,
        isError: false,
        error: undefined,
      } as any);
      
      renderWithProviders(<SampleCreateDialog {...defaultProps} />);
      const dialog = screen.getByRole('dialog');
      // Autocomplete should be present (tags field)
      expect(within(dialog).getByLabelText(/tags/i)).toBeInTheDocument();
    });

    it('should handle tags loading state', () => {
      vi.mocked(sampleTagApi.useGetAllTagsQuery).mockReturnValue({
        data: undefined,
        isLoading: true,
        isError: false,
        error: undefined,
      } as any);
      
      renderWithProviders(<SampleCreateDialog {...defaultProps} />);
      const dialog = screen.getByRole('dialog');
      // Should still render the form
      expect(within(dialog).getByLabelText(/name/i)).toBeInTheDocument();
    });
  });
});
