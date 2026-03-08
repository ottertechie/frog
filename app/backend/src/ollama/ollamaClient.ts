import type { ChatMessage } from '../types/index.js';

const BASE_URL = process.env.OLLAMA_BASE_URL ?? 'http://127.0.0.1:11434';

export async function listModels(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/api/tags`);
  if (!res.ok) return [];
  const data = await res.json() as { models?: Array<{ name: string }> };
  return (data.models ?? []).map((m) => m.name);
}

export async function streamChat(model: string, messages: ChatMessage[]): Promise<ReadableStream<Uint8Array>> {
  const res = await fetch(`${BASE_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, messages, stream: true })
  });
  if (!res.ok || !res.body) throw new Error('Ollama chat failed');
  return res.body;
}
