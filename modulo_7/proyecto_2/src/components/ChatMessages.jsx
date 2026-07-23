import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatMessages({ messages, isLoading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 px-4 text-center text-gray-400">
        <h2 className="text-xl font-semibold text-gray-200">
          ¿En qué puedo ayudarte hoy?
        </h2>
        <p className="max-w-sm text-sm">
          Escribe un mensaje para consultar al modelo DeepSeek-R1 vía Ollama.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        {messages.map((msg, index) => (
          <MessageBubble
            key={msg.id}
            sender={msg.sender}
            text={msg.text}
            isStreaming={isLoading && index === messages.length - 1}
          />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
