import type { ChatMessage } from '../utils/types';

export function ChatWindow({ messages }: { messages: ChatMessage[] }) {
  return (
    <div className="chat-window">
      {messages.map((m, i) => (
        <div key={`${m.role}-${i}`} className={`msg ${m.role}`}>
          <strong>{m.role === 'user' ? 'PJ' : 'Frog'}:</strong>{' '}
          {/*
            Messages are rendered as plain text, and CSS `white-space: pre-wrap`
            keeps model/newline paragraph spacing readable without Markdown parsing.
          */}
          <span>{m.content}</span>
        </div>
      ))}
    </div>
  );
}
