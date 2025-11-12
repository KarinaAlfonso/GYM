#!/bin/sh
set -e
host="${1:-postgres}"
port="${2:-5432}"
retries=60
count=0

echo "Waiting for ${host}:${port}..."
while ! nc -z "$host" "$port"; do
  count=$((count+1))
  if [ "$count" -ge "$retries" ]; then
    echo "Timeout waiting for ${host}:${port}"
    exit 1
  fi
  sleep 1
done
echo "${host}:${port} is reachable"
