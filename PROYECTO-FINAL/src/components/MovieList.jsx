import { Clapperboard, Star } from 'lucide-react'
import { memo } from 'react'

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w342'

function MovieCard({ movie }) {
  const year = movie.release_date?.slice(0, 4)

  return (
    <li className="movie-card">
      {movie.poster_path ? (
        <img
          className="movie-poster"
          src={`${TMDB_IMAGE_BASE}${movie.poster_path}`}
          alt={`Póster de ${movie.title}`}
          loading="lazy"
        />
      ) : (
        <div className="poster-placeholder">
          <Clapperboard size={32} />
        </div>
      )}

      <div className="movie-body">
        <span className="movie-title">{movie.title}</span>
        <div className="movie-meta">
          <span>{year || 'Sin fecha'}</span>
          <span className="badge-rating">
            <Star size={13} />
            {movie.vote_average}
          </span>
        </div>
      </div>
    </li>
  )
}

// Componente de presentación memoizado: si Home/Favoritos se
// re-renderizan por un cambio que no afecta a `movies` (por ejemplo,
// un estado de error o de carga en otro lado de la pantalla), React
// se salta el re-render de toda la lista porque la prop `movies` sigue
// siendo la misma referencia.
function MovieList({ movies, emptyMessage = 'No hay películas para mostrar.' }) {
  if (movies.length === 0) {
    return (
      <div className="empty-state">
        <Clapperboard size={28} />
        <p>{emptyMessage}</p>
      </div>
    )
  }

  return (
    <ul className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </ul>
  )
}

export default memo(MovieList)
