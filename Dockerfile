# Build stage
FROM node:24-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build argument to specify which env file to use (default: .env.production)
ARG ENV_FILE=.env.production

# Copy the environment file if it exists, renaming it to .env for Vite
# This allows the build to use production environment variables
RUN if [ -f "${ENV_FILE}" ]; then \
      echo "Using ${ENV_FILE} for build"; \
      cp "${ENV_FILE}" .env; \
    elif [ -f ".env" ]; then \
      echo "Using existing .env file for build"; \
    else \
      echo "No environment file found, building with defaults"; \
    fi

# Build the application
RUN pnpm run build

# Production stage
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration template and entrypoint
COPY nginx.conf.template /etc/nginx/conf.d/default.conf.template
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Expose port 80
EXPOSE 80

# Run entrypoint which renders the nginx config and starts nginx
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
