const THINK_CLOSE_TAG = "</think>";

/**
 * DeepSeek-R1 antepone su razonamiento interno envuelto en <think>...</think>
 * antes de la respuesta final. Esta función oculta ese bloque mientras
 * llega en streaming y deja únicamente la respuesta visible para el usuario.
 */
export function stripThinking(raw) {
  if (!raw) return "";

  const closeIdx = raw.indexOf(THINK_CLOSE_TAG);
  if (closeIdx === -1) {
    return raw.includes("<think>") ? "" : raw;
  }

  return raw.slice(closeIdx + THINK_CLOSE_TAG.length).trimStart();
}
