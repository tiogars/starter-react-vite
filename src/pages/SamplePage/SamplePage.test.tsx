import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, it, expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { emptySplitApi } from '../../store/emptyApi';
import SamplePage from './index';

// Create a mock store for testing
const createMockStore = () => {
  return configureStore({
    reducer: {
      [emptySplitApi.reducerPath]: emptySplitApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(emptySplitApi.middleware),
  });
};

describe('SamplePage', () => {
  it('renders the export button', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <SamplePage />
      </Provider>
    );

    // Check that the export button is present
    const exportButtons = screen.getAllByRole('button', { name: /export/i });
    expect(exportButtons.length).toBeGreaterThan(0);
  });

  it('renders the create sample button', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <SamplePage />
      </Provider>
    );

    // Check that the create button is present
    const createButtons = screen.getAllByRole('button', { name: /create sample/i });
    expect(createButtons.length).toBeGreaterThan(0);
  });

  it('renders the refresh button', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <SamplePage />
      </Provider>
    );

    // Check that the refresh button is present
    const refreshButtons = screen.getAllByRole('button', { name: /refresh/i });
    expect(refreshButtons.length).toBeGreaterThan(0);
  });
});
