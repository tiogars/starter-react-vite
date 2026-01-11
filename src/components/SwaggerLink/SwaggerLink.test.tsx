/**
 * Test File for SwaggerLink
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import SwaggerLink from './index';

describe('SwaggerLink', () => {
  const originalEnv = import.meta.env.VITE_SWAGGER_URL;

  afterEach(() => {
    // Reset environment variable
    vi.stubEnv('VITE_SWAGGER_URL', originalEnv);
  });

  describe('Rendering', () => {
    it('should render link with provided url', () => {
      render(<SwaggerLink url="https://api.example.com/swagger" />);
      
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'https://api.example.com/swagger');
      expect(link).toHaveTextContent('API Documentation');
    });

    it('should render link with custom children', () => {
      render(
        <SwaggerLink url="https://api.example.com/swagger">
          View API Docs
        </SwaggerLink>
      );
      
      const link = screen.getByRole('link');
      expect(link).toHaveTextContent('View API Docs');
    });

    it('should use environment variable when url prop is not provided', () => {
      vi.stubEnv('VITE_SWAGGER_URL', 'https://env.example.com/swagger');
      
      render(<SwaggerLink />);
      
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', 'https://env.example.com/swagger');
    });

    it('should return null when no url is provided and env var is not set', () => {
      vi.stubEnv('VITE_SWAGGER_URL', undefined);
      
      const { container } = render(<SwaggerLink />);
      
      expect(container.firstChild).toBeNull();
    });

    it('should have correct target and rel attributes for security', () => {
      render(<SwaggerLink url="https://api.example.com/swagger" />);
      
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Props', () => {
    it('should prioritize url prop over environment variable', () => {
      vi.stubEnv('VITE_SWAGGER_URL', 'https://env.example.com/swagger');
      
      render(<SwaggerLink url="https://prop.example.com/swagger" />);
      
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', 'https://prop.example.com/swagger');
    });

    it('should render with complex children', () => {
      render(
        <SwaggerLink url="https://api.example.com/swagger">
          <span>API</span> Documentation
        </SwaggerLink>
      );
      
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(screen.getByText('API')).toBeInTheDocument();
    });
  });
});
