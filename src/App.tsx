// src/App.tsx
import React from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { PortalProvider } from "./contexts/PortalContext";

// Import Pages
import { Login, SignUp } from "./pages/LoginAndSignUp";
import { CyberChallenges } from "./pages/CyberChallenges";
import { Leaderboard } from "./pages/Leaderboard";
import { Mentorship } from "./pages/Mentorship";
// 1. Import the new ChallengeDetail page
import { ChallengeDetail } from "./pages/ChallengeDetails";

// Import Layout Component
import { PortalLayout } from "./components/layout/PortalLayout";

// --- Application Router Component ---
const AppRouter: React.FC = () => {
  const { isLoggedIn, activeView, theme } = useAuth();

  // Top-Level Routing based on Auth Status
  const renderContent = () => {
    if (!isLoggedIn) {
      // Unauthenticated Views
      if (activeView === "signup") {
        return <SignUp />;
      }
      return <Login />; // Default unauthenticated view is Login
    }

    // --- Authenticated Views ---

    // 2. Check for the Challenge Detail View
    if (activeView.startsWith("challenge-")) {
      // Extract the challengeId from the activeView string (e.g., 'challenge-c1' -> 'c1')
      const challengeId = activeView.split("-")[1];

      return (
        <PortalProvider>
          <PortalLayout>
            {/* Render the specific challenge detail page */}
            <ChallengeDetail challengeId={challengeId} />
          </PortalLayout>
        </PortalProvider>
      );
    }

    // 3. Render all other standard Authenticated Views
    return (
      <PortalProvider>
        <PortalLayout>
          {activeView === "challenges" && <CyberChallenges />}
          {activeView === "leaderboard" && <Leaderboard />}
          {activeView === "mentorship" && <Mentorship />}
        </PortalLayout>
      </PortalProvider>
    );
  };

  const containerClasses =
    theme === "dark"
      ? "bg-slate-900 text-slate-50 min-h-screen font-sans transition-colors duration-500"
      : "bg-gray-100 text-slate-900 min-h-screen font-sans transition-colors duration-500";

  return (
    <div
      className={containerClasses}
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {renderContent()}
    </div>
  );
};

// --- Main App Export (Provider Wrapper) ---
const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

export default App;
