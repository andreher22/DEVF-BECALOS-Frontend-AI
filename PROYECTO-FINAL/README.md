# 🎬 CineExplorer — Explorador de Películas y Series

Proyecto Final del programa **BECALOS – Frontend con IA**. Aplicación
React que permite buscar, explorar y guardar como favoritas películas y
series usando una API pública de catálogo de cine.

🔗 **Demo desplegada:** https://devf-becalos-frontend-ai.vercel.app

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

## 📌 Parte 4 — Protección de rutas

Se agregó **React Router** y un flujo de autenticación de demostración
para proteger la vista de **Favoritos** (información específica de un
usuario, no pública):

### Rutas de la aplicación

| Ruta         | Acceso     | Descripción                                    |
|--------------|------------|-------------------------------------------------|
| `/`          | Público    | Listado de populares (Parte 3).                 |
| `/login`     | Público    | Formulario de inicio de sesión.                 |
| `/favoritos` | **Protegido** | Favoritos del usuario autenticado.           |

### Protección del lado del frontend

- `src/context/AuthContext.jsx` — Context API que guarda el token/usuario
  (persistidos en `localStorage`) y expone `login`, `logout` e
  `isAuthenticated`.
- `src/components/ProtectedRoute.jsx` — envuelve `/favoritos`; si no hay
  sesión, redirige a `/login` (guardando la ruta de origen para volver
  tras iniciar sesión).
- `src/pages/Login.jsx` — hace `POST /api/login` y, si es exitoso,
  guarda el token en el contexto y navega a la ruta protegida.

### Protección del lado del backend

La protección en el frontend solo oculta la vista; el dato real se
protege en el backend con un **JWT**:

- `POST /api/login` — valida credenciales de demostración
  (`DEMO_USER` / `DEMO_PASSWORD`, ver `.env.example`) y firma un JWT
  (`backend/auth.js`, expira en 1 hora).
- `GET /api/favorites` — protegido con el middleware `requireAuth`:
  exige un header `Authorization: Bearer <token>` válido; sin él
  responde `401`.

**Credenciales de demostración:** usuario `demo`, contraseña `demo1234`
(no hay registro de usuarios; es un login de ejemplo para el curso).

## 📌 Parte 5 — Validaciones y manejo de errores

Se agregó **Zod** para validar formularios y se centralizó el manejo
de errores de las peticiones al backend.

### Validación con Zod

- `src/schemas/loginSchema.js` — valida el formulario de login
  (usuario obligatorio, contraseña de al menos 4 caracteres) **antes**
  de llamar a la API; los errores se muestran debajo de cada campo.
- `backend/schemas/loginSchema.js` — el backend valida el mismo `body`
  con Zod y responde `400` con el detalle por campo si la forma de los
  datos es inválida (defensa adicional, sin depender solo del frontend).

### Manejo de errores de la API

- `src/lib/api.js` — un `apiFetch()` que envuelve `fetch` y normaliza
  dos tipos de fallo en un mismo `ApiError`:
  - **Errores de red** (backend caído, sin conexión): mensaje genérico
    "No se pudo conectar con el servidor...".
  - **Errores de negocio** (4xx/5xx del backend): usa el `message` que
    devuelve la API (credenciales incorrectas, datos inválidos, token
    vencido, etc.).
- `Home.jsx`, `Login.jsx` y `Favoritos.jsx` usan `apiFetch` y muestran
  `error.message` en la vista, además de un estado de carga.
- En `Favoritos.jsx`, si la API responde `401` (token vencido o
  inválido) se cierra la sesión automáticamente y se redirige a
  `/login`, en vez de mostrar un error crudo.
- `backend/server.js` agrega un middleware de errores al final que
  captura JSON malformado en el body y cualquier error no controlado,
  respondiendo siempre con un `{ message }` legible.

### Manejo de errores de la interfaz (React)

- `src/components/ErrorBoundary.jsx` — Error Boundary de React que
  envuelve toda la app (`main.jsx`); si un error inesperado rompe el
  render de algún componente, muestra una pantalla de "algo salió mal"
  con opción de reintentar, en vez de una pantalla en blanco.

## 📌 Parte 6 — Optimización con useMemo / useCallback

### Análisis

Se revisó el estado actual del proyecto (Home, Favoritos, Login) para
encontrar candidatos reales a optimización, en vez de aplicar memoización
"porque sí":

- **Login** no tiene listas ni cálculos derivados: no se tocó.
- **Home** no tenía forma de buscar/ordenar entre las películas
  populares; se agregó esa funcionalidad y, junto con ella, sí aparece
  un cálculo derivado (filtrar + ordenar) que vale la pena memoizar.
- **Home** y **Favoritos** repetían la misma lógica de renderizado de
  lista de películas.

### Cambios

- `src/components/MovieList.jsx` — se extrajo la lista de películas
  (antes duplicada en Home y Favoritos) a un componente de
  presentación envuelto en `React.memo`, para que no vuelva a
  renderizarse si la prop `movies` no cambió de referencia.
- `src/pages/Home.jsx` — se agregó **búsqueda por título** y
  **orden** (original / mejor calificadas / A-Z):
  - `useMemo` calcula `visibleMovies` (filtrado + ordenado) solo
    cuando cambian `movies`, `query` o `sortBy`, en lugar de en cada
    render de Home.
  - `useCallback` memoiza `loadPopular` para reutilizarla tanto en el
    `useEffect` de carga inicial como en el botón **Reintentar** sin
    recrear la función (ni disparar el efecto de nuevo) en cada render.
- `src/pages/Favoritos.jsx` — mismo patrón de `useCallback` para
  `loadFavorites` + botón **Reintentar**.

## 📌 Parte 7 — Despliegue en Vercel

### Cómo se preparó el proyecto

Vercel no ejecuta servidores persistentes como `backend/server.js`;
para producción se convirtieron esos mismos endpoints a
**Vercel Serverless Functions**, que se despliegan junto con el
frontend en un solo proyecto:

```
api/
├── _lib/               # Código compartido (Vercel ignora carpetas con "_")
│   ├── auth.js          # Firma/verifica JWT
│   ├── data.js           # Datos de ejemplo (fallback sin TMDB_API_KEY)
│   └── loginSchema.js     # Mismo esquema de Zod que el frontend
├── health.js             # GET /api/health
├── login.js               # POST /api/login
├── favorites.js            # GET /api/favorites (protegido con JWT)
└── movies/
    └── popular.js           # GET /api/movies/popular
```

- `vercel.json` — indica el framework (Vite), el comando de build, la
  carpeta de salida (`dist`) y una reescritura para que las rutas de
  React Router (`/favoritos`, `/login`, etc.) funcionen al recargar la
  página o entrar directo por URL, sin romper las rutas `/api/*`.
- `backend/` se conserva tal cual para **desarrollo local** (como se
  pidió en la Parte 3); `api/` es la versión equivalente para
  **producción en Vercel**. La lógica de negocio es la misma en ambos.

### Pasos para desplegar (cuenta personal de Vercel)

1. Crear cuenta / iniciar sesión en [vercel.com](https://vercel.com)
   con la cuenta de GitHub `andreher22`.
2. **Add New… → Project** e importar el repositorio
   `DEVF-BECALOS-Frontend-AI`.
3. En la configuración del proyecto:
   - **Root Directory:** `PROYECTO-FINAL` (el repo tiene varias
     carpetas de módulos; solo esta carpeta es la app).
   - **Framework Preset:** Vite (se detecta automáticamente).
4. Variables de entorno (Settings → Environment Variables):
   | Variable         | Valor sugerido                          |
   |------------------|------------------------------------------|
   | `JWT_SECRET`     | una cadena aleatoria larga (no la de ejemplo) |
   | `DEMO_USER`      | `demo` (o el usuario que prefieras)       |
   | `DEMO_PASSWORD`  | `demo1234` (o la contraseña que prefieras) |
   | `TMDB_API_KEY`   | opcional — si no se define, la API usa datos de ejemplo |
5. **Deploy**. Vercel construye el frontend y publica las funciones de
   `api/` automáticamente.
6. Cada push a `main` vuelve a desplegar solo (Vercel ya conecta CI/CD
   con el repositorio de GitHub).

**Aplicación desplegada:** https://devf-becalos-frontend-ai.vercel.app

> Nota: durante el import, Vercel detectó `backend/` como un segundo
> "servicio" (por su `package.json` con Express) y pidió el formato
> `vercel.json` con `"services"`. Se optó por el `vercel.json` clásico
> (un solo proyecto: el frontend Vite + `api/` como funciones
> serverless), ya que el formato `"services"` no desplegaba `api/`
> correctamente (daba 404 en las rutas de la API). `backend/` queda
> fuera del despliegue, tal como se planeó: solo se usa en local.

### Próximas partes

- [x] Parte 2: Inicialización del proyecto React (Vite) y estructura base.
- [x] Parte 3: Backend con Express y comunicación front-back validada.
- [x] Parte 4: Protección de rutas (frontend con React Router + backend con JWT).
- [x] Parte 5: Validaciones con Zod y manejo de errores (frontend y backend).
- [x] Parte 6: Optimización con useMemo/useCallback (búsqueda/orden en Home).
- [x] Parte 7: Preparación y despliegue en Vercel (serverless functions + vercel.json).
- [ ] Parte 8: Búsqueda real contra TMDb y detalle de título.
