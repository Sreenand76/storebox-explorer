import { useState } from "react";
import { ChevronRight, ChevronDown, Folder, File } from "lucide-react";
import { makeFile, makeFolder } from "../utils/tree";
import { InlineInput } from "./InlineInput";
import { NodeIcon } from "./NodeIcon";
import { NodeActions } from "./NodeActions";

/**
 * TreeNode
 *
 * Renders a single file or folder row, then recursively renders children.
 *
 * Props:
 *   node      – { id, name, type, children? }
 *   depth     – nesting level (0 = root)
 *   onInsert(parentId, node) – insert a child node
 *   onRename(id, name)       – rename this node
 *   onDelete(id)             – delete this node
 */
export function TreeNode({ node, depth, onInsert, onRename, onDelete }) {
  const [open, setOpen] = useState(depth === 0);
  const [hovered, setHovered] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [creating, setCreating] = useState(null); // "file" | "folder" | null

  const indent = depth * 12 + 8;
  const isFolder = node.type === "folder";

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleToggle = () => {
    if (isFolder) setOpen((o) => !o);
  };

  const handleRename = (name) => {
    onRename(node.id, name);
    setRenaming(false);
  };

  const handleCreate = (name) => {
    const child = creating === "folder" ? makeFolder(name) : makeFile(name);
    onInsert(node.id, child);
    setOpen(true);
    setCreating(null);
  };

  const startCreating = (type) => {
    setCreating(type);
    setOpen(true);
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div>
      {/* ── Row ── */}
      <div
        className="group relative flex items-center gap-1 py-[2px] cursor-pointer select-none rounded-sm hover:bg-[#2a2d2e] transition-colors duration-75"
        style={{ paddingLeft: indent }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleToggle}
      >
        {/* Chevron */}
        {isFolder ? (
          <span className="text-[#cccccc] flex-shrink-0 w-3.5">
            {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          </span>
        ) : (
          <span className="w-3.5 flex-shrink-0" />
        )}

        {/* Icon */}
        <span className="flex-shrink-0">
          <NodeIcon
            type={node.type}
            isOpen={open}
            filename={node.name}
          />
        </span>

        {/* Name or inline rename */}
        {renaming ? (
          <div className="flex-1 min-w-0 pr-2" onClick={(e) => e.stopPropagation()}>
            <InlineInput
              placeholder={node.name}
              defaultValue={node.name}
              onConfirm={handleRename}
              onCancel={() => setRenaming(false)}
            />
          </div>
        ) : (
          <span className="text-[13px] text-[#cccccc] font-mono truncate flex-1">
            {node.name}
          </span>
        )}

        {/* Hover actions */}
        {!renaming && hovered && (
          <NodeActions
            isFolder={isFolder}
            onNewFile={() => startCreating("file")}
            onNewFolder={() => startCreating("folder")}
            onRename={() => setRenaming(true)}
            onDelete={() => onDelete(node.id)}
          />
        )}
      </div>

      {/* ── Children (animated) ── */}
      {isFolder && (
        <div
          style={{
            overflow: "hidden",
            maxHeight: open ? "9999px" : "0px",
            opacity: open ? 1 : 0,
            transition: "max-height 0.2s ease, opacity 0.15s ease",
          }}
        >
          {/* Inline create row */}
          {creating && (
            <div
              className="flex items-center gap-1 py-[2px]"
              style={{ paddingLeft: indent + 28 }}
            >
              <span className="flex-shrink-0">
                {creating === "folder" ? (
                  <Folder size={14} className="text-[#e8ab4f]" />
                ) : (
                  <File size={14} className="text-[#75beff]" />
                )}
              </span>
              <div className="flex-1 min-w-0 pr-2">
                <InlineInput
                  placeholder={creating === "folder" ? "folder name" : "file name"}
                  onConfirm={handleCreate}
                  onCancel={() => setCreating(null)}
                />
              </div>
            </div>
          )}

          {/* Children or empty-folder message */}
          {(node.children ?? []).length === 0 && !creating ? (
            <p
              className="text-[11px] text-[#555] italic py-1"
              style={{ paddingLeft: indent + 28 }}
            >
              empty folder
            </p>
          ) : (
            (node.children ?? []).map((child) => (
              <TreeNode
                key={child.id}
                node={child}
                depth={depth + 1}
                onInsert={onInsert}
                onRename={onRename}
                onDelete={onDelete}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
