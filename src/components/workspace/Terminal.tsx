import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, X, Minus, Square } from 'lucide-react';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error';
  content: string;
  timestamp: Date;
}

export const Terminal: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: '1',
      type: 'output',
      content: 'WebCraft AI Terminal v1.0.0',
      timestamp: new Date()
    },
    {
      id: '2',
      type: 'output',
      content: '$ npm install',
      timestamp: new Date()
    },
    {
      id: '3',
      type: 'output',
      content: 'Installing dependencies... ✅',
      timestamp: new Date()
    },
    {
      id: '4',
      type: 'output',
      content: '$ npm run dev',
      timestamp: new Date()
    },
    {
      id: '5',
      type: 'output',
      content: 'Development server started on http://localhost:3000',
      timestamp: new Date()
    }
  ]);
  
  const [currentInput, setCurrentInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (command: string) => {
    const newLine: TerminalLine = {
      id: Date.now().toString(),
      type: 'input',
      content: `$ ${command}`,
      timestamp: new Date()
    };

    const outputLine: TerminalLine = {
      id: (Date.now() + 1).toString(),
      type: 'output',
      content: getCommandOutput(command),
      timestamp: new Date()
    };

    setLines(prev => [...prev, newLine, outputLine]);
    setCurrentInput('');
  };

  const getCommandOutput = (command: string): string => {
    switch (command.toLowerCase().trim()) {
      case 'ls':
        return 'src/  public/  package.json  README.md  tailwind.config.js';
      case 'pwd':
        return '/workspace/my-website';
      case 'npm run build':
        return 'Building application... ✅ Build completed successfully!';
      case 'clear':
        setLines([]);
        return '';
      case 'help':
        return 'Available commands: ls, pwd, npm run build, clear, help';
      default:
        return `Command not found: ${command}`;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentInput.trim()) {
      handleCommand(currentInput);
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <motion.div
      initial={{ height: isMinimized ? 32 : 160 }}
      animate={{ height: isMinimized ? 32 : 160 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-900 border-t border-gray-700 flex flex-col"
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-1.5">
          <TerminalIcon className="w-3 h-3 text-green-400" />
          <span className="text-xs font-medium text-gray-300">Terminal</span>
        </div>
        
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-0.5 text-gray-400 hover:text-gray-300 transition-colors"
          >
            <Minus className="w-2.5 h-2.5" />
          </button>
          <button className="p-0.5 text-gray-400 hover:text-gray-300 transition-colors">
            <Square className="w-2.5 h-2.5" />
          </button>
          <button className="p-0.5 text-gray-400 hover:text-red-400 transition-colors">
            <X className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>

      {/* Terminal Content */}
      {!isMinimized && (
        <div className="flex-1 flex flex-col">
          <div
            ref={terminalRef}
            onClick={focusInput}
            className="flex-1 p-3 overflow-y-auto font-mono text-xs cursor-text"
          >
            {lines.map((line) => (
              <motion.div
                key={line.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-0.5 ${
                  line.type === 'input'
                    ? 'text-green-400'
                    : line.type === 'error'
                    ? 'text-red-400'
                    : 'text-gray-300'
                }`}
              >
                {line.content}
              </motion.div>
            ))}
            
            <div className="flex items-center text-green-400">
              <span className="mr-2">$</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-transparent border-none outline-none text-gray-300 text-xs"
                placeholder="Type a command..."
                autoFocus
              />
              <motion.div
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-1.5 h-3 bg-green-400 ml-1"
              />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};