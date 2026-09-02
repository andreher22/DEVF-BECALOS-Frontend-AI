const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mockPopular = require("./data/popular.mock.json");

const app = express();
const port = process.env.PORT || 8080;
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

app.use(cors());

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

app.listen(port, () => {
  console.log(`CineExplorer API escuchando en http://localhost:${port}`);
});
