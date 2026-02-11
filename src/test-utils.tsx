/**
 * Test Utilities for React Testing Library
 * Provides common test helpers and wrappers for the application
 */

import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { vi } from 'vitest';
import { emptySplitApi } from './store/emptyApi';
import themeReducer from './store/themeSlice';

/**
 * Creates a mock Redux store for testing
 * @param preloadedState - Optional initial state
 */
export function setupStore(preloadedState?: unknown) {
  return configureStore({
    reducer: {
      api: emptySplitApi.reducer,
      theme: themeReducer,
    } as any,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(emptySplitApi.middleware),
    preloadedState: preloadedState as never,
  });
}

export type AppStore = ReturnType<typeof setupStore>;

/**
 * Render helper that wraps components with Redux Provider
 * Use this instead of plain render() for components that need Redux
 * 
 * @example
 * renderWithProviders(<MyComponent />);
 */
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: unknown;
  store?: AppStore;
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState,
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: Readonly<{ children: React.ReactNode }>) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

/**
 * Mock RTK Query hook response
 * Use this to mock useGetSamplesQuery, useCreateSampleMutation, etc.
 * 
 * @example
 * import { vi } from 'vitest';
 * const mockQuery = mockApiHook([sample1, sample2], false, null);
 * vi.mocked(useGetSamplesQuery).mockReturnValue(mockQuery);
 */
export function mockApiHook<T>(
  data: T | undefined,
  isLoading = false,
  error: unknown = null,
) {
  return {
    data,
    isLoading,
    isError: !!error,
    error,
    isSuccess: !isLoading && !error && data !== undefined,
    refetch: vi.fn(),
    // Add other RTK Query fields as needed
    isFetching: isLoading,
    isUninitialized: false,
    currentData: data,
    fulfilledTimeStamp: Date.now(),
    originalArgs: undefined,
    requestId: 'test-request-id',
    startedTimeStamp: Date.now(),
    endpointName: 'test-endpoint',
  };
}

/**
 * Mock RTK Query mutation response
 * Use this to mock useCreateSampleMutation, useUpdateSampleMutation, etc.
 * 
 * @example
 * import { vi } from 'vitest';
 * const [mutate, mockMutation] = mockApiMutation();
 * vi.mocked(useCreateSampleMutation).mockReturnValue([mutate, mockMutation]);
 */
export function mockApiMutation<T = unknown>() {
  const mutate = vi.fn().mockResolvedValue({
    data: {} as T,
  });

  const mutation = {
    data: undefined,
    isLoading: false,
    isError: false,
    error: null,
    isSuccess: false,
    reset: vi.fn(),
    // Add other mutation fields as needed
    isUninitialized: true,
    originalArgs: undefined,
    requestId: 'test-mutation-id',
    startedTimeStamp: undefined,
    fulfilledTimeStamp: undefined,
    endpointName: 'test-mutation',
  };

  return [mutate, mutation] as const;
}

/**
 * Wait for async operations to complete
 * Useful when testing components with useEffect or async state updates
 * 
 * @example
 * await waitForAsync();
 */
export const waitForAsync = () =>
  new Promise((resolve) => setTimeout(resolve, 0));

/**
 * Mock Material-UI Dialog for easier testing
 * Add this to your test setup if dialog tests fail
 * 
 * @example
 * beforeAll(() => {
 *   mockDialog();
 * });
 */
export function mockDialog() {
  // Mock IntersectionObserver for Material-UI components
  globalThis.IntersectionObserver = class IntersectionObserver {
    disconnect() {
      // Mock implementation
    }
    observe() {
      // Mock implementation
    }
    takeRecords() {
      return [];
    }
    unobserve() {
      // Mock implementation
    }
  } as unknown as typeof IntersectionObserver;
}

// Re-export everything from testing library
// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
export { userEvent } from '@testing-library/user-event';
