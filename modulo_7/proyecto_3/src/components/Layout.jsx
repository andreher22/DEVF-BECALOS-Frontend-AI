import { useTheme } from "../context/ThemeContext";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

export default function Layout() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`flex h-screen w-screen flex-col ${
        isDark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}
