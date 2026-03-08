# Run Guide

## Development mode
- `npm run dev`
  - Starts backend on **4141** and frontend on **4142**.

## Script summary
- `scripts/dev.sh`: starts backend + frontend dev servers.
- `scripts/build.sh`: builds backend, frontend, then Tauri package flow.
- `scripts/check-ollama.sh`: validates Ollama connectivity and lists models.

## Tauri dev mode
- `npm run dev:tauri`
- Tauri launches a desktop window and points to `http://localhost:4142`.

## Packaged mode
- `npm run build`
- Produces build output through Tauri tooling.

## Verify app is working
- Persona dropdown loads 4 personas.
- Model dropdown shows local Ollama models.
- Status text changes during actions.
- File panel shows indexed files.
