# Installation

This guide walks you through the steps needed to run **Starter React Vite** on your local machine.

---

## Prerequisites

| Tool | Minimum version | Notes |
|---|---|---|
| Node.js | 18 LTS | 22 LTS recommended |
| pnpm | 10 | Install via `npm i -g pnpm` |
| Git | any | |

!!! tip "Why pnpm?"
    The project uses **pnpm workspaces** (`pnpm-workspace.yaml`). You can use npm or yarn, but pnpm is the only package manager tested in CI.

---

## 1. Clone the repository

```bash
git clone https://github.com/tiogars/starter-react-vite.git
cd starter-react-vite
```

---

## 2. Install dependencies

```bash
pnpm install
```

This installs all runtime and dev dependencies listed in `package.json`.

---

## 3. Start the development server

```bash
pnpm dev
```

The application starts at **[http://localhost:5173](http://localhost:5173)**.

Vite's dev server supports Hot Module Replacement (HMR), so every file change is reflected in the browser instantly without a full reload.

---

## 4. (Optional) Connect a backend API

By default the app targets `http://localhost:8080`. To point it at a different backend:

1. Open the app and navigate to **Settings → API Setup**.
2. Enter your API base URL (e.g. `http://localhost:8080`).
3. Click **Save**. The URL is persisted to `localStorage`.

The companion backend is available at [tiogars/starter-api-spring-mysql](https://github.com/tiogars/starter-api-spring-mysql).

---

## Running Tests

```bash
# Run all tests once
pnpm test

# Watch mode (re-runs on file changes)
pnpm test:watch

# Run with coverage report (threshold: 80 %)
pnpm test:coverage
```

Test results are printed to the terminal. The HTML coverage report is generated at `coverage/index.html`.

---

## Linting

```bash
pnpm lint
```

ESLint is configured with `eslint.config.js` using the `typescript-eslint` flat-config format.

---

## Production Build

```bash
# Standard build (for any static host)
pnpm build

# Simulate a GitHub Pages build locally (sets the /starter-react-vite/ base path)
GITHUB_PAGES=true pnpm build
```

The output is written to `dist/`.

!!! note
    In CI the `deploy.yml` workflow sets `GITHUB_PAGES=true` automatically. You only need to set it manually when you want to test the GitHub Pages asset paths locally.

```bash
# Preview the production build locally
pnpm preview
```

---

## Docker

A `Dockerfile` and `docker-compose.yml` are included for containerised deployments.

```bash
# Build and run with Docker Compose
docker compose up --build
```

The app is served by Nginx on port **80** inside the container.

---

## Environment Summary

| Command | Purpose |
|---|---|
| `pnpm dev` | Start dev server at localhost:5173 |
| `pnpm build` | Production build → `dist/` |
| `pnpm preview` | Preview production build locally |
| `pnpm test` | Run unit tests with Vitest |
| `pnpm test:coverage` | Tests + Istanbul coverage report |
| `pnpm lint` | ESLint static analysis |
| `pnpm codegen` | Regenerate RTK Query API from OpenAPI spec |
