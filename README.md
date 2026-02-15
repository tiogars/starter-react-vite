# starter-react-vite

React Vite web application to develop as a starter

## GitHub Pages Deployment

This repository is configured to automatically deploy to GitHub Pages when changes are pushed to the `main` branch.

### How to Enable GitHub Pages

1. Go to your repository's Settings page on GitHub
2. Navigate to "Pages" in the left sidebar
3. Under "Build and deployment":
   - Set **Source** to "GitHub Actions"
4. The workflow will automatically run on the next push to `main` or can be triggered manually

### Deployment Details

- **Workflow**: `.github/workflows/deploy.yml`
- **Trigger**: Automatically on push to `main` branch, or manually via workflow_dispatch
- **Build**: Uses pnpm to install dependencies and build the application
- **Base Path**: Configured as `/starter-react-vite/` for GitHub Pages deployment
- **URL**: Once deployed, the app will be available at: `https://<username>.github.io/starter-react-vite/`

### Local Development

For local development, the app runs without the base path:

```bash
pnpm install
pnpm dev
```

### Production Build

To build the app for GitHub Pages locally:

```bash
GITHUB_PAGES=true pnpm run build
```

