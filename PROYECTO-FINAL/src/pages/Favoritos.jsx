import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ApiError, apiFetch } from '../lib/api'

function Favoritos() {
  const { token, username, logout } = useAuth()
  const navigate = useNavigate()
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
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

  return (
    <section className="page">
      <h1>⭐ Mis favoritos</h1>
      <p className="status">
        Vista protegida: solo visible para <strong>{username}</strong>,
        cargada desde <code>GET /api/favorites</code> (requiere JWT).
      </p>

      {isLoading && <p className="status">Cargando favoritos…</p>}
      {error && <p className="error">{error}</p>}

      <ul className="movie-list">
        {movies.map((movie) => (
          <li key={movie.id}>
            <strong>{movie.title}</strong> ({movie.release_date?.slice(0, 4)}) — ⭐ {movie.vote_average}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Favoritos
