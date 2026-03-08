/**
 * Frog main page.
 * Coordinates all UI widgets and calls backend APIs.
 */
import { useEffect, useMemo, useState } from 'react';
import { AnimatedFace } from '../components/AnimatedFace';
import { ChatWindow } from '../components/ChatWindow';
import { FilePanel } from '../components/FilePanel';
import { StatusDisplay } from '../components/StatusDisplay';
import type { ChatMessage, IndexedFile, PersonaConfig, PersonaId } from '../utils/types';

const defaultPersonas: PersonaConfig[] = [
  { id: 'friend', name: 'Friend', description: 'Sarcastic but thoughtful daily assistant' },
  { id: 'writer', name: 'Writer', description: 'Writing partner and editor' },
  { id: 'nerd', name: 'Nerd', description: 'Technical and coding helper' },
  { id: 'ceo', name: 'CEO', description: 'Business strategy advisor' }
];

export function App() {
  const [personas, setPersonas] = useState(defaultPersonas);
  const [persona, setPersona] = useState<PersonaId>('friend');
  const [models, setModels] = useState<string[]>([]);
  const [model, setModel] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('Sleeping');
  const [files, setFiles] = useState<IndexedFile[]>([]);

  const faceState = useMemo(() => {
    if (status.includes('Error') || status.includes('offline')) return 'error';
    if (status.includes('Thinking')) return 'thinking';
    if (status.includes('Responding')) return 'responding';
    if (status.includes('Ready')) return 'attentive';
    return 'idle';
  }, [status]) as 'idle' | 'attentive' | 'thinking' | 'responding' | 'error';

  async function bootstrap() {
    setStatus('Loading models');
    const [personaRes, modelRes, fileRes] = await Promise.all([
      fetch('/api/personas'),
      fetch('/api/models'),
      fetch('/api/files')
    ]);

    if (personaRes.ok) setPersonas((await personaRes.json()).personas);
    if (modelRes.ok) {
      const loadedModels = (await modelRes.json()).models as string[];
      setModels(loadedModels);
      setModel(loadedModels[0] || '');
      if (loadedModels.length === 0) setStatus('Ollama offline or no models found');
    }
    if (fileRes.ok) setFiles((await fileRes.json()).files);
    setStatus('Ready');
  }

  useEffect(() => {
    bootstrap().catch(() => setStatus('Error: startup failed'));
  }, []);

  async function onPersonaChange(nextPersona: PersonaId) {
    setStatus('Starting new conversation');
    await fetch('/api/conversation/switch-persona', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fromPersona: persona, toPersona: nextPersona, messages })
    });
    setPersona(nextPersona);
    setMessages([]);
    setStatus('Ready');
  }

  async function onNewConversation() {
    setStatus('Starting new conversation');
    await fetch('/api/conversation/new', { method: 'POST' });
    setMessages([]);
    setStatus('Ready');
  }

  async function sendMessage() {
    if (!input.trim()) return;
    if (!model) {
      setStatus('Error: no model selected');
      return;
    }

    const nextMessages = [...messages, { role: 'user', content: input } as ChatMessage];
    setMessages(nextMessages);
    setInput('');
    setStatus('Thinking');

    const response = await fetch('/api/chat/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ persona, model, messages: nextMessages })
    });

    if (!response.ok || !response.body) {
      setStatus('Error: model response failure');
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let assistant = '';
    setMessages((m) => [...m, { role: 'assistant', content: '' }]);
    setStatus('Responding');

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const payload = line.slice(6);
        if (payload === '[DONE]') continue;
        assistant += payload;
        setMessages((m) => {
          const updated = [...m];
          updated[updated.length - 1] = { role: 'assistant', content: assistant };
          return updated;
        });
      }
    }

    setStatus('Saving memory');
    await fetch('/api/conversation/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ persona, messages: [...nextMessages, { role: 'assistant', content: assistant }] })
    });
    setStatus('Ready');
  }

  return (
    <main className="layout">
      <header>
        <h1>Frog</h1>
        <div className="controls">
          <select value={persona} onChange={(e) => void onPersonaChange(e.target.value as PersonaId)}>
            {personas.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <select value={model} onChange={(e) => setModel(e.target.value)}>
            {models.length === 0 ? <option value="">No models available</option> : models.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <button onClick={() => void onNewConversation()}>New Conversation</button>
        </div>
        <StatusDisplay status={status} />
      </header>
      <AnimatedFace state={faceState} />
      <section className="main-content">
        <ChatWindow messages={messages} />
        <FilePanel files={files} />
      </section>
      <footer className="composer">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Talk to Frog..." />
        <button onClick={() => void sendMessage()}>Send</button>
      </footer>
    </main>
  );
}
