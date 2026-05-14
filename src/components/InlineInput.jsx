import { useRef, useEffect } from "react";

/**
 * InlineInput
 *
 * A focused text input that confirms on Enter/blur and cancels on Escape.
 * Used for both renaming nodes and naming newly-created ones.
 *
 * Props:
 *   placeholder   – ghost text shown when the field is empty (create mode)
 *   defaultValue  – pre-filled text positioned at the end (rename mode)
 *   onConfirm(value: string) – called with trimmed, non-empty input
 *   onCancel()               – called when the user escapes or submits empty
 */
export function InlineInput({ placeholder, defaultValue = "", onConfirm, onCancel }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.focus();
    // Place cursor at the end of the pre-filled value
    el.setSelectionRange(el.value.length, el.value.length);
  }, []);

  const commit = () => {
    const value = ref.current?.value.trim();
    if (value) onConfirm(value);
    else onCancel();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") commit();
    if (e.key === "Escape") onCancel();
  };

  return (
    <input
      ref={ref}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onKeyDown={handleKeyDown}
      onBlur={commit}
      className="bg-[#3c3c3c] text-[#cccccc] text-[13px] px-1 py-0.5 rounded border border-[#007fd4] outline-none w-full min-w-0 font-mono"
    />
  );
}
