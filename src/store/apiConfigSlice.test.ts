import { describe, it, expect, beforeEach, vi } from 'vitest';
import apiConfigReducer, { setApiUrl, clearApiUrl, selectApiUrl, selectIsApiConfigured } from './apiConfigSlice';

describe('apiConfigSlice', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('initial state', () => {
    it('should have default initial state when no localStorage', () => {
      const state = apiConfigReducer(undefined, { type: 'unknown' });
      expect(state.apiUrl).toBe(null);
      expect(state.isConfigured).toBe(false);
    });

    it('should persist API URL to localStorage when action is dispatched', () => {
      const initialState = { apiUrl: null, isConfigured: false };
      
      // Set a value in localStorage first
      localStorage.setItem('api-endpoint', 'http://localhost:8080/api');
      
      // When we dispatch setApiUrl action, it should persist to localStorage
      const state = apiConfigReducer(initialState, { type: 'apiConfig/setApiUrl', payload: 'http://localhost:8080/api' });
      
      expect(state.apiUrl).toBe('http://localhost:8080/api');
      expect(state.isConfigured).toBe(true);
      expect(localStorage.getItem('api-endpoint')).toBe('http://localhost:8080/api');
    });
  });

  describe('setApiUrl', () => {
    it('should set API URL and mark as configured', () => {
      const initialState = { apiUrl: null, isConfigured: false };
      const state = apiConfigReducer(initialState, setApiUrl('http://example.com/api'));
      
      expect(state.apiUrl).toBe('http://example.com/api');
      expect(state.isConfigured).toBe(true);
      expect(localStorage.getItem('api-endpoint')).toBe('http://example.com/api');
    });

    it('should update existing API URL', () => {
      const initialState = { apiUrl: 'http://old.com/api', isConfigured: true };
      const state = apiConfigReducer(initialState, setApiUrl('http://new.com/api'));
      
      expect(state.apiUrl).toBe('http://new.com/api');
      expect(state.isConfigured).toBe(true);
      expect(localStorage.getItem('api-endpoint')).toBe('http://new.com/api');
    });
  });

  describe('clearApiUrl', () => {
    it('should clear API URL and mark as not configured', () => {
      localStorage.setItem('api-endpoint', 'http://example.com/api');
      const initialState = { apiUrl: 'http://example.com/api', isConfigured: true };
      const state = apiConfigReducer(initialState, clearApiUrl());
      
      expect(state.apiUrl).toBe(null);
      expect(state.isConfigured).toBe(false);
      expect(localStorage.getItem('api-endpoint')).toBe(null);
    });
  });

  describe('selectors', () => {
    it('should select API URL', () => {
      const state = { apiConfig: { apiUrl: 'http://example.com/api', isConfigured: true } };
      expect(selectApiUrl(state)).toBe('http://example.com/api');
    });

    it('should select isConfigured status', () => {
      const state = { apiConfig: { apiUrl: 'http://example.com/api', isConfigured: true } };
      expect(selectIsApiConfigured(state)).toBe(true);
    });
  });
});
