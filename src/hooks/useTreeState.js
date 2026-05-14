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

  const insert = useCallback((parentId, node) => {
    setTree((t) => insertNode(t, parentId, node));
  }, []);

  const rename = useCallback((id, name) => {
    setTree((t) => renameNode(t, id, name));
  }, []);

  const remove = useCallback((id) => {
    setTree((t) => deleteNode(t, id));
  }, []);

  const addToRoot = useCallback((type, name) => {
    const node = type === "folder" ? makeFolder(name) : makeFile(name);
    setTree((t) => [...t, node]);
  }, []);

  return { tree, insert, rename, remove, addToRoot };
}
