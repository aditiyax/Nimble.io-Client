import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Plus, 
  User, 
  Settings, 
  Clock,
  Sparkles,
  Trash2,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface ChatHistory {
  id: string;
  title: string;
  timestamp: Date;
  preview: string;
}

interface SidebarProps {
  chatHistory: ChatHistory[];
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onProfileClick: () => void;
  onSettingsClick: () => void;
  selectedChatId?: string;
  user: any;
}

export const Sidebar: React.FC<SidebarProps> = ({
  chatHistory,
  onNewChat,
  onSelectChat,
  onProfileClick,
  onSettingsClick,
  selectedChatId,
  user
}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="w-72 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 bg-gradient-to-r from-blue-600 to-pink-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-base font-semibold text-gray-900 dark:text-white">
            WebCraft AI
          </h1>
        </div>
        
        <motion.button
          onClick={onNewChat}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-2 p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          <span>New Website</span>
        </motion.button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-3">
        <h2 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
          Recent Projects
        </h2>
        
        <div className="space-y-1.5">
          {chatHistory.map((chat) => (
            <motion.div
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              whileHover={{ scale: 1.01 }}
              className={`p-2.5 rounded-lg cursor-pointer transition-all group ${
                selectedChatId === chat.id
                  ? 'bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800'
                  : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 dark:text-white text-xs truncate">
                    {chat.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2 leading-tight">
                    {chat.preview}
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                    <Clock className="w-2.5 h-2.5" />
                    <span>{formatTime(chat.timestamp)}</span>
                  </div>
                </div>
                
                <button className="opacity-0 group-hover:opacity-100 p-0.5 text-gray-400 hover:text-red-500 transition-all">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700 space-y-1.5">
        <div className="flex items-center gap-2 p-2 mb-2">
          <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-pink-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {user?.name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-gray-900 dark:text-white truncate">
              {user?.name || 'User'}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user?.email || 'user@example.com'}
            </div>
          </div>
        </div>

        <motion.button
          onClick={onProfileClick}
          whileHover={{ scale: 1.02 }}
          className="w-full flex items-center gap-2 p-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-sm"
        >
          <User className="w-4 h-4" />
          <span>Profile</span>
        </motion.button>
        
        <motion.button
          onClick={onSettingsClick}
          whileHover={{ scale: 1.02 }}
          className="w-full flex items-center gap-2 p-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-sm"
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </motion.button>
        
        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.02 }}
          className="w-full flex items-center gap-2 p-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-sm"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </motion.button>
      </div>
    </div>
  );
};