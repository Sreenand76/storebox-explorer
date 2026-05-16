import { useState, useCallback } from "react";
import { insertNode, renameNode, deleteNode, makeFile, makeFolder } from "../utils/tree";
import { INITIAL_TREE } from "../utils/initialData";

/**
 * useTreeState
 *
 * Owns the file-tree array and exposes stable callbacks for every
 * mutation. Components never touch the raw setter directly.
 */
export function useTreeState() {
  const [tree, setTree] = useState(INITIAL_TREE);
  const [error, setError] = useState(null);

  const clearError = useCallback(() => setError(null), []);

  const insert = useCallback((parentId, node) => {
    let newError = null;
    setTree((t) => {
      try {
        return insertNode(t, parentId, node);
      } catch (err) {
        newError = err.message;
        return t;
      }
    });
    if (newError) setError(newError);
  }, []);

  const rename = useCallback((id, name) => {
    let newError = null;
    setTree((t) => {
      try {
        return renameNode(t, id, name);
      } catch (err) {
        newError = err.message;
        return t;
      }
    });
    if (newError) setError(newError);
  }, []);

  const remove = useCallback((id) => {
    setTree((t) => deleteNode(t, id));
  }, []);

  const addToRoot = useCallback((type, name) => {
    let newError = null;
    setTree((t) => {
      
      if (t.some((node) => node.name.toLowerCase() === name.toLowerCase())) {
        newError = `A file or folder named "${name}" already exists at this location.`;
        return t;
      }
      const node = type === "folder" ? makeFolder(name) : makeFile(name);
      return [...t, node];
    });
    if (newError) setError(newError);
  }, []);

  return { tree, insert, rename, remove, addToRoot, error, clearError };
}
