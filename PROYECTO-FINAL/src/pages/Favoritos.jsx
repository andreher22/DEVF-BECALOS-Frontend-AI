import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

function Favoritos() {
  const { token, username } = useAuth()
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/favorites', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('No se pudieron cargar los favoritos')
        return res.json()
      })
      .then((data) => setMovies(data.results ?? []))
      .catch((err) => setError(err.message))
  }, [token])

  return (
    <section className="page">
      <h1>⭐ Mis favoritos</h1>
      <p className="status">
        Vista protegida: solo visible para <strong>{username}</strong>,
        cargada desde <code>GET /api/favorites</code> (requiere JWT).
      </p>

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
