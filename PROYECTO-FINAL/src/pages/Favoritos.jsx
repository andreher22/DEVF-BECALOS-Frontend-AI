import { AlertTriangle, RefreshCw, Star } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MovieList from '../components/MovieList'
import { useAuth } from '../context/AuthContext'
import { ApiError, apiFetch } from '../lib/api'

function Favoritos() {
  const { token, username, logout } = useAuth()
  const navigate = useNavigate()
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // useCallback: se reutiliza en el useEffect inicial y en el botón
  // "Reintentar" sin recrear la función (y sin volver a disparar el
  // efecto) en cada render de Favoritos.
  const loadFavorites = useCallback(() => {
    setIsLoading(true)
    setError(null)
    apiFetch('/api/favorites', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((data) => setMovies(data.results ?? []))
      .catch((err) => {
        if (err instanceof ApiError && err.status === 401) {
          logout()
          navigate('/login', { replace: true })
          return
        }
        setError(err.message)
      })
      .finally(() => setIsLoading(false))
  }, [token, logout, navigate])

  useEffect(() => {
    loadFavorites()
  }, [loadFavorites])

  return (
    <section className="page">
      <header className="page-header">
        <span className="page-eyebrow">
          <Star size={14} />
          Vista protegida
        </span>
        <h1>Mis favoritos</h1>
        <p className="subtitle">
          Solo visible para <strong>{username}</strong> · desde{' '}
          <code>GET /api/favorites</code> (requiere JWT)
        </p>
      </header>

      {isLoading && (
        <div className="status-row">
          <span className="spinner" />
          Cargando favoritos…
        </div>
      )}

      {error && (
        <div className="alert">
          <AlertTriangle size={18} />
          <div>
            <p>{error}</p>
            <div className="alert-actions">
              <button type="button" className="btn-retry" onClick={loadFavorites}>
                <RefreshCw size={13} />
                Reintentar
              </button>
            </div>
          </div>
        </div>
      )}

      {!isLoading && !error && (
        <MovieList movies={movies} emptyMessage="Aún no tienes películas favoritas." />
      )}
    </section>
  )
}

export default Favoritos
