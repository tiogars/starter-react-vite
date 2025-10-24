import { render, screen, waitFor } from '@testing-library/react'
import App from './App'
import { describe, it, expect } from 'vitest'

describe('App', () => {
  it('renders the application with Redux Provider, Router and Theme', async () => {
    render(<App />)

    // Wait for the router to render the home page
    await waitFor(() => {
      expect(screen.getByText(/Welcome to the Basic Page/i)).toBeInTheDocument()
    })
  })

  it('renders the home page content', async () => {
    render(<App />)

    // Check for home page specific content - using getAllByText since content appears in layout components
    await waitFor(() => {
      const elements = screen.getAllByText(/This is a simple page layout with routing enabled/i)
      expect(elements.length).toBeGreaterThan(0)
    })
  })

  it('renders navigation links', async () => {
    render(<App />)

    // Check for navigation links (RouterLink renders as <a> tags, not buttons)
    await waitFor(() => {
      const viewFeaturesButtons = screen.getAllByText(/View Features/i)
      const manageRoutesButtons = screen.getAllByText(/Manage Routes/i)
      expect(viewFeaturesButtons.length).toBeGreaterThan(0)
      expect(manageRoutesButtons.length).toBeGreaterThan(0)
    })
  })

  it('renders useful links sections', async () => {
    render(<App />)

    // Check for useful links sections - using getAllByText since links appear multiple times in layout
    await waitFor(() => {
      const documentationLinks = screen.getAllByText(/React Documentation/i)
      expect(documentationLinks.length).toBeGreaterThan(0)
      
      const githubLinks = screen.getAllByText(/Tiogars@Github/i)
      expect(githubLinks.length).toBeGreaterThan(0)
    })
  })
})
