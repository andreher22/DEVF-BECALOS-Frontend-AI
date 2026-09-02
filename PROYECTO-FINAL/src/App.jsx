import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'
import Favoritos from './pages/Favoritos'
import Home from './pages/Home'
import Login from './pages/Login'

function App() {
  const { isAuthenticated, username, logout } = useAuth()

  return (
    <>
      <nav className="navbar">
        <Link to="/">Inicio</Link>
        <Link to="/favoritos">Favoritos</Link>
        {isAuthenticated ? (
          <span className="nav-user">
            {username} · <button type="button" onClick={logout}>Cerrar sesión</button>
          </span>
        ) : (
          <Link to="/login">Iniciar sesión</Link>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/favoritos"
          element={
            <ProtectedRoute>
              <Favoritos />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
