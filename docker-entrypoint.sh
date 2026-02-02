#!/bin/sh
set -e

# Runtime environment variables with defaults
: "${API_UPSTREAM:=http://backend:8080}"
: "${VITE_API_URL:=http://localhost:8080}"
: "${VITE_USE_MOCK_API:=false}"
: "${VITE_SWAGGER_URL:=}"
: "${VITE_APP_NAME:=Starter React Vite}"

# Generate runtime config file that will be loaded by the app
cat > /usr/share/nginx/html/config.js << EOF
window.__RUNTIME_CONFIG__ = {
  VITE_API_URL: '$VITE_API_URL',
  VITE_USE_MOCK_API: $VITE_USE_MOCK_API,
  VITE_SWAGGER_URL: '$VITE_SWAGGER_URL',
  VITE_APP_NAME: '$VITE_APP_NAME',
  API_UPSTREAM: '$API_UPSTREAM'
};
EOF

# Substitute environment variables into the nginx config template
if [ -f /etc/nginx/conf.d/default.conf.template ]; then
  envsubst '${API_UPSTREAM}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
fi

# Exec the container command (nginx)
exec "$@"
