import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { Monitor, Code, Maximize2, Minimize2 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface FileItem {
  name: string;
  type: 'file' | 'folder';
  content?: string;
}

interface CodeEditorProps {
  selectedFile: FileItem | null;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  selectedFile,
  isExpanded,
  onToggleExpand,
}) => {
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');
  const { theme } = useTheme();

  const getLanguage = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'tsx':
      case 'ts':
        return 'typescript';
      case 'jsx':
      case 'js':
        return 'javascript';
      case 'css':
        return 'css';
      case 'html':
        return 'html';
      case 'json':
        return 'json';
      default:
        return 'plaintext';
    }
  };

  const tabs = [
    { id: 'code' as const, label: 'Code', icon: Code },
    { id: 'preview' as const, label: 'Preview', icon: Monitor },
  ];

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Header with Tabs */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </motion.button>
            );
          })}
        </div>
        
        <motion.button
          onClick={onToggleExpand}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
        >
          {isExpanded ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </motion.button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'code' ? (
          selectedFile && selectedFile.type === 'file' ? (
            <Editor
              height="100%"
              language={getLanguage(selectedFile.name)}
              value={selectedFile.content || '// Select a file to view its content'}
              theme={theme === 'dark' ? 'vs-dark' : 'light'}
              options={{
                minimap: { enabled: true },
                fontSize: 13,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 12 },
              }}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <Code className="w-10 h-10 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                <p className="text-base font-medium mb-2">No file selected</p>
                <p className="text-sm">Select a file from the explorer to view its content</p>
              </div>
            </div>
          )
        ) : (
          <div className="h-full bg-white dark:bg-gray-800 flex items-center justify-center">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <Monitor className="w-10 h-10 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
              <p className="text-base font-medium mb-2">Preview</p>
              <p className="text-sm">Website preview will appear here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};