/** Main API routes for Frog backend */
import { Router } from 'express';
import type { ChatMessage, PersonaId } from '../types/index.js';
import { getPersonas } from '../personas/personaService.js';
import { listModels, streamChat } from '../ollama/ollamaClient.js';
import { listIndexedFiles, scanAndIndexFiles } from '../files/fileIndexer.js';
import { buildPromptContext } from '../services/promptBuilder.js';
import { saveConversationMemory } from '../memory/memoryService.js';

export const api = Router();

api.get('/personas', (_req, res) => {
  res.json({ personas: getPersonas().map((p) => ({ id: p.id, name: p.name, description: p.purpose })) });
});

api.get('/models', async (_req, res) => {
  try {
    const models = await listModels();
    res.json({ models });
  } catch {
    res.status(200).json({ models: [] });
  }
});

api.get('/files', async (_req, res) => {
  await scanAndIndexFiles();
  res.json({ files: listIndexedFiles() });
});

api.post('/conversation/new', (_req, res) => res.json({ ok: true }));

api.post('/conversation/switch-persona', (req, res) => {
  const body = req.body as { fromPersona: PersonaId; messages: ChatMessage[] };
  if (body.messages?.length) saveConversationMemory(body.fromPersona, body.messages);
  res.json({ ok: true });
});

api.post('/conversation/save', (req, res) => {
  const body = req.body as { persona: PersonaId; messages: ChatMessage[] };
  saveConversationMemory(body.persona, body.messages);
  res.json({ ok: true });
});

api.post('/chat/stream', async (req, res) => {
  try {
    const body = req.body as { persona: PersonaId; model: string; messages: ChatMessage[] };
    const latestUserMessage = [...body.messages].reverse().find((m) => m.role === 'user')?.content ?? '';
    const systemMessage = buildPromptContext(body.persona, latestUserMessage);
    const stream = await streamChat(body.model, [systemMessage, ...body.messages]);

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');

    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const chunks = buffer.split('\n');
      buffer = chunks.pop() ?? '';
      for (const line of chunks) {
        if (!line.trim()) continue;
        const json = JSON.parse(line) as { message?: { content?: string }; done?: boolean };
        const token = json.message?.content ?? '';
        if (token) res.write(`data: ${token}\n\n`);
        if (json.done) res.write('data: [DONE]\n\n');
      }
    }
    res.end();
  } catch {
    res.status(500).json({ error: 'Failed to stream from model.' });
  }
});
