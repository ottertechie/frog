# Architecture

## Frontend responsibilities
- Render chat, controls, status, files, animated face.
- Call backend APIs for personas/models/chat/files.
- Reset active thread on persona switch/new conversation.

## Backend responsibilities
- Serve API on port 4141.
- Handle Ollama model listing + streaming chat.
- Build persona system prompt from config + memory + file snippets.
- Maintain memory layers in SQLite.
- Scan/index local files for lightweight retrieval.

## Persona selection flow
1. UI sends switch request with old persona messages.
2. Backend writes old persona summary memory.
3. UI clears active messages and starts new thread.

## Ollama flow
- `GET /api/models` → `/api/tags`
- `POST /api/chat/stream` → `/api/chat` with streaming.

## Database schema
- `conversations`
- `messages`
- `persona_memory`
- `shared_summaries`
- `indexed_files`
- `settings`

## File indexing
- Scans `files/writing` and `files/tech`.
- Reads txt, md, docx.
- Stores extracted text and index timestamp.
- Retrieves top snippets by keyword score.

## Future voice support
- `app/backend/src/voice`, `stt`, `tts` are reserved integration points for Piper/future voice tools.
