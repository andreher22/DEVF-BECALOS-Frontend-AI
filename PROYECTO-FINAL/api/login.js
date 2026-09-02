import jwt from 'jsonwebtoken'
import { JWT_SECRET } from './_lib/auth.js'
import { loginSchema } from './_lib/loginSchema.js'

const DEMO_USER = process.env.DEMO_USER || 'demo'
const DEMO_PASSWORD = process.env.DEMO_PASSWORD || 'demo1234'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Método no permitido' })
  }

  const parsed = loginSchema.safeParse(req.body)

  if (!parsed.success) {
    return res.status(400).json({
      message: 'Datos de inicio de sesión inválidos',
      errors: parsed.error.flatten().fieldErrors,
    })
  }

  const { username, password } = parsed.data

  if (username !== DEMO_USER || password !== DEMO_PASSWORD) {
    return res.status(401).json({ message: 'Usuario o contraseña incorrectos' })
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' })
  return res.status(200).json({ token, username })
}
