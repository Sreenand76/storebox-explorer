export function Modal({ title, message, confirmText = "OK", cancelText, onConfirm, onCancel }) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40"
      onClick={onCancel || onConfirm}
    >
      <div
        className="w-72 rounded-lg border border-[#444] bg-[#252526] p-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-sm font-semibold text-white">{title}</h3>

        <p className="mt-2 text-xs text-[#cccccc]">
          {message}
        </p>

        <div className="mt-4 flex justify-end gap-2">
          {cancelText && onCancel && (
            <button
              onClick={onCancel}
              className="rounded bg-[#3a3a3a] px-3 py-1.5 text-xs text-[#cccccc] hover:bg-[#4a4a4a]"
            >
              {cancelText}
            </button>
          )}

          <button
            onClick={onConfirm}
            className={`rounded px-3 py-1.5 text-xs text-white ${
              cancelText ? 'bg-red-600 hover:bg-red-700' : 'bg-[#0e639c] hover:bg-[#1177bb]'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
