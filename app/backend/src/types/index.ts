export type PersonaId = 'friend' | 'writer' | 'nerd' | 'ceo';
export type ChatRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  role: ChatRole;
  content: string;
}
