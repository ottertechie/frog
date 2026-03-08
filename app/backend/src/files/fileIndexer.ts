/**
 * File indexer for files/writing and files/tech.
 * Supports txt, md, docx for MVP.
 */
import fs from 'node:fs';
import path from 'node:path';
import mammoth from 'mammoth';
import { db } from '../db/database.js';
import { TECH_DIR, WRITING_DIR } from '../utils/paths.js';

const supported = new Set(['.txt', '.md', '.docx']);

async function readText(filePath: string): Promise<string> {
  if (filePath.endsWith('.docx')) {
    const output = await mammoth.extractRawText({ path: filePath });
    return output.value;
  }
  return fs.readFileSync(filePath, 'utf-8');
}

export async function scanAndIndexFiles(): Promise<void> {
  for (const [folderName, folderPath] of [['writing', WRITING_DIR], ['tech', TECH_DIR]] as const) {
    if (!fs.existsSync(folderPath)) continue;
    for (const entry of fs.readdirSync(folderPath)) {
      const fullPath = path.join(folderPath, entry);
      const ext = path.extname(entry).toLowerCase();
      if (!supported.has(ext) || !fs.statSync(fullPath).isFile()) continue;
      const content = await readText(fullPath);
      db.prepare(`INSERT INTO indexed_files (file_path, file_name, folder, file_type, content, last_indexed_at)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(file_path) DO UPDATE SET content = excluded.content, last_indexed_at = excluded.last_indexed_at`).run(
        fullPath,
        entry,
        folderName,
        ext.slice(1),
        content.slice(0, 20000),
        new Date().toISOString()
      );
    }
  }
}

export function listIndexedFiles() {
  return db.prepare('SELECT id, file_name as fileName, folder, file_type as fileType, last_indexed_at as lastIndexedAt FROM indexed_files ORDER BY folder, file_name').all();
}

export function findRelevantFileChunks(query: string, persona: string): string {
  const preferred = persona === 'writer' ? 'writing' : persona === 'nerd' ? 'tech' : undefined;
  const rows = preferred
    ? db.prepare('SELECT file_name, content FROM indexed_files WHERE folder = ?').all(preferred)
    : db.prepare('SELECT file_name, content FROM indexed_files').all();

  const words = query.toLowerCase().split(/\W+/).filter(Boolean);
  const scored = (rows as Array<{ file_name: string; content: string }>).map((r) => {
    const text = r.content.toLowerCase();
    const score = words.reduce((acc, w) => acc + (text.includes(w) ? 1 : 0), 0);
    return { ...r, score };
  }).sort((a, b) => b.score - a.score).slice(0, 2);

  return scored.filter((r) => r.score > 0).map((r) => `File ${r.file_name}: ${r.content.slice(0, 800)}`).join('\n');
}
