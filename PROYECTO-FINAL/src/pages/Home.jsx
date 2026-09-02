import { useEffect, useState } from 'react'
import { apiFetch } from '../lib/api'

function Home() {
  const [movies, setMovies] = useState([])
  const [source, setSource] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    apiFetch('/api/movies/popular')
      .then((data) => {
        setMovies(data.results ?? [])
        setSource(data.source)
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <section className="page">
      <h1>🎬 CineExplorer</h1>
      <p>Explorador de películas y series — Proyecto Final BECALOS Frontend.</p>
      <p className="status">
        Populares desde <code>GET /api/movies/popular</code>.
        {source && ` Origen de los datos: ${source}.`}
      </p>

      {isLoading && <p className="status">Cargando películas…</p>}
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

export default Home
