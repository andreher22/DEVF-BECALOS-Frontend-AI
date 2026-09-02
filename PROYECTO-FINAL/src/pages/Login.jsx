import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ApiError, apiFetch } from '../lib/api'
import { loginSchema } from '../schemas/loginSchema'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [formError, setFormError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const redirectTo = location.state?.from?.pathname ?? '/favoritos'

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFormError(null)

    const result = loginSchema.safeParse({ username, password })

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      setFieldErrors({
        username: errors.username?.[0],
        password: errors.password?.[0],
      })
      return
    }

    setFieldErrors({})
    setIsSubmitting(true)

    try {
      const data = await apiFetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      })
      login(data.token, data.username)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setFormError(
        err instanceof ApiError
          ? err.message
          : 'No se pudo iniciar sesión. Inténtalo de nuevo.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="page">
      <h1>Iniciar sesión</h1>
      <p className="status">
        Acceso de demostración: usuario <code>demo</code>, contraseña{' '}
        <code>demo1234</code>.
      </p>

      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <label>
          Usuario
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-invalid={Boolean(fieldErrors.username)}
          />
          {fieldErrors.username && (
            <span className="field-error">{fieldErrors.username}</span>
          )}
        </label>
        <label>
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={Boolean(fieldErrors.password)}
          />
          {fieldErrors.password && (
            <span className="field-error">{fieldErrors.password}</span>
          )}
        </label>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Entrando…' : 'Entrar'}
        </button>
      </form>

      {formError && <p className="error">{formError}</p>}
    </section>
  )
}

export default Login
