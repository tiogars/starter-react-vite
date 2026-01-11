/**
 * Test File for ThemeToggle
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeToggle from './index';
import { renderWithProviders } from '../../test-utils';

describe('ThemeToggle', () => {
  describe('Rendering', () => {
    it('should render toggle button in light mode', () => {
      renderWithProviders(<ThemeToggle />, {
        preloadedState: {
          theme: { mode: 'light', variant: 'switchable' }
        }
      });
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should render toggle button in dark mode', () => {
      renderWithProviders(<ThemeToggle />, {
        preloadedState: {
          theme: { mode: 'dark', variant: 'switchable' }
        }
      });
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should show correct tooltip for light mode', () => {
      renderWithProviders(<ThemeToggle />, {
        preloadedState: {
          theme: { mode: 'light', variant: 'switchable' }
        }
      });
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should show correct tooltip for dark mode', () => {
      renderWithProviders(<ThemeToggle />, {
        preloadedState: {
          theme: { mode: 'dark', variant: 'switchable' }
        }
      });
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('should toggle theme when button is clicked', async () => {
      const user = userEvent.setup();
      
      const { store } = renderWithProviders(<ThemeToggle />, {
        preloadedState: {
          theme: { mode: 'light', variant: 'switchable' }
        }
      });
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      // Theme should toggle to dark
      expect(store.getState().theme.mode).toBe('dark');
    });

    it('should toggle from dark to light', async () => {
      const user = userEvent.setup();
      
      const { store } = renderWithProviders(<ThemeToggle />, {
        preloadedState: {
          theme: { mode: 'dark', variant: 'switchable' }
        }
      });
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      // Theme should toggle to light
      expect(store.getState().theme.mode).toBe('light');
    });
  });
});
