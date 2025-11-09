# Docker Build with Custom Environment Variables

## Overview

This Docker configuration allows you to build the React application with custom environment variables for production. The environment variables are baked into the build during the Docker image creation process.

## ⚠️ Important Security Notice

**WARNING**: Environment variables are embedded into the client-side JavaScript bundle during the build process. This means:

- All values will be visible in the browser's developer tools and network traffic
- **NEVER include sensitive secrets, API keys, or credentials** in these environment files
- Only use these for non-sensitive configuration like API endpoints, feature flags, or public identifiers
- For sensitive data, use server-side environment variables or a secure configuration service

## How It Works

The Dockerfile supports injecting environment variables during the build stage through the `ENV_FILE` build argument. This allows you to:

1. Build the application with different environment configurations for different deployments
2. Use the same Dockerfile for development, staging, and production builds
3. Keep environment-specific configuration separate from the codebase

## Usage

### Option 1: Using the default .env.production file

Simply build the Docker image with the default configuration:

```bash
docker build -t my-app .
```

The build will automatically use `.env.production` if it exists in the project root.

### Option 2: Using a custom environment file

Build the Docker image with a specific environment file:

```bash
docker build --build-arg ENV_FILE=.env.staging -t my-app:staging .
```

### Option 3: Building from another project

When building from another project, you can place your environment file in the build context and specify it:

```bash
# From your project directory, copy your env file to the starter-react-vite directory
cp my-production.env /path/to/starter-react-vite/.env.production

# Build the Docker image
cd /path/to/starter-react-vite
docker build -t my-app:prod .
```

Or use a custom file name:

```bash
# Copy your env file with a custom name
cp my-production.env /path/to/starter-react-vite/.env.custom

# Build with the custom file
docker build --build-arg ENV_FILE=.env.custom -t my-app:prod .
```

### Option 4: Using Docker Compose

Update your `docker-compose.yml` to specify the environment file:

```yaml
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        ENV_FILE: .env.production
    ports:
      - "8080:80"
```

Then build and run:

```bash
docker-compose up --build
```

## Environment File Format

Your environment file should contain Vite environment variables (prefixed with `VITE_`):

```bash
# API Configuration
VITE_API_URL=https://api.production.example.com

# Set to 'mock' to use mock data, or the actual backend URL
VITE_USE_MOCK_API=false

# Swagger Documentation URL (optional)
VITE_SWAGGER_URL=https://api.production.example.com/swagger-ui/index.html
```

## Important Notes

1. **Build-time variables**: Vite environment variables are embedded into the build at compile time, not runtime. This means the values are baked into the JavaScript bundle.

2. **Security**: Do not include sensitive secrets in these environment files as they will be visible in the client-side JavaScript code.

3. **File location**: The environment file must be in the build context (same directory as the Dockerfile or a subdirectory).

4. **Git tracking**: By default, `.env` and `.env.production` files are allowed in the Docker build context but ignored by git (see `.gitignore`).

## Examples

### Development build
```bash
docker build --build-arg ENV_FILE=.env.development -t my-app:dev .
```

### Staging build
```bash
docker build --build-arg ENV_FILE=.env.staging -t my-app:staging .
```

### Production build (default)
```bash
docker build -t my-app:prod .
```

## Troubleshooting

**Issue**: Build uses wrong environment variables

**Solution**: Make sure your environment file is in the correct location and the build argument is correctly specified.

**Issue**: Environment variables not available in the app

**Solution**: Ensure your variables are prefixed with `VITE_` as required by Vite.

**Issue**: Build fails with "file not found"

**Solution**: Check that your environment file is not excluded in `.dockerignore`.
