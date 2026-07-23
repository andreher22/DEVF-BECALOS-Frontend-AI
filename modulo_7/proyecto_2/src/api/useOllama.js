import { useCallback, useRef, useState } from "react";

const OLLAMA_URL = "http://localhost:11434/api/generate";
const MODEL = "deepseek-r1:1.5b";

/**
 * Custom hook para consumir el servicio local de Ollama con streaming.
 * Devuelve el texto acumulado de la respuesta a medida que llegan los chunks,
 * junto con el estado de carga y de error.
 */
export default function useOllama() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const ask = useCallback(async (prompt) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);
    setResponse("");

    try {
      const res = await fetch(OLLAMA_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          model: MODEL,
          prompt,
          stream: true,
        }),
      });

      if (!res.ok || !res.body) {
        throw new Error(
          `Ollama respondió con un error (${res.status}). ¿Descargaste el modelo con "ollama pull ${MODEL}"?`,
        );
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.trim()) continue;

          const parsed = JSON.parse(line);
          if (parsed.response) {
            setResponse((prev) => prev + parsed.response);
          }
          if (parsed.done) return;
        }
      }
    } catch (err) {
      if (err.name === "AbortError") return;

      // Un TypeError aquí normalmente significa que el fetch nunca llegó a
      // conectar (Ollama apagado, puerto equivocado, CORS, etc.).
      const message =
        err instanceof TypeError
          ? "No se pudo conectar con Ollama en http://localhost:11434. Verifica que esté corriendo (`ollama serve`)."
          : err.message || "Ocurrió un error al consultar el modelo";

      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const cancel = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  return { ask, cancel, response, loading, error };
}
