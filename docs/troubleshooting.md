# Troubleshooting

## Ollama not running
- Symptom: model dropdown empty, status shows offline.
- Fix: run `ollama serve` and retry.

## No models found
- Symptom: empty model list.
- Fix: run `ollama pull llama3.2` (or another model).

## App launches but no response
- Ensure backend is running on 4141 and frontend on 4142.
- Check backend terminal for stream errors.

## Model dropdown empty
- Run `bash scripts/check-ollama.sh`.

## File indexing errors
- Confirm files are in `files/writing` or `files/tech`.
- Ensure file extension is txt, md, or docx.

## DOCX parsing errors
- Some complex DOCX files may fail; retry with simpler DOCX or export as .md/.txt.

## Database missing or locked
- DB path: `data/frog.db`.
- Close any process locking the file and restart backend.

## Dev port already in use
- Ports must be 4141 and 4142.
- Stop conflicting process and rerun.

## Tauri Linux dependency issues
- Install required WebKitGTK/GTK/libsoup packages for your distro.

## Build errors
- Run `npm install` again.
- Run `npm run typecheck` to find TS issues.
