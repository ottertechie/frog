/** Memory service for the 3-layer memory model required by Frog. */
import { db } from '../db/database.js';
import type { ChatMessage, PersonaId } from '../types/index.js';

function summarize(messages: ChatMessage[]): string {
  // Lightweight deterministic summary for MVP.
  return messages.slice(-8).map((m) => `${m.role}: ${m.content}`).join(' | ').slice(0, 1200);
}

export function getPersonaSummary(persona: PersonaId): string {
  const row = db.prepare('SELECT summary FROM persona_memory WHERE persona = ?').get(persona) as { summary: string } | undefined;
  return row?.summary ?? '';
}

export function getSharedSummaries(targetPersona: PersonaId): string {
  const rows = db.prepare('SELECT source_persona, summary FROM shared_summaries WHERE target_persona = ?').all(targetPersona) as Array<{ source_persona: string; summary: string }>;
  return rows.map((r) => `[${r.source_persona}] ${r.summary}`).join('\n');
}

export function saveConversationMemory(persona: PersonaId, messages: ChatMessage[]): void {
  const summary = summarize(messages);
  const now = new Date().toISOString();
  db.prepare(`INSERT INTO persona_memory (persona, summary, updated_at) VALUES (?, ?, ?)
    ON CONFLICT(persona) DO UPDATE SET summary = excluded.summary, updated_at = excluded.updated_at`).run(persona, summary, now);

  for (const target of ['friend', 'writer', 'nerd', 'ceo'] as PersonaId[]) {
    if (target === persona) continue;
    const filtered = summary.slice(0, 350);
    db.prepare(`INSERT INTO shared_summaries (source_persona, target_persona, summary, updated_at) VALUES (?, ?, ?, ?)
      ON CONFLICT(source_persona, target_persona) DO UPDATE SET summary = excluded.summary, updated_at = excluded.updated_at`).run(persona, target, filtered, now);
  }
}
