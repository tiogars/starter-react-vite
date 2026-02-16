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
      // Create error UI using DOM manipulation to avoid XSS vulnerabilities
      const errorContainer = document.createElement('div');
      errorContainer.style.cssText = 'padding: 20px; text-align: center; font-family: sans-serif;';
      
      const title = document.createElement('h1');
      title.style.color = '#d32f2f';
      title.textContent = 'Application Error';
      errorContainer.appendChild(title);
      
      const message = document.createElement('p');
      message.textContent = 'Failed to load the application. Please try the following:';
      errorContainer.appendChild(message);
      
      const list = document.createElement('ul');
      list.style.cssText = 'text-align: left; display: inline-block; margin: 20px auto;';
      const steps = [
        'Clear your browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)',
        'Reload the page (Ctrl+R or Cmd+R)',
        'Try opening the page in an incognito/private window',
        'Make sure JavaScript is enabled in your browser'
      ];
      steps.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        list.appendChild(li);
      });
      errorContainer.appendChild(list);
      
      // Only show technical details in development mode
      if (import.meta.env.DEV) {
        const details = document.createElement('details');
        details.style.cssText = 'margin-top: 20px; text-align: left; max-width: 600px; margin: 20px auto;';
        
        const summary = document.createElement('summary');
        summary.style.cssText = 'cursor: pointer; color: #1976d2;';
        summary.textContent = 'Technical Details (Development Only)';
        details.appendChild(summary);
        
        const pre = document.createElement('pre');
        pre.style.cssText = 'background: #f5f5f5; padding: 10px; overflow: auto; text-align: left;';
        pre.textContent = error instanceof Error ? error.message : String(error);
        details.appendChild(pre);
        
        errorContainer.appendChild(details);
      } else {
        const prodMessage = document.createElement('p');
        prodMessage.style.cssText = 'margin-top: 20px; padding: 12px; background: #e3f2fd; border-radius: 4px; font-size: 14px; color: #1565c0;';
        prodMessage.textContent = 'For privacy and security reasons, technical details are not shown in production mode. Please check the browser console or contact support if the issue persists.';
        errorContainer.appendChild(prodMessage);
      }
      
      rootElement.replaceChildren(errorContainer);
    }
  }
}

void boot()
