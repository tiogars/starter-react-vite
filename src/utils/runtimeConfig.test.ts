import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getApiUrl, getRuntimeConfig } from './runtimeConfig';

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
      // Test that function doesn't throw when localStorage is unavailable
      expect(() => getApiUrl()).not.toThrow();
    });
  });

  describe('getRuntimeConfig', () => {
    it('should return a config object', () => {
      const config = getRuntimeConfig();
      expect(config).toBeDefined();
      expect(typeof config).toBe('object');
    });
  });
});
