export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

// Envoltura de fetch que normaliza tanto errores de red (backend caído,
// sin conexión) como errores de negocio devueltos por la API (4xx/5xx
// con { message }), para que las vistas solo tengan que mostrar
// error.message al usuario.
export async function apiFetch(path, options = {}) {
  let res

  try {
    res = await fetch(path, options)
  } catch {
    throw new ApiError(
      'No se pudo conectar con el servidor. Verifica tu conexión e inténtalo de nuevo.',
      0
    )
  }

  let data = null
  try {
    data = await res.json()
  } catch {
    data = null
  }

  if (!res.ok) {
    throw new ApiError(
      data?.message || `Ocurrió un error inesperado (código ${res.status}).`,
      res.status
    )
  }

  return data
}
