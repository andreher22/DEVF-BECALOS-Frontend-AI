import { popularMovies } from '../_lib/data.js'

const TMDB_API_KEY = process.env.TMDB_API_KEY
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ message: 'Método no permitido' })
  }

  if (!TMDB_API_KEY) {
    return res.status(200).json({ source: 'mock', results: popularMovies })
  }

  try {
    const tmdbResponse = await fetch(
      `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=es-MX`
    )

    if (!tmdbResponse.ok) {
      throw new Error(`TMDb respondió con status ${tmdbResponse.status}`)
    }

    const data = await tmdbResponse.json()
    return res.status(200).json({ source: 'tmdb', results: data.results })
  } catch (error) {
    console.error('Error consultando TMDb:', error.message)
    return res.status(502).json({
      source: 'mock',
      results: popularMovies,
      warning: 'No se pudo conectar con TMDb, se muestran datos de ejemplo',
    })
  }
}
