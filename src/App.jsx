import { useTreeState } from "./hooks/useTreeState";
import { Explorer } from "./components/Explorer";
import { TitleBar } from "./components/Titlebar";

/**
 * App
 *
 * Root component. Owns tree state via useTreeState and passes
 * mutation callbacks down to Explorer.
 */
export default function App() {
  const { tree, insert, rename, remove, addToRoot } = useTreeState();

  return (
    <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center p-6">
      <div
        className="w-full max-w-sm bg-[#252526] rounded-xl overflow-hidden shadow-2xl border border-[#3e3e3e]"
        style={{ height: 580 }}
      >
        <TitleBar title="File Explorer" />

        <div style={{ height: "calc(100% - 40px)" }}>
          <Explorer
            tree={tree}
            onInsert={insert}
            onRename={rename}
            onDelete={remove}
            onAddToRoot={addToRoot}
          />
        </div>
      </div>
    </div>
  );
}
