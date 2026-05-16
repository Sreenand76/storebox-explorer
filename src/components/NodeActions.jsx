import { useState } from "react";
import { FilePlus, FolderPlus, Pencil, Trash2 } from "lucide-react";
import { Modal } from "./Modal";

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
        <Modal
          title="Delete item?"
          message="This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={() => {
            onDelete();
            setShowDeleteConfirm(false);
          }}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </>
  );
}
