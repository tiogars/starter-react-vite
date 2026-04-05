# Deployment

This project supports two deployment targets: **GitHub Pages** (for the React app) and **GitHub Pages** (for this MkDocs documentation site). Both are deployed from the same repository via GitHub Actions.

---

## React Application

### Automatic Deployment

The React app is automatically deployed to GitHub Pages on every push to `main`:

- **Workflow:** `.github/workflows/deploy.yml`
- **URL:** `https://tiogars.github.io/starter-react-vite/`

### Enable GitHub Pages

If you have forked this repository you need to enable GitHub Pages once:

1. Go to **Settings → Pages** in your forked repository.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push a commit to `main` (or trigger the workflow manually).

### Manual Trigger

You can trigger the deployment workflow manually from **Actions → Deploy to GitHub Pages → Run workflow**.

### How the Build Works

```yaml
# .github/workflows/deploy.yml (simplified)
- run: pnpm install
- run: pnpm run build          # GITHUB_PAGES=true is set by vite.config.ts env check
- uses: actions/upload-pages-artifact@v3
  with:
    path: ./dist
- uses: actions/deploy-pages@v4
```

`vite.config.ts` detects the `GITHUB_PAGES` environment variable and sets the `base` path to `/starter-react-vite/`:

```typescript
// vite.config.ts
const base = process.env.GITHUB_PAGES ? '/starter-react-vite/' : '/';
```

### SPA Routing on GitHub Pages

GitHub Pages serves static files. When a user navigates directly to a React route (e.g. `/starter-react-vite/samples`), GitHub Pages cannot find the file and returns the `404.html`.

The `public/404.html` script intercepts the 404, stores the original path in `sessionStorage`, and redirects to the base URL. The React app reads the stored path on load and restores the correct route via the History API.

---

## MkDocs Documentation

The documentation site is built with MkDocs Material and deployed as a sub-directory of the same GitHub Pages site.

- **Workflow:** `.github/workflows/docs.yml`
- **URL:** `https://tiogars.github.io/starter-react-vite/docs/`

### How It Works

The MkDocs documentation is built as part of the main `deploy.yml` workflow and placed inside the React app's `dist/docs/` directory:

1. The React app is built to `dist/`.
2. MkDocs builds the documentation to `dist/docs/`.
3. The entire `dist/` directory (app + docs) is uploaded as a single GitHub Pages artifact.

This means both sites are deployed together in a single workflow run.

The separate `docs.yml` workflow only **builds** the documentation (without deploying) so that documentation changes in pull requests are validated immediately.

### Running Docs Locally

```bash
# Install MkDocs and the Material theme
pip install mkdocs-material

# Serve with live reload at http://127.0.0.1:8000
mkdocs serve

# Build the static site to the site/ directory
mkdocs build
```

!!! note
    The `site/` directory is listed in `.gitignore`. It is built in CI and never committed to the repository.

---

## Docker

For on-premises or cloud VM deployments, use the included Docker setup.

### Build & Run

```bash
# Start the app on port 80
docker compose up --build
```

The `Dockerfile` uses a two-stage build:

1. **Build stage** — Node.js image installs dependencies and runs `pnpm build`.
2. **Serve stage** — Nginx serves the `dist/` output.

### Nginx Configuration

`nginx.conf` is configured to support SPA routing:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

This returns `index.html` for any path that does not match a static file, allowing React Router to handle routing client-side.

A templated version (`nginx.conf.template`) is available for environment-variable-driven configuration at container start time.

---

## CI / CD Pipelines

| Workflow | Trigger | Purpose |
|---|---|---|
| `build.yml` | Push to `main` | SonarQube scan + quality gate |
| `deploy.yml` | Push to `main` / manual | Build React app **and** MkDocs docs, then deploy both to GitHub Pages |
| `docs.yml` | Push to `main` or PR (docs paths only) | Build-only validation of MkDocs; fails fast on broken links or missing pages |
| `release.yml` | Tag push (`v*`) | Create GitHub Release |

---

## Environment Variables

| Variable | Used in | Purpose |
|---|---|---|
| `GITHUB_PAGES` | `vite.config.ts` | Sets base path to `/starter-react-vite/` |
| `SONAR_TOKEN` | `build.yml` | SonarQube authentication |
| `SONAR_HOST_URL` | `build.yml` | SonarQube server URL |

---

## Troubleshooting

For common deployment issues (blank page, routing not working, assets returning 404) refer to the **[Troubleshooting Deployment Guide](https://github.com/tiogars/starter-react-vite/blob/main/TROUBLESHOOTING_DEPLOYMENT.md)** in the repository root.
