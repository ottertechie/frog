import path from 'node:path';

export const ROOT = path.resolve(process.cwd(), '..', '..');
export const DATA_DIR = path.join(ROOT, 'data');
export const DB_PATH = path.join(DATA_DIR, 'frog.db');
export const FILES_DIR = path.join(ROOT, 'files');
export const WRITING_DIR = path.join(FILES_DIR, 'writing');
export const TECH_DIR = path.join(FILES_DIR, 'tech');
export const PERSONAS_CONFIG_PATH = path.join(ROOT, 'config', 'personas.json');
