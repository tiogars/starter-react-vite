// Vitest setup file
// Extends Jest DOM matchers (e.g., toBeInTheDocument, toHaveTextContent)
import '@testing-library/jest-dom/vitest'
import { vi, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Ensure DOM is cleaned between tests to avoid leakage across cases
afterEach(() => {
  cleanup()
})

// Mock CSS imports
vi.mock('*.css', () => ({
  default: {},
}))
