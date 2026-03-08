import type { IndexedFile } from '../utils/types';

export function FilePanel({ files }: { files: IndexedFile[] }) {
  return (
    <aside className="file-panel">
      <h3>Reference Files</h3>
      {files.length === 0 ? <p>No indexed files yet.</p> : (
        <ul>
          {files.map((f) => (
            <li key={f.id}>
              <div>{f.fileName}</div>
              <small>{f.folder} · {f.fileType} · indexed {new Date(f.lastIndexedAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
