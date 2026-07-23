import { useTheme } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";

// Componente hoja: a 4 niveles de profundidad respecto a App (Layout > MainContent >
// Dashboard > StatsSection > StatCard) y lee el tema y el usuario directo del
// contexto. Ningún componente intermedio conoce ni reenvía estos valores como props.
export default function StatCard({ card }) {
  const { theme } = useTheme();
  const { user } = useUser();
  const isDark = theme === "dark";

  return (
    <div
      className={`rounded-xl border p-4 ${
        isDark ? "border-gray-800 bg-gray-950" : "border-gray-200 bg-white"
      }`}
    >
      <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
        {card.title}
      </p>
      {card.id === "welcome" ? (
        <p className="mt-2 text-lg font-semibold">
          {user ? `¡Hola de nuevo, ${user.name}!` : "Inicia sesión para personalizar tu panel"}
        </p>
      ) : (
        <p className="mt-2 text-2xl font-bold">{card.value}</p>
      )}
    </div>
  );
}
