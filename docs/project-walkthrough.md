# Project Walkthrough

- Start at `README.md`.
- Frontend entry: `app/frontend/src/main.tsx` and `app/frontend/src/pages/App.tsx`.
- Backend entry: `app/backend/src/server.ts`.
- Persona config: `config/personas.json`.
- DB setup: `app/backend/src/db/database.ts`.
- File scanning/indexing: `app/backend/src/files/fileIndexer.ts`.
- Memory summary logic: `app/backend/src/memory/memoryService.ts`.
- Status text source: `App.tsx` state transitions.
- Model loading: `GET /api/models` via `app/backend/src/ollama/ollamaClient.ts`.
- Voice future hooks: `app/backend/src/voice`, `stt`, `tts`.
