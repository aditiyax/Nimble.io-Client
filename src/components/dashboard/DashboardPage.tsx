import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Send, Sparkles, Zap, Code, Palette } from "lucide-react";
import { Button } from "../ui/Button";
import { Sidebar } from "./Sidebar";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";

interface ChatHistory {
  id: string;
  title: string;
  timestamp: Date;
  preview: string;
}

export const DashboardPage: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedChatId, setSelectedChatId] = useState<string>();
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [chatHistory] = useState<ChatHistory[]>([
    {
      id: "1",
      title: "E-commerce Store",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      preview:
        "Modern e-commerce website with product catalog and shopping cart",
    },
    {
      id: "2",
      title: "Portfolio Website",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      preview: "Creative portfolio for a photographer with image gallery",
    },
    {
      id: "3",
      title: "Restaurant Landing",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      preview: "Restaurant website with menu and reservation system",
    },
    {
      id: "4",
      title: "SaaS Dashboard",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      preview: "Modern SaaS application dashboard with analytics",
    },
    {
      id: "5",
      title: "Blog Platform",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      preview: "Personal blog with article management and comments",
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      // Navigate to workspace with the prompt
      navigate(`/workspace?prompt=${encodeURIComponent(prompt)}`);
    }
  };

  const handleNewChat = () => {
    setSelectedChatId(undefined);
    setPrompt("");
  };

  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
    const chat = chatHistory.find((c) => c.id === chatId);
    if (chat) {
      navigate(`/workspace/${chatId}`);
    }
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleSettingsClick = () => {
    navigate("/settings");
  };

  const features = [
    {
      icon: Zap,
      title: "AI-Powered",
      description: "Generate websites instantly with advanced AI",
    },
    {
      icon: Code,
      title: "Clean Code",
      description: "Production-ready, maintainable code output",
    },
    {
      icon: Palette,
      title: "Beautiful Design",
      description: "Stunning, responsive designs out of the box",
    },
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-pink-900/20 flex">
      {/* Sidebar */}
      <Sidebar
        chatHistory={chatHistory}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onProfileClick={handleProfileClick}
        onSettingsClick={handleSettingsClick}
        selectedChatId={selectedChatId}
        user={user}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Create Your Website
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Describe your vision and let AI bring it to life
              </p>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-3xl">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-pink-600 rounded-2xl mb-6"
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4"
              >
                Build Websites
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
                  with AI Magic
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto"
              >
                Describe your dream website and watch as our AI brings it to
                life with beautiful, responsive code in seconds.
              </motion.p>
            </motion.div>

            {/* Prompt Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-10"
            >
              <form onSubmit={handleSubmit} className="relative">
                <div className="relative">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your website... (e.g., 'A modern portfolio site for a photographer with a dark theme and image gallery')"
                    className="w-full h-24 p-4 pr-14 text-base bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white shadow-lg"
                  />
                  <Button
                    type="submit"
                    disabled={!prompt.trim()}
                    className="absolute bottom-3 right-3"
                    size="sm"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-xl"
                  >
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-pink-600 rounded-lg mb-3">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
