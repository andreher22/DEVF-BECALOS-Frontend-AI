import { useEffect } from "react";
import History from "./components/History";
import ChatMessages from "./components/ChatMessages";
import ChatForm from "./components/ChatForm";
import { useGlobal } from "./context/GlobalContext";
import useOllama from "./api/useOllama";

export default function App() {
  const { state, dispatch } = useGlobal();
  const ollama = useOllama();

  // Cancela cualquier stream en curso al desmontar la app.
  // `ollama.cancel` es estable (useCallback con deps []); si dependiéramos
  // del objeto `ollama` completo, se recrea cada render y abortaría el
  // fetch en marcha antes de que pudiera completarse.
  useEffect(() => () => ollama.cancel(), [ollama.cancel]);

  // Cada chunk de streaming reemplaza el texto del último mensaje (del bot)
  useEffect(() => {
    if (!ollama.response) return;
    dispatch({ type: "chat/update-last", payload: ollama.response });
  }, [ollama.response, dispatch]);

  // Si la consulta falla antes de recibir texto, quita la burbuja vacía del bot
  useEffect(() => {
    if (!ollama.error) return;
    dispatch({ type: "chat/remove-empty-bot" });
  }, [ollama.error, dispatch]);

  const handleSend = (text) => {
    dispatch({ type: "chat/push", payload: { sender: "user", text } });
    dispatch({ type: "chat/push", payload: { sender: "bot", text: "" } });
    ollama.ask(text);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-900 text-gray-100">
      <History />

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
          <h1 className="text-sm font-medium text-gray-200">DevfSeek</h1>
          <span className="text-xs text-gray-500">deepseek-r1:1.5b · Ollama</span>
        </header>

        {ollama.error && (
          <div className="border-b border-red-900/50 bg-red-950/50 px-4 py-2 text-xs text-red-300">
            {ollama.error}
          </div>
        )}

        <ChatMessages messages={state.currentChat} isLoading={ollama.loading} />

        <ChatForm onSend={handleSend} disabled={ollama.loading} />
      </div>
    </div>
  );
}
