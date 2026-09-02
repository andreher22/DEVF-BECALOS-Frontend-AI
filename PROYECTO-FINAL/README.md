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

### Próximas partes

- [x] Parte 2: Inicialización del proyecto React (Vite) y estructura base.
- [ ] Parte 3: Consumo de la API de TMDb (búsqueda y listados).
- [ ] Parte 4: Ruteo, detalle de título y favoritos con Context API.
- [ ] Parte 5: Despliegue en Vercel.
