import { useForm } from "react-hook-form";
import { SendHorizontal } from "lucide-react";

export default function ChatForm({ onSend, disabled }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { message: "" } });

  const submit = ({ message }) => {
    onSend(message.trim());
    reset();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(submit)();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="border-t border-gray-800 bg-gray-900 p-4"
    >
      <div className="mx-auto flex max-w-3xl items-end gap-2">
        <div className="flex-1">
          <textarea
            rows={1}
            placeholder="Escribe un mensaje para DevfSeek..."
            disabled={disabled}
            aria-invalid={errors.message ? "true" : "false"}
            className={`w-full resize-none rounded-2xl border bg-gray-800 px-4 py-3 text-sm text-gray-100 placeholder-gray-500 outline-none transition focus:border-blue-500 disabled:opacity-50 ${
              errors.message ? "border-red-500" : "border-gray-700"
            }`}
            {...register("message", {
              required: "Escribe un mensaje antes de enviar",
              validate: (value) =>
                value.trim().length > 0 || "El mensaje no puede estar vacío",
              maxLength: {
                value: 2000,
                message: "El mensaje es demasiado largo (máx. 2000 caracteres)",
              },
            })}
            onKeyDown={handleKeyDown}
          />
          {errors.message && (
            <p className="mt-1 px-1 text-xs text-red-400">
              {errors.message.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={disabled}
          aria-label="Enviar mensaje"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <SendHorizontal size={20} />
        </button>
      </div>
    </form>
  );
}
