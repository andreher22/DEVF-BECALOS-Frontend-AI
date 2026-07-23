import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const GlobalContext = createContext(undefined);

const HISTORY_KEY = "devfseek-history";

function loadHistory() {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function initState() {
  return { history: loadHistory(), currentChat: [] };
}

function globalReducer(state, action) {
  switch (action.type) {
    // agrega un mensaje nuevo (usuario o bot) al chat actual
    case "chat/push": {
      const message = { id: crypto.randomUUID(), ...action.payload };
      return { ...state, currentChat: [...state.currentChat, message] };
    }

    // reemplaza el texto del último mensaje del chat actual (usado durante el streaming)
    case "chat/update-last": {
      if (state.currentChat.length === 0) return state;
      const lastIndex = state.currentChat.length - 1;
      const updated = [...state.currentChat];
      updated[lastIndex] = { ...updated[lastIndex], text: action.payload };
      return { ...state, currentChat: updated };
    }

    // quita el placeholder del bot si la consulta falló antes de recibir texto
    case "chat/remove-empty-bot": {
      const last = state.currentChat[state.currentChat.length - 1];
      if (!last || last.sender !== "bot" || last.text !== "") return state;
      return { ...state, currentChat: state.currentChat.slice(0, -1) };
    }

    // vacía el chat actual sin guardarlo en el historial
    case "chat/clear": {
      return { ...state, currentChat: [] };
    }

    // guarda el chat actual como una entrada nueva del historial y lo limpia
    case "history/save": {
      if (state.currentChat.length === 0) return state;
      const entry = {
        id: crypto.randomUUID(),
        title: state.currentChat[0].text.slice(0, 40),
        messages: state.currentChat,
        createdAt: Date.now(),
      };
      return { ...state, history: [entry, ...state.history], currentChat: [] };
    }

    // carga una conversación guardada como el chat actual
    case "history/select": {
      const entry = state.history.find((item) => item.id === action.payload);
      if (!entry) return state;
      return { ...state, currentChat: entry.messages };
    }

    // elimina una entrada del historial
    case "history/delete": {
      return {
        ...state,
        history: state.history.filter((item) => item.id !== action.payload),
      };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(globalReducer, undefined, initState);

  // Persistimos el historial fuera del reducer para mantenerlo puro (sin I/O).
  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(state.history));
  }, [state.history]);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export function useGlobal() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobal debe usarse dentro de un GlobalProvider");
  }
  return context;
}
