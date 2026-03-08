#!/usr/bin/env bash
set -euo pipefail

# Frog dev launcher
# Starts backend and frontend with fixed required ports.

npm run dev:backend &
BACK_PID=$!
npm run dev:frontend &
FRONT_PID=$!

cleanup() {
  kill "$BACK_PID" "$FRONT_PID" 2>/dev/null || true
}
trap cleanup EXIT
wait
