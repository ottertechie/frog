import type { ChatMessage, PersonaId } from '../types/index.js';
import { getPersona } from '../personas/personaService.js';
import { getPersonaSummary, getSharedSummaries } from '../memory/memoryService.js';
import { findRelevantFileChunks } from '../files/fileIndexer.js';

export function buildPromptContext(persona: PersonaId, userInput: string): ChatMessage {
  const p = getPersona(persona);
  const privateSummary = getPersonaSummary(persona);
  const shared = getSharedSummaries(persona);
  const files = findRelevantFileChunks(userInput, persona);

  return {
    role: 'system',
    content: [
      `You are ${p.name}. Tone: ${p.tone}. Purpose: ${p.purpose}.`,
      'The user name is PJ. Always refer to the user as PJ when needed.',
      `Private persona memory: ${privateSummary || 'None yet.'}`,
      `Filtered shared summaries: ${shared || 'None yet.'}`,
      `Relevant file snippets: ${files || 'No relevant files found.'}`
    ].join('\n')
  };
}
