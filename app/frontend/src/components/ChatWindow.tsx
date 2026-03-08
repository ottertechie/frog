import type { ChatMessage } from '../utils/types';

export function ChatWindow({ messages }: { messages: ChatMessage[] }) {
  return (
    <div className="chat-window">
      {messages.map((m, i) => (
        <div key={`${m.role}-${i}`} className={`msg ${m.role}`}>
          <strong>{m.role === 'user' ? 'PJ' : 'Frog'}:</strong> {m.content}
        </div>
      ))}
    </div>
  );
}
