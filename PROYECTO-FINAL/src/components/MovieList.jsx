import { memo } from 'react'

// Componente de presentación memoizado: si Home/Favoritos se
// re-renderizan por un cambio que no afecta a `movies` (por ejemplo,
// un estado de error o de carga en otro lado de la pantalla), React
// se salta el re-render de toda la lista porque la prop `movies` sigue
// siendo la misma referencia.
function MovieList({ movies, emptyMessage = 'No hay películas para mostrar.' }) {
  if (movies.length === 0) {
    return <p className="status">{emptyMessage}</p>
  }

  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <li key={movie.id}>
          <strong>{movie.title}</strong> ({movie.release_date?.slice(0, 4)}) — ⭐ {movie.vote_average}
        </li>
      ))}
    </ul>
  )
}

export default memo(MovieList)
