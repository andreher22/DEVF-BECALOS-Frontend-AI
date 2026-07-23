import { Bot, User } from "lucide-react";
import { stripThinking } from "../utils/stripThinking";

export default function MessageBubble({ sender, text, isStreaming }) {
  const isUser = sender === "user";
  const visibleText = isUser ? text : stripThinking(text);
  const isThinking = !isUser && isStreaming && visibleText === "";

  return (
    <div className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          isUser ? "bg-blue-600" : "bg-gray-700"
        }`}
      >
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>
      <div
        className={`max-w-[75%] whitespace-pre-wrap rounded-2xl px-4 py-2 text-sm leading-relaxed ${
          isUser ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-100"
        }`}
      >
        {isThinking ? (
          <span className="italic text-gray-400">Pensando…</span>
        ) : (
          visibleText
        )}
      </div>
    </div>
  );
}
