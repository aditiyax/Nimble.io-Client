import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { AuthPage } from "./components/auth/AuthPage";
import { DashboardPage } from "./components/dashboard/DashboardPage";
import { ProfilePage } from "./components/profile/ProfilePage";
import { SettingsPage } from "./components/settings/SettingsPage";
import { WorkspacePage } from "./components/workspace/WorkspacePage";

// Protected Route Component
// const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const { isAuthenticated } = useAuth();
//   return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />;
// };

// Public Route Component (redirect to dashboard if authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/dashboard" replace />
  );
};

function AppContent() {
  return (
    <div className="min-h-screen transition-colors duration-300">
      <Routes>
        <Route
          path="/auth"
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            // <ProtectedRoute>
            <DashboardPage />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            // <ProtectedRoute>
            <ProfilePage />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            // <ProtectedRoute>
            <SettingsPage />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/workspace/:projectId?"
          element={
            // <ProtectedRoute>
            <WorkspacePage />
            /* </ProtectedRoute> */
          }
        />
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
