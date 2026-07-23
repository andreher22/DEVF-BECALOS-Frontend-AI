import { Plus, MessageSquare, Trash2 } from "lucide-react";
import { useGlobal } from "../context/GlobalContext";

export default function History() {
  const { state, dispatch } = useGlobal();

  const handleNewChat = () => {
    dispatch({ type: "history/save" });
  };

  const handleSelect = (id) => {
    dispatch({ type: "history/select", payload: id });
  };

  const handleDelete = (event, id) => {
    event.stopPropagation();
    dispatch({ type: "history/delete", payload: id });
  };

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-gray-800 bg-gray-950 text-gray-100">
      <div className="p-3">
        <button
          type="button"
          onClick={handleNewChat}
          className="flex w-full items-center gap-2 rounded-lg border border-gray-700 px-3 py-2 text-sm font-medium text-gray-200 transition hover:bg-gray-800"
        >
          <Plus size={16} />
          Nuevo chat
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-2">
        {state.history.length === 0 && (
          <p className="px-3 py-2 text-xs text-gray-500">
            Aún no tienes consultas guardadas
          </p>
        )}
        {state.history.map((entry) => (
          <div
            key={entry.id}
            onClick={() => handleSelect(entry.id)}
            className="group flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-300 transition hover:bg-gray-800/60"
          >
            <MessageSquare size={16} className="shrink-0 text-gray-400" />
            <span className="flex-1 truncate">{entry.title}</span>
            <button
              type="button"
              aria-label="Eliminar consulta"
              onClick={(event) => handleDelete(event, entry.id)}
              className="hidden shrink-0 text-gray-500 hover:text-red-400 group-hover:block"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </nav>

      <div className="border-t border-gray-800 p-3 text-xs text-gray-500">
        DevfSeek · Módulo 7 · Proyecto 2
      </div>
    </aside>
  );
}
