import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Globe, 
  Github, 
  Twitter,
  Camera,
  Save,
  Edit3
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

export const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    bio: 'Full-stack developer passionate about creating beautiful web experiences with AI.',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
    github: 'johndoe',
    twitter: '@johndoe',
    joinDate: 'January 2024',
    projectsCreated: 24,
    totalViews: '12.5K'
  });
  const { theme, toggleTheme } = useTheme();

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save profile logic here
  };

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
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
                Profile Settings
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant="outline"
                size="sm"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
              
              {isEditing && (
                <Button
                  onClick={handleSave}
                  variant="primary"
                  size="sm"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              )}
              
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-white/80 dark:bg-gray-700/80 border border-gray-200/50 dark:border-gray-600/50 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-2xl">
              {/* Avatar */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="text-xl font-bold text-center bg-transparent border-b border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {profile.name}
                  </h2>
                )}
                
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {profile.email}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {profile.projectsCreated}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Projects
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {profile.totalViews}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Views
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Bio
                </h3>
                {isEditing ? (
                  <textarea
                    value={profile.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {profile.bio}
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Profile Information
              </h3>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{profile.email}</p>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Location
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{profile.location}</p>
                    )}
                  </div>
                </div>

                {/* Website */}
                <div className="flex items-center gap-4">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Website
                    </label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={profile.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <a 
                        href={profile.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {profile.website}
                      </a>
                    )}
                  </div>
                </div>

                {/* GitHub */}
                <div className="flex items-center gap-4">
                  <Github className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      GitHub
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.github}
                        onChange={(e) => handleInputChange('github', e.target.value)}
                        className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <a 
                        href={`https://github.com/${profile.github}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        @{profile.github}
                      </a>
                    )}
                  </div>
                </div>

                {/* Twitter */}
                <div className="flex items-center gap-4">
                  <Twitter className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Twitter
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.twitter}
                        onChange={(e) => handleInputChange('twitter', e.target.value)}
                        className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <a 
                        href={`https://twitter.com/${profile.twitter.replace('@', '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {profile.twitter}
                      </a>
                    )}
                  </div>
                </div>

                {/* Join Date */}
                <div className="flex items-center gap-4">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Member Since
                    </label>
                    <p className="text-gray-900 dark:text-white">{profile.joinDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};