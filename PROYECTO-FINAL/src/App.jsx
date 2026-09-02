import { Clapperboard, Home as HomeIcon, LogIn, LogOut, Star } from 'lucide-react'
import { NavLink, Route, Routes } from 'react-router-dom'
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
        <NavLink to="/" className="navbar-brand">
          <Clapperboard size={22} />
          CineExplorer
        </NavLink>

        <div className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            <HomeIcon size={16} />
            <span>Inicio</span>
          </NavLink>
          <NavLink
            to="/favoritos"
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            <Star size={16} />
            <span>Favoritos</span>
          </NavLink>
        </div>

        {isAuthenticated ? (
          <div className="nav-user">
            <span>
              Hola, <strong>{username}</strong>
            </span>
            <button type="button" className="icon-btn" onClick={logout}>
              <LogOut size={14} />
              Salir
            </button>
          </div>
        ) : (
          <NavLink to="/login" className="nav-link" style={{ marginLeft: 'auto' }}>
            <LogIn size={16} />
            <span>Iniciar sesión</span>
          </NavLink>
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
