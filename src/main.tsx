import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary'

const boot = async () => {
  try {
    // Handle redirect from 404.html for GitHub Pages SPA routing
    const redirect = sessionStorage.getItem('spa-redirect');
    if (redirect) {
      sessionStorage.removeItem('spa-redirect');
      
      // Validate the redirect path for security:
      // - Must be a relative path (starts with /)
      // - Must not contain protocol (http://, https://, //, etc.)
      // - Must not contain backslashes or encoded characters that could bypass checks
      if (
        typeof redirect === 'string' &&
        redirect.startsWith('/') &&
        !redirect.includes('://') &&
        !redirect.startsWith('//') &&
        !redirect.includes('\\')
      ) {
        // Use history API to navigate without reload
        window.history.replaceState(null, '', redirect);
      }
    }

    const rootElement = document.getElementById('root');
    if (!rootElement) {
      throw new Error('Root element not found');
    }

    createRoot(rootElement).render(
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>,
    )
  } catch (error) {
    console.error('Failed to boot application:', error);
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="padding: 20px; text-align: center; font-family: sans-serif;">
          <h1 style="color: #d32f2f;">Application Error</h1>
          <p>Failed to load the application. Please try the following:</p>
          <ul style="text-align: left; display: inline-block; margin: 20px auto;">
            <li>Clear your browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)</li>
            <li>Reload the page (Ctrl+R or Cmd+R)</li>
            <li>Try opening the page in an incognito/private window</li>
            <li>Make sure JavaScript is enabled in your browser</li>
          </ul>
          <details style="margin-top: 20px; text-align: left; max-width: 600px; margin: 20px auto;">
            <summary style="cursor: pointer; color: #1976d2;">Technical Details</summary>
            <pre style="background: #f5f5f5; padding: 10px; overflow: auto; text-align: left;">${error instanceof Error ? error.message : String(error)}</pre>
          </details>
        </div>
      `;
    }
  }
}

void boot()
