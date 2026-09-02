import { z } from 'zod'

export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, 'El usuario es obligatorio')
    .max(50, 'El usuario no puede superar los 50 caracteres'),
  password: z
    .string()
    .min(4, 'La contraseña debe tener al menos 4 caracteres')
    .max(100, 'La contraseña no puede superar los 100 caracteres'),
})
