#!/usr/bin/env bash
set -euo pipefail

echo "Checking Ollama on http://127.0.0.1:11434..."
if curl -sf http://127.0.0.1:11434/api/tags >/dev/null; then
  echo "Ollama is reachable."
  curl -s http://127.0.0.1:11434/api/tags
else
  echo "Ollama is not reachable. Start it with: ollama serve"
  exit 1
fi
