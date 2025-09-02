import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronDown,
  File,
  Folder,
  FolderOpen,
} from "lucide-react";
// 1. IMPORT the single, correct FileItem type from your shared types file
import { FileItem } from "../../types";

// 2. DEFINE the props for this component using the imported type
interface FileExplorerProps {
  files: FileItem[];
  onFileSelect: (file: FileItem) => void;
}

// A helper component to render each item in the tree
const FileTreeItem: React.FC<{
  item: FileItem;
  onFileSelect: (file: FileItem) => void;
  expandedFolders: string[];
  toggleFolder: (path: string) => void;
  level: number;
}> = ({ item, onFileSelect, expandedFolders, toggleFolder, level }) => {
  const isFolder = item.type === "folder";
  const isExpanded = expandedFolders.includes(item.path);
  const paddingLeft = `${level * 16}px`; // Indent based on depth

  return (
    <div>
      <div
        onClick={() => {
          if (isFolder) {
            toggleFolder(item.path);
          } else {
            onFileSelect(item);
          }
        }}
        className="flex items-center gap-2 p-1.5 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 text-xs"
        style={{ paddingLeft }}
      >
        {isFolder ? (
          <>
            {isExpanded ? (
              <ChevronDown size={14} className="text-gray-500" />
            ) : (
              <ChevronRight size={14} className="text-gray-500" />
            )}
            {isExpanded ? (
              <FolderOpen size={14} className="text-blue-500" />
            ) : (
              <Folder size={14} className="text-blue-500" />
            )}
          </>
        ) : (
          <>
            <div className="w-[14px]" /> {/* Spacer for alignment */}
            <File size={14} className="text-gray-500" />
          </>
        )}
        <span className="truncate text-gray-700 dark:text-gray-300">
          {item.name}
        </span>
      </div>
      <AnimatePresence>
        {isFolder && isExpanded && item.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {item.children.map((child) => (
              <FileTreeItem
                key={child.path}
                item={child}
                onFileSelect={onFileSelect}
                expandedFolders={expandedFolders}
                toggleFolder={toggleFolder}
                level={level + 1}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 3. THE MAIN COMPONENT updated to accept and use props
export const FileExplorer: React.FC<FileExplorerProps> = ({
  files,
  onFileSelect,
}) => {
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);

  const toggleFolder = (folderPath: string) => {
    setExpandedFolders((prev) =>
      prev.includes(folderPath)
        ? prev.filter((path) => !path.startsWith(folderPath)) // Collapse folder and subfolders
        : [...prev, folderPath]
    );
  };

  // Automatically expand root folders when files are first loaded
  React.useEffect(() => {
    const rootFolders = files
      .filter((f) => f.type === "folder")
      .map((f) => f.path);
    setExpandedFolders(rootFolders);
  }, [files]);

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          File Explorer
        </h3>
      </div>
      <div className="p-1.5 overflow-y-auto h-full">
        {/* Use the 'files' prop instead of 'sampleFiles' */}
        {files.map((item) => (
          <FileTreeItem
            key={item.path}
            item={item}
            onFileSelect={onFileSelect}
            expandedFolders={expandedFolders}
            toggleFolder={toggleFolder}
            level={0}
          />
        ))}
      </div>
    </div>
  );
};
