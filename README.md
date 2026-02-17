# starter-react-vite

React Vite web application to develop as a starter

## Live Demo

🚀 **[View the live application](https://tiogars.github.io/starter-react-vite/)**

## GitHub Pages Deployment

This repository is configured to automatically deploy to GitHub Pages when changes are pushed to the `main` branch.

### Troubleshooting

If you see the "Loading application..." message indefinitely after deployment, please refer to the **[Deployment Troubleshooting Guide](./TROUBLESHOOTING_DEPLOYMENT.md)** for detailed solutions.

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
- **URL**: Once deployed, the app will be available at: `https://tiogars.github.io/starter-react-vite/`

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

**Note:** The build output will reference `/starter-react-vite/` in asset paths. To preview the production build locally, you'll need to serve the files from a properly configured server or use `pnpm preview` (though routing may not work exactly as on GitHub Pages).

### SPA Routing on GitHub Pages

This application uses client-side routing with React Router. To support direct navigation to any route and page refreshes, a `404.html` fallback is included:

- When a user navigates to a route (e.g., `/starter-react-vite/features`), GitHub Pages serves the `404.html` file
- The 404.html script stores the requested path and redirects to the base URL
- The application then restores the correct route using the History API
- React Router handles the routing as usual

This is a standard pattern for SPAs deployed on GitHub Pages.


