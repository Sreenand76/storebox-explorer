import { FilePlus, FolderPlus } from "lucide-react";

/**
 * Toolbar
 *
 * Top action bar with "New File" and "New Folder" buttons.
 *
 * Props:
 *   onNewFile()   – trigger root-level file creation
 *   onNewFolder() – trigger root-level folder creation
 */
export function Toolbar({ onNewFile, onNewFolder }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 border-b border-[#3e3e3e]">
      <button
        onClick={onNewFile}
        className="flex items-center gap-1.5 text-[12px] font-semibold text-white bg-[#0e639c] hover:bg-[#1177bb] active:bg-[#0a5080] px-3 py-1.5 rounded transition-colors"
      >
        <FilePlus size={13} />
        + New File
      </button>

      <button
        onClick={onNewFolder}
        className="flex items-center gap-1.5 text-[12px] font-semibold text-[#cccccc] border border-[#555] hover:border-[#888] hover:text-white px-3 py-1.5 rounded transition-colors"
      >
        <FolderPlus size={13} />
        + New Folder
      </button>
    </div>
  );
}
