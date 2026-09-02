const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { requireAuth, JWT_SECRET } = require("./auth");
const mockPopular = require("./data/popular.mock.json");
const mockFavorites = require("./data/favorites.mock.json");

const app = express();
const port = process.env.PORT || 8080;
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Credenciales de demostración (no hay registro de usuarios en este proyecto).
const DEMO_USER = process.env.DEMO_USER || "demo";
const DEMO_PASSWORD = process.env.DEMO_PASSWORD || "demo1234";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CineExplorer API funcionando");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Solicitud de muestra que valida la comunicación front-back.
// Si hay una TMDB_API_KEY configurada, consulta la API real de TMDb;
// si no, responde con datos de ejemplo locales para no bloquear el
// desarrollo mientras se gestiona la API key.
app.get("/api/movies/popular", async (req, res) => {
  if (!TMDB_API_KEY) {
    return res.json({ source: "mock", results: mockPopular });
  }

  try {
    const tmdbResponse = await fetch(
      `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=es-MX`
    );

    if (!tmdbResponse.ok) {
      throw new Error(`TMDb respondió con status ${tmdbResponse.status}`);
    }

    const data = await tmdbResponse.json();
    res.json({ source: "tmdb", results: data.results });
  } catch (error) {
    console.error("Error consultando TMDb:", error.message);
    res
      .status(502)
      .json({ source: "mock", results: mockPopular, warning: "No se pudo conectar con TMDb, se muestran datos de ejemplo" });
  }
});

// Login de demostración: valida usuario/contraseña fijos y firma un JWT.
app.post("/api/login", (req, res) => {
  const { username, password } = req.body || {};

  if (username !== DEMO_USER || password !== DEMO_PASSWORD) {
    return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token, username });
});

// Ruta protegida: requiere un JWT válido (emitido por /api/login).
// Complementa del lado del backend la protección de la ruta /favoritos
// del frontend, para que la información no dependa solo de ocultar la
// vista en el cliente.
app.get("/api/favorites", requireAuth, (req, res) => {
  res.json({ user: req.user.username, results: mockFavorites });
});

app.listen(port, () => {
  console.log(`CineExplorer API escuchando en http://localhost:${port}`);
});
