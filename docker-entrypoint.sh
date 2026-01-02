#!/bin/sh
set -e

# Default upstream if not provided
: "${API_UPSTREAM:=http://backend:8080}"

# Substitute environment variables into the nginx config template
if [ -f /etc/nginx/conf.d/default.conf.template ]; then
  envsubst '${API_UPSTREAM}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
fi

# Exec the container command (nginx)
exec "$@"
