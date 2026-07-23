import StatCard from "./StatCard";

const CARDS = [
  { id: "welcome", title: "Bienvenida" },
  { id: "visits", title: "Visitas hoy", value: "128" },
  { id: "tasks", title: "Tareas pendientes", value: "5" },
];

// No recibe ni conoce theme/user: solo organiza las tarjetas.
export default function StatsSection() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {CARDS.map((card) => (
        <StatCard key={card.id} card={card} />
      ))}
    </div>
  );
}
