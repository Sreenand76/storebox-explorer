// ─── ID & Node Factories ─────────────────────────────────────────────────────

export const uid = () => Math.random().toString(36).slice(2, 9);

export const makeFile = (name) => ({ id: uid(), name, type: "file" });

export const makeFolder = (name, children = []) => ({
  id: uid(),
  name,
  type: "folder",
  children,
});

// ─── Immutable Tree Operations ────────────────────────────────────────────────

/**
 * Insert `node` as a child of the node with `parentId`.
 */
export const insertNode = (tree, parentId, node) =>
  tree.map((n) => {
    if (n.id === parentId && n.type === "folder") {
      
      if ((n.children ?? []).some((child) => child.name.toLowerCase() === node.name.toLowerCase())) {
        throw new Error(`A file or folder named "${node.name}" already exists at this location.`);
      }
      return { ...n, children: [...(n.children ?? []), node] };
    }
    if (n.type === "folder")
      return { ...n, children: insertNode(n.children ?? [], parentId, node) };
    return n;
  });

/**
 * Rename the node with `id` to `name`.
 */
export const renameNode = (tree, id, name) => {
 
  const isTargetAtThisLevel = tree.some((n) => n.id === id);
  if (isTargetAtThisLevel) {
    const isDuplicate = tree.some((n) => n.name.toLowerCase() === name.toLowerCase() && n.id !== id);
    if (isDuplicate) {
      throw new Error(`A file or folder named "${name}" already exists at this location.`);
    }
  }

  return tree.map((n) => {
    if (n.id === id) return { ...n, name };
    if (n.type === "folder")
      return { ...n, children: renameNode(n.children ?? [], id, name) };
    return n;
  });
};

/**
 * Remove the node with `id` from the tree.
 */
export const deleteNode = (tree, id) =>
  tree
    .filter((n) => n.id !== id)
    .map((n) =>
      n.type === "folder"
        ? { ...n, children: deleteNode(n.children ?? [], id) }
        : n
    );
