import { AlertTriangle, Clapperboard, RefreshCw, Search } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import MovieList from '../components/MovieList'
import { apiFetch } from '../lib/api'

function Home() {
  const [movies, setMovies] = useState([])
  const [source, setSource] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('popularity')

  // useCallback: la misma función se usa en el useEffect de carga
  // inicial y como acción del botón "Reintentar"; sin memoizarla se
  // recrearía en cada render y dispararía el efecto de nuevo por nada.
  const loadPopular = useCallback(() => {
    setIsLoading(true)
    setError(null)
    apiFetch('/api/movies/popular')
      .then((data) => {
        setMovies(data.results ?? [])
        setSource(data.source)
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    loadPopular()
  }, [loadPopular])

  // useMemo: filtrar y ordenar es el cálculo más costoso de esta
  // vista. Se recalcula solo cuando cambian movies/query/sortBy, no en
  // cada render de Home (p. ej. mientras cambia isLoading o error).
  const visibleMovies = useMemo(() => {
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(query.trim().toLowerCase())
    )

    if (sortBy === 'rating') {
      return [...filtered].sort((a, b) => b.vote_average - a.vote_average)
    }

    if (sortBy === 'title') {
      return [...filtered].sort((a, b) => a.title.localeCompare(b.title))
    }

    return filtered
  }, [movies, query, sortBy])

  return (
    <section className="page">
      <header className="page-header">
        <span className="page-eyebrow">
          <Clapperboard size={14} />
          Populares
        </span>
        <h1>Explora películas y series</h1>
        <p className="subtitle">
          Datos desde <code>GET /api/movies/popular</code>
          {source && ` · origen: ${source}`}
        </p>
      </header>

      <div className="filters">
        <label className="search-field">
          <Search size={16} />
          <input
            type="search"
            placeholder="Buscar por título…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="popularity">Orden original</option>
          <option value="rating">Mejor calificadas</option>
          <option value="title">Título (A-Z)</option>
        </select>
      </div>

      {isLoading && (
        <div className="status-row">
          <span className="spinner" />
          Cargando películas…
        </div>
      )}

      {error && (
        <div className="alert">
          <AlertTriangle size={18} />
          <div>
            <p>{error}</p>
            <div className="alert-actions">
              <button type="button" className="btn-retry" onClick={loadPopular}>
                <RefreshCw size={13} />
                Reintentar
              </button>
            </div>
          </div>
        </div>
      )}

      {!isLoading && !error && (
        <MovieList
          movies={visibleMovies}
          emptyMessage="No se encontraron películas con ese título."
        />
      )}
    </section>
  )
}

export default Home
