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

# Define build arguments for environment variables
ARG VITE_API_URL
ARG VITE_USE_MOCK_API
ARG VITE_SWAGGER_URL
ARG VITE_APP_NAME
ARG API_UPSTREAM

# Set environment variables during the build process
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_USE_MOCK_API=$VITE_USE_MOCK_API
ENV VITE_SWAGGER_URL=$VITE_SWAGGER_URL
ENV VITE_APP_NAME=$VITE_APP_NAME
ENV API_UPSTREAM=$API_UPSTREAM

WORKDIR /app

COPY package.json .
RUN pnpm install
COPY . .

# Build the application
RUN pnpm run build

# Production stage
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration template and entrypoint
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

# Expose port 80
EXPOSE 80

# Run entrypoint which renders the nginx config and starts nginx
CMD ["nginx", "-g", "daemon off;"]
