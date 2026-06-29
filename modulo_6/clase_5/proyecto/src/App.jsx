import { useMemo, useState } from 'react'
import './App.css'

function Header() {
  return (
    <div className="game__header">
      <p className="eyebrow">Juego interactivo</p>
      <h1>Adivina el número</h1>
      <p>Ingresa un número entre 1 y 100 y recibe una pista.</p>
    </div>
  )
}

function GuessForm({ value, onChange, onSubmit }) {
  return (
    <form className="guess-form" onSubmit={onSubmit}>
      <input
        type="number"
        min="1"
        max="100"
        placeholder="Tu intento"
        value={value}
        onChange={onChange}
      />
      <button type="submit">Probar</button>
    </form>
  )
}

function Feedback({ message, isSuccess }) {
  return (
    <div className={`feedback ${isSuccess ? 'feedback--success' : 'feedback--info'}`}>
      {message}
    </div>
  )
}

function App() {
  const [targetNumber] = useState(() => Math.floor(Math.random() * 100) + 1)
  const [guess, setGuess] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const hint = useMemo(() => {
    if (attempts === 0) return 'Comienza ingresando un número.'
    if (attempts < 3) return 'Vas bien, sigue intentando.'
    return 'Estás cerca, prueba con otro valor.'
  }, [attempts])

  const handleSubmit = (event) => {
    event.preventDefault()

    const parsedGuess = Number(guess)

    if (!Number.isInteger(parsedGuess) || parsedGuess < 1 || parsedGuess > 100) {
      setMessage('Debes ingresar un número válido entre 1 y 100.')
      setIsSuccess(false)
      return
    }

    setAttempts((prev) => prev + 1)

    if (parsedGuess === targetNumber) {
      setMessage(`¡Correcto! El número era ${targetNumber}.`)
      setIsSuccess(true)
      return
    }

    if (parsedGuess < targetNumber) {
      setMessage('El número es mayor. Prueba otra vez.')
    } else {
      setMessage('El número es menor. Prueba otra vez.')
    }

    setIsSuccess(false)
    setGuess('')
  }

  return (
    <main className="app-shell">
      <section className="game-card">
        <Header />

        <GuessForm
          value={guess}
          onChange={(event) => setGuess(event.target.value)}
          onSubmit={handleSubmit}
        />

        <div className="status-row">
          <span>Intentos: {attempts}</span>
          <span>Pista: {hint}</span>
        </div>

        {message ? <Feedback message={message} isSuccess={isSuccess} /> : null}
      </section>
    </main>
  )
}

export default App
