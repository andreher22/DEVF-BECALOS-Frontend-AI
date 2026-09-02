const { z } = require("zod");

const loginSchema = z.object({
  username: z.string().trim().min(1, "El usuario es obligatorio"),
  password: z.string().min(4, "La contraseña debe tener al menos 4 caracteres"),
});

module.exports = { loginSchema };
