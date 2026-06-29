import { useMemo, useState } from 'react'
import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom'
import './App.css'

const initialUsers = [
  { id: 1, username: 'admin', password: '123456', name: 'Admin Demo' },
  { id: 2, username: 'maria', password: 'pass123', name: 'María López' },
]

const initialTweets = [
  { id: 1, author: 'María López', handle: '@maria', content: 'Hola mundo desde el clon de Twitter.' },
  { id: 2, author: 'Admin Demo', handle: '@admin', content: 'La autenticación ya está activa.' },
]

function AuthPage({ onLogin, onRegister, mode, setMode }) {
  const [form, setForm] = useState({ username: '', password: '', name: '' })
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (mode === 'login') {
      const user = initialUsers.find(
        (item) => item.username === form.username && item.password === form.password,
      )

      if (user) {
        onLogin(user)
        setMessage('Inicio de sesión correcto')
      } else {
        setMessage('Credenciales incorrectas')
      }
      return
    }

    if (!form.name.trim() || !form.username.trim() || !form.password.trim()) {
      setMessage('Completa todos los campos')
      return
    }

    const exists = initialUsers.some((user) => user.username === form.username)
    if (exists) {
      setMessage('Ese usuario ya existe')
      return
    }

    const newUser = {
      id: Date.now(),
      username: form.username,
      password: form.password,
      name: form.name,
    }

    initialUsers.push(newUser)
    onRegister(newUser)
    setMessage('Registro correcto')
  }

  return (
    <section className="auth-card">
      <h1>{mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}</h1>
      <p>Accede a tu espacio seguro en el clon de Twitter.</p>
      <form onSubmit={handleSubmit} className="auth-form">
        {mode === 'register' && (
          <input
            placeholder="Nombre completo"
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          />
        )}
        <input
          placeholder="Usuario"
          value={form.username}
          onChange={(event) => setForm((current) => ({ ...current, username: event.target.value }))}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
        />
        <button type="submit">{mode === 'login' ? 'Entrar' : 'Registrarme'}</button>
      </form>

      <p className="switch-text">
        {mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
        <button type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
          {mode === 'login' ? 'Regístrate' : 'Inicia sesión'}
        </button>
      </p>
      {message && <p className="feedback">{message}</p>}
    </section>
  )
}

function ProtectedRoute({ children, user }) {
  if (!user) {
    return <Navigate to="/auth" replace />
  }

  return children
}

function HomePage({ user, tweets, onPost }) {
  const [draft, setDraft] = useState('')

  const handlePublish = (event) => {
    event.preventDefault()
    if (!draft.trim()) return

    onPost({
      id: Date.now(),
      author: user.name,
      handle: `@${user.username}`,
      content: draft.trim(),
    })
    setDraft('')
  }

  return (
    <section className="feed-card">
      <h2>Hola, {user.name}</h2>
      <form onSubmit={handlePublish} className="tweet-form">
        <textarea
          placeholder="¿Qué estás pensando?"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
        <button type="submit">Publicar</button>
      </form>

      <div className="feed-list">
        {tweets.map((tweet) => (
          <article key={tweet.id} className="tweet-card">
            <h3>{tweet.author}</h3>
            <p>{tweet.handle}</p>
            <p>{tweet.content}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function App() {
  const [user, setUser] = useState(null)
  const [mode, setMode] = useState('login')
  const [tweets, setTweets] = useState(initialTweets)

  const loggedInUser = useMemo(() => user, [user])

  const handleLogin = (loggedUser) => {
    setUser(loggedUser)
  }

  const handleRegister = (newUser) => {
    setUser(newUser)
  }

  const handlePost = (newTweet) => {
    setTweets((current) => [newTweet, ...current])
  }

  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="topbar">
          <div className="brand">TwitClone</div>
          <nav className="nav-links">
            {user ? (
              <>
                <NavLink to="/home">Inicio</NavLink>
                <button type="button" className="link-button" onClick={() => setUser(null)}>
                  Cerrar sesión
                </button>
              </>
            ) : (
              <NavLink to="/auth">Entrar</NavLink>
            )}
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Navigate to={user ? '/home' : '/auth'} replace />} />
          <Route
            path="/auth"
            element={
              <AuthPage
                onLogin={handleLogin}
                onRegister={handleRegister}
                mode={mode}
                setMode={setMode}
              />
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute user={loggedInUser}>
                <HomePage user={loggedInUser} tweets={tweets} onPost={handlePost} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
