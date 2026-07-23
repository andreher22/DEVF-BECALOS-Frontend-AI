import Dashboard from "./Dashboard";

// Tampoco conoce theme/user: solo define el layout del área principal.
export default function MainContent() {
  return (
    <main className="flex-1 overflow-y-auto p-6">
      <Dashboard />
    </main>
  );
}
