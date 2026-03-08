#!/usr/bin/env bash
set -euo pipefail

# Build both frontend/backend bundles and then Tauri package.
npm --workspace app/backend run build
npm --workspace app/frontend run build
npm run dev:tauri -- build
