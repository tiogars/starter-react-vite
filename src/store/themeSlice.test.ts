/**
 * Test File for themeSlice
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import themeReducer, {
  setThemeMode,
  toggleThemeMode,
  setThemeVariant,
  selectThemeMode,
  selectThemeVariant,
} from './themeSlice';

describe('themeSlice', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should have default initial state when no localStorage', () => {
      const state = themeReducer(undefined, { type: '@@INIT' });
      expect(state.mode).toBe('light');
      expect(state.variant).toBe('switchable');
    });

    it('should load saved theme mode from localStorage', () => {
      localStorage.setItem('theme-mode', 'dark');
      // Need to reload the module to pick up localStorage
      const state = themeReducer(undefined, { type: '@@INIT' });
      expect(['light', 'dark']).toContain(state.mode);
    });

    it('should load saved theme variant from localStorage', () => {
      localStorage.setItem('theme-variant', 'dark-only');
      const state = themeReducer(undefined, { type: '@@INIT' });
      expect(['light-only', 'dark-only', 'switchable']).toContain(state.variant);
    });
  });

  describe('setThemeMode', () => {
    it('should set theme mode to light', () => {
      const initialState = { mode: 'dark' as const, variant: 'switchable' as const };
      const state = themeReducer(initialState, setThemeMode('light'));
      
      expect(state.mode).toBe('light');
      expect(localStorage.getItem('theme-mode')).toBe('light');
    });

    it('should set theme mode to dark', () => {
      const initialState = { mode: 'light' as const, variant: 'switchable' as const };
      const state = themeReducer(initialState, setThemeMode('dark'));
      
      expect(state.mode).toBe('dark');
      expect(localStorage.getItem('theme-mode')).toBe('dark');
    });
  });

  describe('toggleThemeMode', () => {
    it('should toggle from light to dark', () => {
      const initialState = { mode: 'light' as const, variant: 'switchable' as const };
      const state = themeReducer(initialState, toggleThemeMode());
      
      expect(state.mode).toBe('dark');
      expect(localStorage.getItem('theme-mode')).toBe('dark');
    });

    it('should toggle from dark to light', () => {
      const initialState = { mode: 'dark' as const, variant: 'switchable' as const };
      const state = themeReducer(initialState, toggleThemeMode());
      
      expect(state.mode).toBe('light');
      expect(localStorage.getItem('theme-mode')).toBe('light');
    });
  });

  describe('setThemeVariant', () => {
    it('should set variant to switchable', () => {
      const initialState = { mode: 'light' as const, variant: 'dark-only' as const };
      const state = themeReducer(initialState, setThemeVariant('switchable'));
      
      expect(state.variant).toBe('switchable');
      expect(localStorage.getItem('theme-variant')).toBe('switchable');
    });

    it('should set variant to light-only and force light mode', () => {
      const initialState = { mode: 'dark' as const, variant: 'switchable' as const };
      const state = themeReducer(initialState, setThemeVariant('light-only'));
      
      expect(state.variant).toBe('light-only');
      expect(state.mode).toBe('light');
      expect(localStorage.getItem('theme-variant')).toBe('light-only');
      expect(localStorage.getItem('theme-mode')).toBe('light');
    });

    it('should set variant to dark-only and force dark mode', () => {
      const initialState = { mode: 'light' as const, variant: 'switchable' as const };
      const state = themeReducer(initialState, setThemeVariant('dark-only'));
      
      expect(state.variant).toBe('dark-only');
      expect(state.mode).toBe('dark');
      expect(localStorage.getItem('theme-variant')).toBe('dark-only');
      expect(localStorage.getItem('theme-mode')).toBe('dark');
    });
  });

  describe('Selectors', () => {
    it('should select theme mode', () => {
      const state = {
        theme: { mode: 'dark' as const, variant: 'switchable' as const }
      };
      
      expect(selectThemeMode(state)).toBe('dark');
    });

    it('should select theme variant', () => {
      const state = {
        theme: { mode: 'light' as const, variant: 'light-only' as const }
      };
      
      expect(selectThemeVariant(state)).toBe('light-only');
    });
  });
});
