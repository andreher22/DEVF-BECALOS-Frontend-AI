import { LayoutDashboard, Settings, Users } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Usuarios", icon: Users },
  { label: "Ajustes", icon: Settings },
];

export default function Sidebar() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <aside
      className={`flex w-56 shrink-0 flex-col border-r p-4 ${
        isDark ? "border-gray-800 bg-gray-950" : "border-gray-200 bg-gray-50"
      }`}
    >
      <nav className="space-y-1">
        {NAV_ITEMS.map(({ label, icon: Icon }) => (
          <div
            key={label}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
              isDark ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Icon size={16} />
            {label}
          </div>
        ))}
      </nav>
    </aside>
  );
}
