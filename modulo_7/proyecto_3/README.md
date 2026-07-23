# useContext Demo — Proyecto Final Módulo 7 (Parte 3)

Demo enfocada en el uso de `useContext` para gestionar estado global y
evitar **prop drilling**. Construida con React, Vite y Tailwind CSS.

## Objetivo de esta entrega

1. Crear un contexto con `createContext`.
2. Implementar un `Provider` que envuelva la aplicación.
3. Consumir ese estado con `useContext` en los componentes que lo necesitan,
   sin pasarlo por props a través de componentes intermedios.

## Qué incluye

Dos contextos independientes, cada uno con su propio `Provider` y su propio
hook de conveniencia:

- **`ThemeContext`** (`src/context/ThemeContext.jsx`): tema claro/oscuro y
  `toggleTheme`.
- **`UserContext`** (`src/context/UserContext.jsx`): usuario "logueado"
  (simulado, sin backend) con `login`/`logout`.

## Cómo se evita el prop drilling

El árbol de componentes tiene 5 niveles de profundidad:

```
App
└─ ThemeProvider
   └─ UserProvider
      └─ Layout            (lee useTheme, NO conoce user)
         ├─ Header         (lee useTheme + useUser)
         ├─ Sidebar         (lee useTheme)
         └─ MainContent    (no lee ningún contexto)
            └─ Dashboard    (no lee ningún contexto)
               └─ StatsSection  (no lee ningún contexto)
                  └─ StatCard   (lee useTheme + useUser)
```

`MainContent`, `Dashboard` y `StatsSection` no reciben `theme` ni `user`
como props — ni siquiera saben que existen. `StatCard`, cuatro niveles por
debajo de `Layout`, llama a `useTheme()` y `useUser()` directamente. Sin
Context, esos valores tendrían que pasarse como props por cada uno de esos
componentes intermedios aunque no los usen.

## Cómo probarlo

```bash
npm install
npm run dev
```

- El botón de sol/luna en el header cambia el tema en toda la app (Header,
  Sidebar y StatCard reaccionan al mismo estado).
- El formulario de "Tu nombre" simula un login: el saludo aparece en el
  header y en la tarjeta "Bienvenida" del dashboard, ambos leyendo el mismo
  `UserContext` de forma independiente.

## Repositorio de referencia

Basado en la lógica general de [DevfSeek](https://github.com/carlosDevf/DevfSeek),
usado únicamente como guía de aprendizaje.
