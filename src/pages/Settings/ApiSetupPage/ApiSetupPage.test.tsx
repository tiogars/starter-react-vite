import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router';
import ApiSetupPage from './index';
import apiConfigReducer from '../../../store/apiConfigSlice';

// Mock fetch
global.fetch = vi.fn();

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      apiConfig: apiConfigReducer,
    },
    preloadedState: initialState,
  });
};

const renderWithProvider = (component: React.ReactElement, store = createMockStore()) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

describe('ApiSetupPage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the page with form elements', () => {
      renderWithProvider(<ApiSetupPage />);
      
      expect(screen.getByText('API Setup')).toBeInTheDocument();
      expect(screen.getByLabelText('API Base URL')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Save Configuration/i })).toBeInTheDocument();
    });

    it('should show configured status when API is configured', () => {
      const store = createMockStore({
        apiConfig: {
          apiUrl: 'http://example.com/api',
          isConfigured: true,
        },
      });
      
      renderWithProvider(<ApiSetupPage />, store);
      expect(screen.getByText('API Configured')).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    it('should show error for invalid URL', async () => {
      renderWithProvider(<ApiSetupPage />);
      const user = userEvent.setup();
      
      const input = screen.getByLabelText('API Base URL');
      await user.type(input, 'invalid-url');
      
      const saveButton = screen.getByRole('button', { name: /Save Configuration/i });
      await user.click(saveButton);
      
      await waitFor(() => {
        expect(screen.getByText('Invalid URL format')).toBeInTheDocument();
      });
    });

    it('should accept valid HTTP URL', async () => {
      renderWithProvider(<ApiSetupPage />);
      const user = userEvent.setup();
      
      const input = screen.getByLabelText('API Base URL');
      await user.type(input, 'http://localhost:8080/api');
      
      const saveButton = screen.getByRole('button', { name: /Save Configuration/i });
      await user.click(saveButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Success/i)).toBeInTheDocument();
      });
    });

    it('should accept valid HTTPS URL', async () => {
      renderWithProvider(<ApiSetupPage />);
      const user = userEvent.setup();
      
      const input = screen.getByLabelText('API Base URL');
      await user.type(input, 'https://api.example.com');
      
      const saveButton = screen.getByRole('button', { name: /Save Configuration/i });
      await user.click(saveButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Success/i)).toBeInTheDocument();
      });
    });
  });

  describe('User Interactions', () => {
    it('should update input value on typing', async () => {
      renderWithProvider(<ApiSetupPage />);
      const user = userEvent.setup();
      
      const input = screen.getByLabelText('API Base URL') as HTMLInputElement;
      await user.type(input, 'http://test.com');
      
      expect(input.value).toBe('http://test.com');
    });

    it('should clear configuration when clear button is clicked', async () => {
      const store = createMockStore({
        apiConfig: {
          apiUrl: 'http://example.com/api',
          isConfigured: true,
        },
      });
      
      renderWithProvider(<ApiSetupPage />, store);
      const user = userEvent.setup();
      
      const clearButton = screen.getByRole('button', { name: /Clear Configuration/i });
      await user.click(clearButton);
      
      await waitFor(() => {
        const input = screen.getByLabelText('API Base URL') as HTMLInputElement;
        expect(input.value).toBe('');
      });
    });
  });

  describe('Connection Testing', () => {
    it('should test connection successfully', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 200,
      });
      
      renderWithProvider(<ApiSetupPage />);
      const user = userEvent.setup();
      
      const input = screen.getByLabelText('API Base URL');
      await user.type(input, 'http://localhost:8080/api');
      
      const testButton = screen.getByRole('button', { name: /Test Connection/i });
      await user.click(testButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Success/i)).toBeInTheDocument();
      });
    });

    it('should handle connection test failure', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });
      
      renderWithProvider(<ApiSetupPage />);
      const user = userEvent.setup();
      
      const input = screen.getByLabelText('API Base URL');
      await user.type(input, 'http://localhost:8080/api');
      
      const testButton = screen.getByRole('button', { name: /Test Connection/i });
      await user.click(testButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Connection test failed/i)).toBeInTheDocument();
      });
    });
  });
});
