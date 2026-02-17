import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getApiUrl } from './runtimeConfig';

describe('runtimeConfig', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('getApiUrl', () => {
    it('should prioritize localStorage over environment variables', () => {
      localStorage.setItem('api-endpoint', 'http://custom.com/api');
      const apiUrl = getApiUrl();
      expect(apiUrl).toBe('http://custom.com/api');
    });

    it('should fall back to default when localStorage is empty', () => {
      const apiUrl = getApiUrl();
      expect(apiUrl).toBeDefined();
      expect(typeof apiUrl).toBe('string');
    });

    it('should handle localStorage errors gracefully', () => {
      // Mock localStorage to throw an error
      const originalGetItem = Storage.prototype.getItem;
      Storage.prototype.getItem = () => {
        throw new Error('localStorage unavailable');
      };

      // Test that function doesn't throw when localStorage fails
      expect(() => getApiUrl()).not.toThrow();
      
      // Should return a valid URL even when localStorage fails
      const apiUrl = getApiUrl();
      expect(apiUrl).toBeDefined();
      expect(typeof apiUrl).toBe('string');

      // Restore original
      Storage.prototype.getItem = originalGetItem;
    });
  });
});
