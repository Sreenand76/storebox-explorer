/**
 * TitleBar
 *
 * macOS-style window chrome: traffic-light dots + centered title.
 *
 * Props:
 *   title – string shown in the center of the bar
 */
export function TitleBar({ title = "File Explorer" }) {
  return (
    <div className="bg-[#323233] px-4 py-2.5 flex items-center gap-2 border-b border-[#3e3e3e]">
      <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
      <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
      <span className="w-3 h-3 rounded-full bg-[#28c840]" />
      <span className="text-[12px] text-[#888] ml-auto mr-auto tracking-wide font-mono">
        {title}
      </span>
    </div>
  );
}
