# Frog

Frog is a local-first Linux desktop assistant built with Tauri 2, React, Node, Ollama, and SQLite. It has four selectable personas, dynamic Ollama model selection, visible status feedback, file indexing, and local persona memory.

## Tech stack
- Desktop shell: Tauri 2
- Frontend: React + TypeScript + Vite (port **4142**)
- Backend: Node + Express + TypeScript (port **4141**)
- Local model runtime: Ollama
- Local storage: SQLite
- File parsing: txt, md, docx (via mammoth)

## Quick start
1. Install dependencies using `docs/install-guide.md`.
2. Install npm deps: `npm install`
3. Start Ollama: `ollama serve`
4. Pull a model: `ollama pull llama3.2`
5. Run app in dev mode: `npm run dev`
6. Optional desktop shell run: `npm run dev:tauri`

## First run behavior
- Frog loads persona definitions from `config/personas.json`.
- Frog reads installed Ollama models dynamically.
- Frog indexes files under `files/writing` and `files/tech`.
- UI status line always reports system state.

## Personas
- Friend (default): sarcastic, thoughtful, honest.
- Writer: writing/editor persona with writing-folder preference.
- Nerd: technical persona with tech-folder preference.
- CEO: strategy/business advisor persona.

## Memory model
1. Active thread (current chat only).
2. Private persona summary memory.
3. Filtered cross-persona summaries.

Persona switch saves summary for old persona and starts a clean conversation.

## Known MVP limitations
- Summary generation is deterministic text compression, not model-authored summarization.
- File retrieval uses lightweight keyword scoring.
- Voice is only structurally planned in phase 1.

See `docs/` for full walkthrough and operations guides.
