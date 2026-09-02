// Mismos datos de ejemplo que backend/data/*.mock.json, usados como
// fallback cuando no hay TMDB_API_KEY configurada en Vercel.
export const popularMovies = [
  {
    id: 101,
    title: 'El Viaje Infinito',
    overview: 'Un grupo de exploradores descubre una dimensión donde el tiempo no avanza.',
    release_date: '2024-03-14',
    vote_average: 8.1,
  },
  {
    id: 102,
    title: 'Sombras de la Ciudad',
    overview: 'Un detective debe resolver un caso que conecta con su propio pasado.',
    release_date: '2023-11-02',
    vote_average: 7.6,
  },
  {
    id: 103,
    title: 'Órbita Cero',
    overview: 'La tripulación de una estación espacial enfrenta una crisis que pone en duda quién dice la verdad.',
    release_date: '2025-01-20',
    vote_average: 8.4,
  },
  {
    id: 104,
    title: 'El Último Verano',
    overview: 'Cuatro amigos se reencuentran una década después para cumplir una promesa de juventud.',
    release_date: '2022-07-08',
    vote_average: 7.2,
  },
]

export const favoriteMovies = [
  { id: 103, title: 'Órbita Cero', release_date: '2025-01-20', vote_average: 8.4 },
  { id: 104, title: 'El Último Verano', release_date: '2022-07-08', vote_average: 7.2 },
]
