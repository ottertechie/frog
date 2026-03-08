export type PersonaId = 'friend' | 'writer' | 'nerd' | 'ceo';

export interface PersonaConfig {
  id: PersonaId;
  name: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt?: string;
}

export interface IndexedFile {
  id: number;
  fileName: string;
  folder: 'writing' | 'tech';
  fileType: string;
  lastIndexedAt: string;
}
