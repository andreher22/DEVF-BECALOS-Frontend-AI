import jwt from 'jsonwebtoken'

export const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-cambia-esto-en-produccion'

export function getBearerToken(req) {
  const authHeader = req.headers.authorization || ''
  const [scheme, token] = authHeader.split(' ')
  if (scheme !== 'Bearer' || !token) return null
  return token
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET)
}
