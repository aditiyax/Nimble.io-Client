import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Github,
  Chrome,
  Sparkles,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "../ui/Button";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { loginSchema, signupSchema } from "../../lib/validation";

export const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const { theme, toggleTheme } = useTheme();
  const { login, signup, loginWithGoogle, loginWithGitHub, loading } =
    useAuth();
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    try {
      setError("");
      await loginWithGoogle();
      navigate("/dashboard");
    } catch (err) {
      setError("Google authentication failed");
    }
  };

  const handleGithubAuth = async () => {
    try {
      setError("");
      await loginWithGitHub();
      navigate("/dashboard");
    } catch (err) {
      setError("GitHub authentication failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      activeTab === "signup" &&
      formData.password !== formData.confirmPassword
    ) {
      setError("Passwords do not match");
      return;
    }

    if (activeTab === "login") {
      try {
        const parsed = loginSchema.safeParse({
          email: formData.email,
          password: formData.password,
        });
        if (!parsed.success) {
          throw new Error(
            parsed.error.issues[0]?.message || "Invalid credentials"
          );
        }
        // Call to /auth/login API
        const loginApiCall = await axios.post(
          `${process.env.VITE_API_BASE_URL}/auth/login`,
          {
            email: formData.email,
            password: formData.password,
          }
        );

        if (loginApiCall) {
          await login(formData.email, formData.password);
          navigate("/dashboard");
          console.log("New-user signed up successfully ! ", loginApiCall);
        } else {
          throw Error("Error From Login API !");
        }
      } catch (err) {
        setError("Invalid email or password");
      }
    } else {
      try {
        const parsed = signupSchema.safeParse({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        if (!parsed.success) {
          throw new Error(
            parsed.error.issues[0]?.message || "Invalid signup data"
          );
        }

        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          return;
        }

        const signupApiCall = await axios.post(
          `${process.env.VITE_API_BASE_URL}/auth/signup`,
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }
        );

        if (signupApiCall) {
          await signup(formData.name, formData.email, formData.password);
          navigate("/dashboard");
          console.log("New-user signed up successfully ! ", signupApiCall);
        } else {
          throw Error("Error From Login API !");
        }
      } catch (err) {
        setError("Signup failed. Please try again.");
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-pink-900/20 flex items-center justify-center p-6">
      {/* Theme Toggle */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm"
      >
        {/* Logo and Header */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-pink-600 rounded-xl mb-4"
          >
            <Sparkles className="w-6 h-6 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2"
          >
            WebCraft AI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-gray-600 dark:text-gray-400"
          >
            Create stunning websites with AI
          </motion.p>
        </div>

        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-6 shadow-xl"
        >
          {/* Tab Switcher */}
          <div className="flex mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            {["login", "signup"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as "login" | "signup")}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {tab === "login" ? "Login" : "Sign Up"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-xs text-center"
              >
                {error}
              </motion.div>
            )}

            {activeTab === "signup" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="relative"
              >
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                  required
                />
              </motion.div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {activeTab === "signup" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="relative"
              >
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                  required
                />
              </motion.div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : activeTab === "login"
                ? "Login"
                : "Create Account"}
            </Button>
          </form>

          <div className="my-4 flex items-center">
            <div className="flex-1 border-t border-gray-200 dark:border-gray-600"></div>
            <span className="px-4 text-sm text-gray-500 dark:text-gray-400">
              or continue with
            </span>
            <div className="flex-1 border-t border-gray-200 dark:border-gray-600"></div>
          </div>

          <div className="space-y-2">
            <Button
              onClick={handleGoogleAuth}
              variant="outline"
              size="md"
              className="w-full"
              disabled={loading}
            >
              <Chrome className="w-5 h-5 mr-3" />
              Continue with Google
            </Button>

            <Button
              onClick={handleGithubAuth}
              variant="outline"
              size="md"
              className="w-full"
              disabled={loading}
            >
              <Github className="w-5 h-5 mr-3" />
              Continue with GitHub
            </Button>
          </div>

          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
