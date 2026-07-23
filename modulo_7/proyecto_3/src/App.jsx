import { ThemeProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";
import Layout from "./components/Layout";

// App solo compone los providers: no conoce theme ni user, y no pasa
// ningún prop hacia abajo. Cada componente que los necesita los obtiene
// directamente con useTheme()/useUser().
export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Layout />
      </UserProvider>
    </ThemeProvider>
  );
}
