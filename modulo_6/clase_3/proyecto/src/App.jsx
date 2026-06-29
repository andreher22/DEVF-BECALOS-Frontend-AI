import { useEffect, useMemo, useState } from 'react'
import './App.css'

const initialTasks = [
  { id: 1, title: 'Repasar React', hours: 1.5 },
  { id: 2, title: 'Ejercicios de CSS', hours: 0.75 },
]

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  const totalHours = useMemo(() => {
    return tasks.reduce((sum, task) => sum + task.hours, 0)
  }, [tasks])

  return (
    <main className="app-shell">
      <section className="task-card">
        <div className="task-card__header">
          <p className="eyebrow">Hooks de React</p>
          <h1>Contador de tareas</h1>
          <p className="clock">{time.toLocaleTimeString()}</p>
        </div>

        <div className="summary">
          <span>Horas totales</span>
          <strong>{totalHours.toFixed(2)} h</strong>
        </div>

        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id}>
              <div>
                <h2>{task.title}</h2>
                <p>{task.hours} horas</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App
