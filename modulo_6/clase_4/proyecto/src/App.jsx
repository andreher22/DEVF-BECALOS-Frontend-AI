import { useEffect, useMemo, useState } from 'react'
import './App.css'

const initialPlanets = ['Marte', 'Júpiter', 'Saturno']

function App() {
  const [distance, setDistance] = useState(1200)
  const [fuel, setFuel] = useState(80)
  const [status, setStatus] = useState('En órbita')
  const [visitedPlanets, setVisitedPlanets] = useState(initialPlanets)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDistance((prev) => prev + 10)
      setFuel((prev) => Math.max(prev - 2, 0))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (fuel <= 20) {
      setStatus('Combustible bajo')
    } else if (distance > 1500) {
      setStatus('Aproximándose a la siguiente órbita')
    } else {
      setStatus('En órbita')
    }
  }, [distance, fuel])

  const fuelStatus = useMemo(() => {
    return fuel > 50 ? 'Óptimo' : fuel > 20 ? 'Moderado' : 'Crítico'
  }, [fuel])

  return (
    <main className="app-shell">
      <section className="mission-card">
        <div className="mission-card__header">
          <p className="eyebrow">Ciclo de vida en React</p>
          <h1>Panel del explorador espacial</h1>
          <p>El componente se actualiza con cada cambio de distancia y combustible.</p>
        </div>

        <div className="stats-grid">
          <article>
            <span>Distancia</span>
            <strong>{distance} km</strong>
          </article>
          <article>
            <span>Combustible</span>
            <strong>{fuel}%</strong>
          </article>
          <article>
            <span>Estado</span>
            <strong>{status}</strong>
          </article>
        </div>

        <div className="summary">
          <span>Estado del combustible</span>
          <strong>{fuelStatus}</strong>
        </div>

        <div className="planets">
          <h2>Planetas visitados</h2>
          <ul>
            {visitedPlanets.map((planet) => (
              <li key={planet}>{planet}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default App
