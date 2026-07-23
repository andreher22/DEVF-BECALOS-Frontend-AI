# DevfSeek — Proyecto Final Módulo 7 (Parte 2)

Clon básico de ChatGPT construido con React, que consume un modelo local de
IA (**DeepSeek-R1**) a través de **Ollama**. Segunda entrega del proyecto:
el foco está en la funcionalidad (integración con la IA, historial, estado
global) más que en la apariencia visual.

## Objetivo de esta entrega

- Custom hook para consumir el servicio de Ollama con streaming.
- Componente **History** para gestionar consultas previas.
- **Context + useReducer** para el estado global de la aplicación.

## 1. Instalar Ollama

Descarga e instala Ollama desde [ollama.com/download](https://ollama.com/download)
(Windows, Mac o Linux) y verifica que quedó corriendo:

```bash
ollama --version
```

Ollama expone su API en `http://localhost:11434` en cuanto se instala/inicia
(en Windows corre como servicio en segundo plano; en Mac/Linux puede
requerir `ollama serve` en otra terminal).

## 2. Descargar el modelo DeepSeek-R1 (versión ligera, ~1.1 GB)

```bash
ollama pull deepseek-r1:1.5b
```

Puedes probar que el modelo responde directamente desde la terminal:

```bash
ollama run deepseek-r1:1.5b "Hola, preséntate en una línea"
```

## 3. Correr la aplicación

```bash
npm install
npm run dev
```

Con Ollama corriendo y el modelo descargado, escribe un mensaje en el chat:
la respuesta llega en streaming token por token.

Si Ollama no está corriendo o el modelo no está descargado, la app lo indica
con un banner de error en vez de fallar silenciosamente.

## Tecnologías

- React 19 + Vite
- Tailwind CSS v4 (estilos heredados de la Parte 1)
- React Hook Form + Zod para la validación del formulario de mensajes
- Context API + `useReducer` para el estado global
- lucide-react para iconografía

## Arquitectura

```
src/
├── api/
│   └── useOllama.js          # Custom hook: fetch + streaming NDJSON a Ollama
├── context/
│   └── GlobalContext.jsx     # Context + useReducer (historial y chat actual)
├── components/
│   ├── History.jsx           # Lista de consultas previas (ver/eliminar/nuevo chat)
│   ├── ChatMessages.jsx       # Lista de mensajes del chat activo
│   ├── MessageBubble.jsx      # Burbuja de mensaje (usuario/bot)
│   └── ChatForm.jsx           # Formulario de envío (React Hook Form + Zod)
├── utils/
│   └── stripThinking.js       # Oculta el bloque <think>...</think> de DeepSeek-R1
└── App.jsx                    # Conecta el contexto global con el hook de Ollama
```

### Flujo de datos

1. `ChatForm` valida el mensaje (Zod: 3–200 caracteres) y lo envía a `App`.
2. `App` despacha `chat/push` (mensaje del usuario + placeholder del bot) y
   llama a `useOllama().ask(text)`.
3. `useOllama` hace streaming de la respuesta de Ollama; en cada chunk,
   `App` despacha `chat/update-last` para actualizar el texto del último
   mensaje (el del bot) en el estado global.
4. **Nuevo chat** despacha `history/save`: mueve el chat actual al
   historial (persistido en `localStorage`) y limpia la conversación activa.
5. Desde `History` se puede seleccionar (`history/select`) o eliminar
   (`history/delete`) cualquier consulta previa.

El reducer (`globalReducer`) se mantiene puro — no hace I/O. La persistencia
en `localStorage` vive en un `useEffect` del `GlobalProvider`, separada de
la lógica de transición de estado.

## Notas de buenas prácticas

- El hook `useOllama` cancela el stream en curso (`AbortController`) si se
  dispara una nueva consulta o si el componente se desmonta.
- El reducer nunca muta el estado directamente: cada acción retorna un
  nuevo objeto de estado.
- El mensaje placeholder del bot se retira automáticamente si la consulta
  falla antes de recibir texto, para no dejar burbujas vacías en pantalla.

## Repositorio de referencia

Basado en la lógica de [DevfSeek](https://github.com/carlosDevf/DevfSeek/tree/parte-3/src/api),
usado únicamente como guía de aprendizaje.
