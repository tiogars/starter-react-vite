/**
 * Example Test File for SampleComponent
 * Demonstrates best practices for component testing with 80%+ coverage
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SampleComponent from './index';

describe('SampleComponent', () => {
  describe('Rendering', () => {
    it('should render with argument prop', () => {
      render(<SampleComponent argument="test-argument" />);
      const argumentLine = screen.getByText((content) =>
        content.includes('Argument :') && content.includes('test-argument')
      );
      expect(argumentLine).toBeInTheDocument();
    });

    it('should render children content', () => {
      render(
        <SampleComponent argument="test">
          <div>Child Content</div>
        </SampleComponent>
      );
      
      expect(screen.getByText('Child Content')).toBeInTheDocument();
    });

    it('should render with empty argument', () => {
      render(<SampleComponent argument="" />);
      const argumentLine = screen.getByText((content) => content.trim().startsWith('Argument :'));
      expect(argumentLine).toBeInTheDocument();
    });
  });

  describe('Props Variations', () => {
    it('should handle special characters in argument', () => {
      const specialChars = '<script>alert("test")</script>';
      render(<SampleComponent argument={specialChars} />);
      const argumentLine = screen.getByText((content) =>
        content.includes('Argument :') && content.includes(specialChars)
      );
      expect(argumentLine).toBeInTheDocument();
    });

    it('should handle numeric argument values', () => {
      render(<SampleComponent argument={123 as unknown as string} />);
      const argumentLine = screen.getByText((content) =>
        content.includes('Argument :') && content.includes('123')
      );
      expect(argumentLine).toBeInTheDocument();
    });
  });
});
