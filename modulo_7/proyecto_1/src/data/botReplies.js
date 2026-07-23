const REPLIES = [
  "Interesante, cuéntame más al respecto.",
  "Por ahora soy una respuesta simulada: la conexión con el modelo real llegará en las siguientes entregas del proyecto.",
  "¡Buena pregunta! Sigo en entrenamiento, pero pronto tendré lógica real conectada a un backend.",
  "Entendido. ¿Hay algo más en lo que pueda ayudarte?",
  "Gracias por tu mensaje, lo tendré en cuenta para mi próxima respuesta.",
];

export function getBotReply() {
  return REPLIES[Math.floor(Math.random() * REPLIES.length)];
}
