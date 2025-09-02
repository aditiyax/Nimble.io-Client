import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Moon, 
  Sun, 
  Bell, 
  Shield, 
  Key, 
  Trash2,
  Download,
  Upload,
  Globe,
  Palette,
  Monitor,
  Smartphone
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useTheme } from '../../contexts/ThemeContext';

export const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      marketing: false
    },
    privacy: {
      profilePublic: true,
      showEmail: false,
      allowIndexing: true
    },
    preferences: {
      language: 'en',
      timezone: 'UTC-8',
      dateFormat: 'MM/DD/YYYY'
    }
  });

  const handleToggle = (section: string, key: string) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: !prev[section as keyof typeof prev][key as keyof typeof prev[typeof section]]
      }
    }));
  };

  const handleSelect = (section: string, key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-pink-900/20">
      {/* Header */}
      <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={handleBack}
                variant="ghost"
                size="sm"
                className="p-1.5"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Settings
              </h1>
            </div>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/80 dark:bg-gray-700/80 border border-gray-200/50 dark:border-gray-600/50 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="space-y-8">
          {/* Appearance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Palette className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Appearance
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Theme
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'light', label: 'Light', icon: Sun },
                    { id: 'dark', label: 'Dark', icon: Moon },
                    { id: 'system', label: 'System', icon: Monitor }
                  ].map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.id}
                        onClick={() => option.id !== 'system' && toggleTheme()}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          (option.id === theme) || (option.id === 'system' && theme === 'dark')
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        <Icon className="w-6 h-6 mx-auto mb-2 text-gray-600 dark:text-gray-400" />
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {option.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Notifications
              </h2>
            </div>

            <div className="space-y-4">
              {[
                { key: 'email', label: 'Email notifications', description: 'Receive updates via email' },
                { key: 'push', label: 'Push notifications', description: 'Browser push notifications' },
                { key: 'marketing', label: 'Marketing emails', description: 'Product updates and tips' }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {item.label}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {item.description}
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle('notifications', item.key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.notifications[item.key as keyof typeof settings.notifications]
                        ? 'bg-blue-600'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.notifications[item.key as keyof typeof settings.notifications]
                          ? 'translate-x-6'
                          : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Privacy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Privacy & Security
              </h2>
            </div>

            <div className="space-y-4">
              {[
                { key: 'profilePublic', label: 'Public profile', description: 'Make your profile visible to others' },
                { key: 'showEmail', label: 'Show email', description: 'Display email on public profile' },
                { key: 'allowIndexing', label: 'Search indexing', description: 'Allow search engines to index your profile' }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {item.label}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {item.description}
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle('privacy', item.key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.privacy[item.key as keyof typeof settings.privacy]
                        ? 'bg-blue-600'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.privacy[item.key as keyof typeof settings.privacy]
                          ? 'translate-x-6'
                          : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Data Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Key className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Data Management
              </h2>
            </div>

            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-5 h-5 mr-3" />
                Export Data
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Upload className="w-5 h-5 mr-3" />
                Import Data
              </Button>
              
              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 border-red-200 hover:border-red-300">
                <Trash2 className="w-5 h-5 mr-3" />
                Delete Account
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};