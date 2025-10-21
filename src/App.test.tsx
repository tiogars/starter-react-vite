import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { describe, it, expect } from 'vitest'

describe('App', () => {
  it('renders the title and increments the counter', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Title appears
    expect(
      screen.getByRole('heading', { name: /vite \+ react/i })
    ).toBeInTheDocument()

    // Button starts with count 0
    const button = screen.getByRole('button', { name: /count is/i })
    expect(button).toHaveTextContent('count is 0')

    // Click increments
    await user.click(button)
    expect(button).toHaveTextContent('count is 1')
  })
})
