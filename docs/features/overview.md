# Features Overview

**Starter React Vite** bundles a carefully chosen set of features that cover the most common requirements of enterprise React applications.

---

## Core Features

### ✅ Easy to Use

An intuitive layout with a persistent sidebar, breadcrumb navigation, and contextual action buttons means users can explore the application without a learning curve.

### 📱 Responsive Design

The layout adapts seamlessly across breakpoints:

- **Mobile** — the navigation drawer collapses; toolbar actions remain accessible via the top bar.
- **Tablet** — sidebar shows icon-only labels.
- **Desktop** — full sidebar with labels visible at all times.

### 🎨 Customisable Material-UI Components

Every UI element is built with [Material-UI v7](https://mui.com/). The MUI theme is centralised in `src/theme/theme.ts`, making it straightforward to apply brand colours, typography scales, or spacing tweaks project-wide.

### 🛣️ React Router v7 Integration

Routing is configured in `src/routes/index.tsx` using React Router v7's new `createBrowserRouter` API. The app supports:

- Nested routes (e.g. Settings sub-pages)
- Code-split pages via lazy loading
- A `404.html` fallback for direct navigation on GitHub Pages

### ⚡ High Performance with Vite 7

Vite's ES Module dev server provides near-instant cold starts and HMR updates in milliseconds, even on large codebases.

### 🔄 Redux Toolkit & RTK Query

State management uses [Redux Toolkit v2](https://redux-toolkit.js.org/):

- **Global slices** — theme mode and API URL persisted to `localStorage`.
- **RTK Query** — all API calls are managed by auto-generated query/mutation hooks with built-in caching, invalidation, and loading states.
- **OpenAPI codegen** — run `pnpm codegen` to regenerate API hooks from your backend's OpenAPI spec.

### 📋 React Hook Form

All create/edit dialogs use [React Hook Form v7](https://react-hook-form.com/) with the `Controller` pattern for MUI inputs. See the **[technical review](../technical/react-hook-forms.md)** for details.

### 📊 MUI X DataGrid

The Samples page features a fully server-driven [MUI X DataGrid v8](https://mui.com/x/react-data-grid/) with:

- Server-side pagination, sorting, and filtering
- Custom cell renderers (status chips, tag stacks)
- Row actions (view, edit, delete)
- Empty-state overlay with a contextual CTA

See the **[technical review](../technical/mui-datagrid.md)** for details.

### 🌗 Theme System

Three variants are supported:

| Variant | Behaviour |
|---|---|
| Light only | Always light; toggle hidden |
| Dark only | Always dark; toggle hidden |
| Switchable | Toggle visible; preference persisted |

### 📤 Export / Import

- **Export** — supports JSON, CSV, Excel, PDF, XML with scope selection (all rows / current page / selection) and optional ZIP compression.
- **Import** — bulk file import with a detailed per-row status report.

### 🐳 Docker Support

A production-ready `Dockerfile` and `docker-compose.yml` are included, using Nginx to serve the built app.

### 🧪 Testing with Vitest

Unit and integration tests use [Vitest](https://vitest.dev/) and [Testing Library](https://testing-library.com/). A SonarQube quality gate enforces 80 % coverage on all metrics.

---

## Technology Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI library |
| TypeScript | 5.9 | Type safety |
| Vite | 7 | Build tool & dev server |
| Material-UI | 7 | UI component library |
| MUI X DataGrid | 8 | Advanced data grid |
| MUI X Date Pickers | 8 | Date/time input components |
| React Router | 7 | Client-side routing |
| Redux Toolkit | 2 | State management |
| RTK Query | — | Data fetching & caching |
| React Hook Form | 7.71 | Form state & validation |
| Recharts | 3 | Chart components |
| Luxon | 3 | Date/time utilities |
| Vitest | 4 | Test runner |
| Testing Library | — | DOM testing utilities |
| ESLint | 10 | Code linting |
| pnpm | 10 | Package manager |
