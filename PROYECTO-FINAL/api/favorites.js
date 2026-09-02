import { favoriteMovies } from './_lib/data.js'
import { getBearerToken, verifyToken } from './_lib/auth.js'

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ message: 'Método no permitido' })
  }

  const token = getBearerToken(req)

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' })
  }

  let payload
  try {
    payload = verifyToken(token)
  } catch {
    return res.status(401).json({ message: 'Token inválido o expirado' })
  }

  return res.status(200).json({ user: payload.username, results: favoriteMovies })
}
