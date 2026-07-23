import { useState } from "react";
import { LogIn, LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, login, logout } = useUser();
  const [name, setName] = useState("");
  const isDark = theme === "dark";

  const handleLogin = (event) => {
    event.preventDefault();
    if (!name.trim()) return;
    login(name.trim());
    setName("");
  };

  return (
    <header
      className={`flex items-center justify-between border-b px-6 py-3 ${
        isDark ? "border-gray-800 bg-gray-950 text-gray-100" : "border-gray-200 bg-gray-50 text-gray-900"
      }`}
    >
      <h1 className="text-sm font-semibold">useContext Demo</h1>

      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-2 text-sm">
            <span>Hola, {user.name}</span>
            <button
              type="button"
              onClick={logout}
              className={`flex items-center gap-1 rounded-lg px-2 py-1 text-xs ${
                isDark ? "hover:bg-gray-800" : "hover:bg-gray-200"
              }`}
            >
              <LogOut size={14} />
              Salir
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="flex items-center gap-2">
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Tu nombre"
              className={`rounded-lg border px-2 py-1 text-xs outline-none ${
                isDark
                  ? "border-gray-700 bg-gray-800 text-gray-100 placeholder-gray-500"
                  : "border-gray-300 bg-white text-gray-900 placeholder-gray-400"
              }`}
            />
            <button
              type="submit"
              className="flex items-center gap-1 rounded-lg bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-500"
            >
              <LogIn size={14} />
              Entrar
            </button>
          </form>
        )}

        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Cambiar tema"
          className={`rounded-full p-2 ${
            isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
}
