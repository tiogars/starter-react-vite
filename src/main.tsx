import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from './App.tsx'

const boot = async () => {
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

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

void boot()
