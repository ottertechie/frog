import fs from 'node:fs';
import type { PersonaId } from '../types/index.js';
import { PERSONAS_CONFIG_PATH } from '../utils/paths.js';

export interface PersonaDefinition {
  id: PersonaId;
  name: string;
  tone: string;
  purpose: string;
  memoryPreference: string;
  filePreference: Array<'writing' | 'tech'>;
}

export function getPersonas(): PersonaDefinition[] {
  return JSON.parse(fs.readFileSync(PERSONAS_CONFIG_PATH, 'utf-8'));
}

export function getPersona(id: PersonaId): PersonaDefinition {
  return getPersonas().find((p) => p.id === id) ?? getPersonas()[0];
}
