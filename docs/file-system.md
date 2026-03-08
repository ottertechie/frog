# File System and Indexing

## Reference folders
- `files/writing`
- `files/tech`

## Supported file types
- `.txt`
- `.md`
- `.docx`

## Indexing behavior
- Backend scans both folders.
- Extracted text is stored in SQLite `indexed_files`.
- UI shows name, folder, type, and indexed timestamp.

## Retrieval behavior
- Query words are matched against indexed content.
- Top snippets are sent into prompt context.
- Writer persona prefers writing folder; Nerd prefers tech folder.

## Limitations
- Retrieval is intentionally simple for MVP.
- Very large or complex DOCX files may require preprocessing.
