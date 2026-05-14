import { Folder, FolderOpen, File } from "lucide-react";

import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiJson,
} from "react-icons/si";

/**
 * NodeIcon
 *
 * Renders the correct icon for files/folders.
 *
 * Props:
 *   type     – "file" | "folder"
 *   isOpen   – whether folder is expanded
 *   filename – file name (used for extension detection)
 */

export function NodeIcon({ type, isOpen, filename = "" }) {
  if (type === "folder") {
    return isOpen ? (
      <FolderOpen size={14} className="text-[#e8ab4f]" />
    ) : (
      <Folder size={14} className="text-[#e8ab4f]" />
    );
  }

  const ext = filename.split(".").pop()?.toLowerCase();

  switch (ext) {
    case "jsx":
    case "tsx":
      return <SiReact size={14} className="text-cyan-400" />;

    case "js":
      return <SiJavascript size={14} className="text-yellow-400" />;

    case "ts":
      return <SiTypescript size={14} className="text-blue-400" />;

    case "html":
      return <SiHtml5 size={14} className="text-orange-500" />;

    case "css":
      return <SiCss size={14} className="text-blue-500" />;

    case "json":
      return <SiJson size={14} className="text-yellow-300" />;

    default:
      return <File size={14} className="text-[#75beff]" />;
  }
}