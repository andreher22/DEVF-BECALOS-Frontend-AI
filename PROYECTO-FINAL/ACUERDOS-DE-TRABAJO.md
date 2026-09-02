# Acuerdos de forma de trabajo — CineExplorer

## Modalidad

Trabajo **individual**, adaptando el marco de trabajo **SCRUM** a un
solo desarrollador para mantener orden, entregas incrementales y
trazabilidad del avance a lo largo del curso.

## Sprints

Cada **"Parte" del proyecto final** (según lo pide el/la sensei) se
trata como un sprint:

- Duración del sprint: la definida por el calendario del módulo/entrega
  correspondiente en el campus.
- Al inicio de cada parte: se define el objetivo/alcance de esa entrega
  (equivalente al *sprint planning*).
- Al cierre de cada parte: se revisa lo construido contra el objetivo
  planteado (equivalente al *sprint review*) y se anota qué mejorar
  para la siguiente (equivalente a la *retrospectiva*), en la sección
  de bitácora más abajo.

## Flujo de trabajo con Git/GitHub

- **Rama principal:** `main`.
- Cada entrega se sube mediante uno o más *commits* descriptivos sobre
  el trabajo de esa parte (sin forzar un único commit gigante).
- **Mensajes de commit:** en español, formato
  `PROYECTO FINAL PARTE N - <resumen breve del avance>`, siguiendo la
  convención ya usada en el resto del repositorio.
- El código y avances se comparten en el campus mediante la liga del
  repositorio de GitHub una vez subida cada parte.

## Herramientas

- **Editor:** VS Code (con extensión de Claude Code como asistente).
- **Control de versiones:** Git + GitHub.
- **Gestión del backlog:** lista de pendientes al final de este
  documento y checklist en el `README.md` del proyecto (dado que es
  trabajo individual, se prioriza simplicidad sobre un tablero externo).
- **Comunicación de dudas/bloqueos:** asesorías con el/la sensei o
  soporte del campus.

## Definición de "hecho" (Definition of Done)

Una parte del proyecto se considera terminada cuando:

1. Cumple con lo solicitado en las instrucciones de esa entrega.
2. El código corre localmente sin errores (`npm run dev` / `npm run build`
   cuando aplique).
3. Está commiteado en `main` con un mensaje claro.
4. El `README.md` del proyecto refleja el estado actual y lo que sigue.

## Bitácora de acuerdos y avances

| Fecha       | Parte   | Acuerdo / avance                                                                 |
|-------------|---------|------------------------------------------------------------------------------------|
| 2026-09-02  | Parte 1 | Se define el proyecto (Explorador de Películas y Series) y esta metodología de trabajo. |
| 2026-09-02  | Parte 2 | Se crea la app con Vite + React y se limpia el contenido de ejemplo del starter. |
| 2026-09-02  | Parte 3 | Se agrega backend con Express (proxy a TMDb con fallback a datos de ejemplo) y se valida la comunicación front-back con una solicitud de muestra. |
| 2026-09-02  | Parte 4 | Se protege la ruta `/favoritos` con React Router + Context API en el frontend, y con JWT (`/api/login`, `requireAuth`) en el backend. |
| 2026-09-02  | Parte 5 | Se agrega validación con Zod (login, front y back) y manejo de errores centralizado (`apiFetch`, `ErrorBoundary`, middleware de errores en Express). |
| 2026-09-02  | Parte 6 | Se analiza el proyecto y se aplican `useMemo` (filtrado/orden en Home) y `useCallback` (recarga/reintentar en Home y Favoritos) junto con un `MovieList` memoizado con `React.memo`. |
| 2026-09-02  | Parte 7 | Se agregan Vercel Serverless Functions (`api/`) equivalentes al backend de Express, y `vercel.json` para el despliegue. Proyecto importado y desplegado en Vercel: https://devf-becalos-frontend-ai.vercel.app (tras ajustar `vercel.json` del formato "services" al clásico, que sí reconoce `api/`). |
