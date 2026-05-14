import { useState } from "react";
import { FilePlus, FolderPlus, Pencil, Trash2 } from "lucide-react";

export function NodeActions({
  isFolder,
  onNewFile,
  onNewFolder,
  onRename,
  onDelete,
}) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <>
      <div
        className="absolute right-1 flex items-center gap-0.5 bg-[#252526] rounded px-1 py-0.5 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {isFolder && (
          <>
            <button title="New File" onClick={onNewFile} className="p-0.5 rounded text-[#cccccc] hover:text-white hover:bg-[#3e3e3e]">
              <FilePlus size={13} />
            </button>

            <button title="New Folder" onClick={onNewFolder} className="p-0.5 rounded text-[#cccccc] hover:text-white hover:bg-[#3e3e3e]">
              <FolderPlus size={13} />
            </button>
          </>
        )}

        <button title="Rename" onClick={onRename} className="p-0.5 rounded text-[#cccccc] hover:text-white hover:bg-[#3e3e3e]">
          <Pencil size={13} />
        </button>

        <button
          title="Delete"
          onClick={() => setShowDeleteConfirm(true)}
          className="p-0.5 rounded text-[#cccccc] hover:text-red-400 hover:bg-[#3e3e3e] transition-colors"
        >
          <Trash2 size={13} />
        </button>
      </div>

      {showDeleteConfirm && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40"
          onClick={() => setShowDeleteConfirm(false)}
        >
          <div
            className="w-72 rounded-lg border border-[#444] bg-[#252526] p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-semibold text-white">Delete item?</h3>

            <p className="mt-2 text-xs text-[#cccccc]">
              This action cannot be undone.
            </p>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="rounded bg-[#3a3a3a] px-3 py-1.5 text-xs text-[#cccccc] hover:bg-[#4a4a4a]"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  onDelete();
                  setShowDeleteConfirm(false);
                }}
                className="rounded bg-red-600 px-3 py-1.5 text-xs text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}