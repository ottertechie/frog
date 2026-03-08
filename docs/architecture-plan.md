# Frog Phase 1 Architecture Plan

1. Build a two-process dev setup: frontend (4142) and backend (4141).
2. Keep personas config-driven in `config/personas.json`.
3. Add SQLite schema early so memory and file index are first-class.
4. Implement backend APIs in order: personas/models/files/conversation/chat.
5. Add lightweight file indexing for txt/md/docx and persona-aware retrieval.
6. Add frontend shell with controls, status text, file list, chat, and animated face.
7. Implement persona-switch behavior: summarize old thread then clear active chat.
8. Reserve backend folders for future voice orchestration (stt/tts/voice).
9. Write full beginner docs for install/run/troubleshooting/architecture.
