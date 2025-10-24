// Vitest setup file
// Extends Jest DOM matchers (e.g., toBeInTheDocument, toHaveTextContent)
import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// Mock CSS imports
vi.mock('*.css', () => ({
  default: {},
}))
