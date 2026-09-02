import { useEffect, useState } from 'react'

function Home() {
  const [movies, setMovies] = useState([])
  const [source, setSource] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/movies/popular')
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results ?? [])
        setSource(data.source)
      })
      .catch(() => setError('No se pudo conectar con el backend.'))
  }, [])

  return (
    <section className="page">
      <h1>🎬 CineExplorer</h1>
      <p>Explorador de películas y series — Proyecto Final BECALOS Frontend.</p>
      <p className="status">
        Populares desde <code>GET /api/movies/popular</code>.
        {source && ` Origen de los datos: ${source}.`}
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

export default Home
