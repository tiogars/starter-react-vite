# starter-react-vite
React Vite web application to develop as a starter

## Usage

```bash
docker logout
docker login ghcr.io
docker pull ghcr.io/tiogars/starter-react-vite:latest
```

## Docker Build with Custom Environment

To build a Docker image with custom environment variables for production, see [DOCKER_BUILD.md](./DOCKER_BUILD.md) for detailed instructions.

Quick example:
```bash
# Build with default .env.production
docker build -t my-app .

# Build with a custom environment file
docker build --build-arg ENV_FILE=.env.staging -t my-app:staging .
```

## Commands used to create the project

```bash
pnpm create vite MyApplication --template react-ts

pnpm approve-builds

pnpm add @mui/material @emotion/react @emotion/styled react-router @reduxjs/toolkit react-redux @mui/icons-material @fontsource/roboto @mui/x-data-grid @mui/x-date-pickers luxon  react-hook-form

pnpm add -D vitest @vitest/coverage-v8 @testing-library/react @testing-library/jest-dom jsdom @testing-library/user-event @vitest/browser playwright

pnpm exec playwright install
```

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Testing

Run the unit tests with Vitest:

```bash
pnpm test
```

Watch mode for a fast feedback loop:

```bash
pnpm test:watch
```

Generate a coverage report (text + HTML in `coverage/`):

```bash
pnpm test:coverage
```
