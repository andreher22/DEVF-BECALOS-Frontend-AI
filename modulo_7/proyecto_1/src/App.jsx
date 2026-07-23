import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import Sidebar from "./components/Sidebar";
import ChatMessages from "./components/ChatMessages";
import ChatForm from "./components/ChatForm";
import { getBotReply } from "./data/botReplies";

const STORAGE_KEY = "devfseek-conversations";

function createConversation() {
  return {
    id: crypto.randomUUID(),
    title: "Nueva conversación",
    messages: [],
  };
}

function loadConversations() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : null;
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch {
    // datos corruptos o localStorage no disponible: se ignora y se parte de cero
  }
  return [createConversation()];
}

export default function App() {
  const [conversations, setConversations] = useState(loadConversations);
  const [currentId, setCurrentId] = useState(() => conversations[0].id);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  }, [conversations]);

  const currentConversation =
    conversations.find((conv) => conv.id === currentId) ?? conversations[0];

  const updateConversation = (id, updater) => {
    setConversations((prev) =>
      prev.map((conv) => (conv.id === id ? updater(conv) : conv)),
    );
  };

  const handleNewChat = () => {
    const conv = createConversation();
    setConversations((prev) => [conv, ...prev]);
    setCurrentId(conv.id);
  };

  const handleDeleteConversation = (id) => {
    setConversations((prev) => {
      const rest = prev.filter((conv) => conv.id !== id);
      const next = rest.length > 0 ? rest : [createConversation()];
      if (id === currentId) setCurrentId(next[0].id);
      return next;
    });
  };

  const handleClearChat = () => {
    updateConversation(currentId, (conv) => ({ ...conv, messages: [] }));
  };

  const handleSend = (text) => {
    if (!text) return;
    const activeId = currentId;
    const userMessage = { id: crypto.randomUUID(), sender: "user", text };

    updateConversation(activeId, (conv) => ({
      ...conv,
      title: conv.messages.length === 0 ? text.slice(0, 30) : conv.title,
      messages: [...conv.messages, userMessage],
    }));

    setIsTyping(true);
    setTimeout(() => {
      const botMessage = {
        id: crypto.randomUUID(),
        sender: "bot",
        text: getBotReply(),
      };
      updateConversation(activeId, (conv) => ({
        ...conv,
        messages: [...conv.messages, botMessage],
      }));
      setIsTyping(false);
    }, 700 + Math.random() * 600);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-900 text-gray-100">
      <Sidebar
        conversations={conversations}
        currentId={currentConversation.id}
        onSelect={setCurrentId}
        onNewChat={handleNewChat}
        onDeleteConversation={handleDeleteConversation}
      />

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
          <h1 className="truncate text-sm font-medium text-gray-200">
            {currentConversation.title}
          </h1>
          <button
            type="button"
            onClick={handleClearChat}
            disabled={currentConversation.messages.length === 0}
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs text-gray-400 transition hover:bg-gray-800 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Trash2 size={14} />
            Limpiar chat
          </button>
        </header>

        <ChatMessages
          messages={currentConversation.messages}
          isTyping={isTyping}
        />

        <ChatForm onSend={handleSend} disabled={isTyping} />
      </div>
    </div>
  );
}
