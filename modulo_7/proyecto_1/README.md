# DevfSeek — Proyecto Final Módulo 7 (Parte 1)

Clon de una interfaz de chat estilo DeepSeek, construido con React y Vite.
Esta es la **primera entrega** del proyecto: sienta las bases de estilo y
formularios sobre las que se construirán las siguientes partes (consumo de
API, backend con Express, base de datos, etc.).

## Objetivo de esta entrega

Integrar **Tailwind CSS** para los estilos y **React Hook Form** para la
validación de formularios, dentro de una interfaz de chat funcional (sin
backend todavía: las respuestas del bot son simuladas).

## Tecnologías

- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) (vía `@tailwindcss/vite`)
- [React Hook Form](https://react-hook-form.com/) para el formulario de envío de mensajes
- [lucide-react](https://lucide.dev/) para iconografía

## Funcionalidad

- Interfaz de chat con barra lateral de conversaciones (estilo DeepSeek/ChatGPT).
- Crear nuevas conversaciones (**Nuevo chat**) y eliminarlas desde la barra lateral.
- Enviar mensajes mediante un formulario validado con React Hook Form:
  - No permite enviar mensajes vacíos o solo espacios en blanco.
  - Límite máximo de 2000 caracteres.
  - `Enter` envía el mensaje, `Shift + Enter` agrega un salto de línea.
- Respuesta simulada del bot (con indicador de "escribiendo…") mientras se
  conecta un backend real en las siguientes entregas.
- Botón **Limpiar chat** para vaciar el historial de la conversación activa.
- El historial de conversaciones se guarda en `localStorage` del navegador.

## Estructura

```
src/
├── components/
│   ├── Sidebar.jsx          # Barra lateral: lista de conversaciones
│   ├── ChatMessages.jsx     # Lista de mensajes + estado vacío
│   ├── MessageBubble.jsx    # Burbuja de mensaje (usuario/bot)
│   ├── TypingIndicator.jsx  # Indicador de "escribiendo…"
│   └── ChatForm.jsx         # Formulario de envío (React Hook Form)
├── data/
│   └── botReplies.js        # Respuestas simuladas del bot
├── App.jsx                  # Estado de conversaciones y layout principal
└── index.css                # Import de Tailwind CSS
```

## Cómo correrlo

```bash
npm install
npm run dev
```

## Repositorio de referencia

Basado en la lógica y estructura de [DevfSeek](https://github.com/carlosDevf/DevfSeek),
usado únicamente como guía de aprendizaje.
