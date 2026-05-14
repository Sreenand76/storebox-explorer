import { makeFile, makeFolder } from "./tree";

export const INITIAL_TREE = [
  makeFolder("src", [
    makeFolder("components", [
      makeFile("Button.tsx"),
      makeFile("Tree.tsx"),
      makeFile("TreeNode.tsx"),
    ]),
    makeFile("App.tsx"),
    makeFile("main.tsx"),
    makeFile("index.css"),
  ]),
  makeFolder("public", [makeFile("vite.svg")]),
  makeFile("package.json"),
  makeFile("README.md"),
];
