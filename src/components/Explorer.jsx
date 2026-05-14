import { useState } from "react";
import { FolderOpen, Folder, File } from "lucide-react";
import { makeFile, makeFolder } from "../utils/tree";
import { Toolbar } from "./Toolbar";
import { TreeNode } from "./TreeNode";
import { InlineInput } from "./InlineInput";

/**
 * Explorer
 *
 * Assembles the full sidebar: Toolbar → section label → scrollable tree.
 * Owns the root-level "creating" state; delegates per-node mutations
 * down via callbacks from useTreeState.
 *
 * Props:
 *   tree      – the current file-tree array
 *   onInsert(parentId, node)
 *   onRename(id, name)
 *   onDelete(id)
 *   onAddToRoot(type, name)
 */
export function Explorer({ tree, onInsert, onRename, onDelete, onAddToRoot }) {
  const [rootCreating, setRootCreating] = useState(null); // "file" | "folder" | null

  const handleRootCreate = (name) => {
    onAddToRoot(rootCreating, name);
    setRootCreating(null);
  };

  return (
    <div className="flex flex-col h-full">
      <Toolbar
        onNewFile={() => setRootCreating("file")}
        onNewFolder={() => setRootCreating("folder")}
      />

      {/* Section label */}
      <div className="px-3 pt-2 pb-1">
        <span className="text-[11px] font-semibold tracking-widest text-[#bbb] uppercase">
          Explorer
        </span>
      </div>

      {/* Scrollable tree */}
      <div className="flex-1 overflow-y-auto px-1 pb-4">

        {/* Root-level inline create row */}
        {rootCreating && (
          <div className="flex items-center gap-1 py-[2px] px-2">
            <span className="flex-shrink-0">
              {rootCreating === "folder" ? (
                <Folder size={14} className="text-[#e8ab4f]" />
              ) : (
                <File size={14} className="text-[#75beff]" />
              )}
            </span>
            <div className="flex-1 min-w-0">
              <InlineInput
                placeholder={rootCreating === "folder" ? "folder name" : "file name"}
                onConfirm={handleRootCreate}
                onCancel={() => setRootCreating(null)}
              />
            </div>
          </div>
        )}

        {/* Empty state */}
        {tree.length === 0 && !rootCreating ? (
          <div className="flex flex-col items-center justify-center mt-16 gap-3 text-[#555]">
            <FolderOpen size={36} strokeWidth={1} />
            <p className="text-[12px] text-center leading-relaxed">
              No files yet.
              <br />
              Use the buttons above to get started.
            </p>
          </div>
        ) : (
          tree.map((node) => (
            <TreeNode
              key={node.id}
              node={node}
              depth={0}
              onInsert={onInsert}
              onRename={onRename}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
