# 🎬 CineExplorer — Explorador de Películas y Series

Proyecto Final del programa **BECALOS – Frontend con IA**. Aplicación
React que permite buscar, explorar y guardar como favoritas películas y
series usando una API pública de catálogo de cine.

Este repositorio se construye **por partes**, conforme se avanza en el
programa. Esta carpeta (`PROYECTO-FINAL/`) contiene la entrega
correspondiente a cada parte del proyecto final (distinto de los
proyectos de módulo ya existentes en `modulo_7/`).

---

## 📌 Parte 1 — Definición del proyecto y acuerdos de trabajo

### Proyecto elegido

**🎬 Explorador de Películas y Series**, de las opciones propuestas por
el/la sensei:

1. 🚴 Aplicación de Registro de Actividades Deportivas
2. **🎬 Explorador de Películas y Series** ✅
3. 🛰️ Dashboard de Misiones Espaciales
4. 🛒 Catálogo Interactivo de Productos

**¿Por qué esta opción?** Es la más factible dentro del alcance del
curso: existe una API pública gratuita y bien documentada
([TMDb](https://www.themoviedb.org/documentation/api)), no requiere
backend propio para el MVP, y permite ir sumando de forma incremental
las características que se ven en cada módulo (fetch/consumo de API,
routing, manejo de estado, formularios, contexto, backend con Express,
etc.) sin rehacer la base del proyecto.

### Descripción del proyecto

CineExplorer permitirá:

- Buscar películas y series por nombre.
- Ver un listado de populares / mejor calificadas al entrar.
- Ver el detalle de un título (sinopsis, calificación, fecha de
  estreno, géneros, reparto).
- Filtrar por género y tipo (película / serie).
- Marcar títulos como favoritos y consultarlos en una sección aparte
  (persistidos en `localStorage`, y más adelante en un backend propio).

### Tecnologías planeadas

- **React 19 + Vite** — base de la aplicación
- **React Router** — navegación entre vistas (inicio, búsqueda, detalle, favoritos)
- **Tailwind CSS** — estilos
- **TMDb API** — fuente de datos de películas y series
- **Context API** — estado global de favoritos
- **Express** (en una parte posterior) — backend propio si el alcance lo requiere

> El stack se ajustará conforme avancen los módulos del curso; esta
> lista refleja el plan al día de esta entrega (2026-09-02).

### Dinámica de trabajo

Proyecto desarrollado de **forma individual**, aplicando de forma
adaptada prácticas de **SCRUM** para organizar el avance por entregas
del curso (cada "Parte" del proyecto final se trabaja como un sprint).

El detalle de la metodología, roles, herramientas y acuerdos se
documenta en [`ACUERDOS-DE-TRABAJO.md`](./ACUERDOS-DE-TRABAJO.md).

## 📌 Parte 2 — Estructura del proyecto con Vite

Se inicializó la aplicación con `npm create vite@latest -- --template react`
y se limpió el contenido de ejemplo del starter, dejando una pantalla
placeholder que identifica el proyecto mientras se construyen las
vistas reales en las siguientes partes.

### Cómo correrlo

```bash
cd PROYECTO-FINAL
npm install
npm run dev      # entorno de desarrollo
npm run build    # build de producción
```

### Estructura del repositorio (esta entrega)

```
PROYECTO-FINAL/
├── README.md                 # Descripción del proyecto (este archivo)
├── ACUERDOS-DE-TRABAJO.md    # Metodología y acuerdos de trabajo
├── .gitignore                # Generado por Vite (node_modules, dist, etc.)
├── index.html                # Punto de entrada HTML
├── package.json / package-lock.json
├── vite.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx               # Punto de entrada de React
    ├── App.jsx                # Componente raíz (placeholder de esta parte)
    ├── App.css
    └── index.css
```

## 📌 Parte 3 — Backend y comunicación front-back

Se agregó un backend propio en **Express** (`backend/`) que expone
endpoints propios y hace de proxy hacia la API de **TMDb**
([The Movie Database](https://www.themoviedb.org/documentation/api)):

- `GET /api/health` — endpoint de salud.
- `GET /api/movies/popular` — **solicitud de muestra** que valida la
  comunicación front-back: si hay una `TMDB_API_KEY` configurada
  (ver `backend/.env.example`), consulta la API real de TMDb; si no,
  responde con datos de ejemplo locales (`backend/data/popular.mock.json`)
  para no bloquear el desarrollo mientras se gestiona la API key.

El frontend (Vite) consume ese endpoint desde `src/App.jsx` con
`fetch('/api/movies/popular')`, y en desarrollo Vite hace **proxy** de
`/api` hacia `http://localhost:8080` (ver `vite.config.js`), así el
front nunca necesita conocer la URL del backend.

### Cómo correr frontend + backend

```bash
# Terminal 1 — backend
cd PROYECTO-FINAL/backend
npm install
cp .env.example .env   # opcional: agrega tu TMDB_API_KEY
npm start               # http://localhost:8080

# Terminal 2 — frontend
cd PROYECTO-FINAL
npm install
npm run dev              # http://localhost:5173
```

Con ambos corriendo, la vista principal del frontend hace la petición
de muestra al backend y muestra el listado de películas (de TMDb si
hay API key configurada, o de los datos de ejemplo si no la hay).

### Estructura del backend

```
backend/
├── .env.example        # Variables de entorno de referencia (PORT, TMDB_API_KEY)
├── .gitignore           # node_modules, .env
├── package.json
├── server.js             # Servidor Express + endpoints
└── data/
    └── popular.mock.json # Datos de ejemplo (fallback sin API key)
```

### Próximas partes

- [x] Parte 2: Inicialización del proyecto React (Vite) y estructura base.
- [x] Parte 3: Backend con Express y comunicación front-back validada.
- [ ] Parte 4: Búsqueda real contra TMDb, ruteo y detalle de título.
- [ ] Parte 5: Favoritos con Context API y despliegue en Vercel.
