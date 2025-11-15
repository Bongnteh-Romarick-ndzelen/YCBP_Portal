// src/App.tsx
import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { PortalProvider } from './contexts/PortalContext';

// Import Pages
import { Login, SignUp } from './pages/LoginAndSignUp';
import { CyberChallenges } from './pages/CyberChallenges';
import { Leaderboard } from './pages/Leaderboard';
import { Mentorship } from './pages/Mentorship';

// Import Layout Component
import { PortalLayout } from './components/layout/PortalLayout';


// --- Application Router Component ---
const AppRouter: React.FC = () => {
    const { isLoggedIn, activeView, theme } = useAuth();

    // Top-Level Routing based on Auth Status
    const renderContent = () => {
        if (!isLoggedIn) {
            if (activeView === 'signup') {
                return <SignUp />;
            }
            return <Login />; // Default unauthenticated view is Login
        }

        // Authenticated Views (wrapped in PortalProvider for data access)
        return (
            <PortalProvider>
                <PortalLayout>
                    {activeView === 'challenges' && <CyberChallenges />}
                    {activeView === 'leaderboard' && <Leaderboard />}
                    {activeView === 'mentorship' && <Mentorship />}
                </PortalLayout>
            </PortalProvider>
        );
    };

    const containerClasses = theme === 'dark'
        ? 'bg-slate-900 text-slate-50 min-h-screen font-sans transition-colors duration-500'
        : 'bg-gray-100 text-slate-900 min-h-screen font-sans transition-colors duration-500';

    return (
        <div className={containerClasses} style={{ fontFamily: 'Inter, sans-serif' }}>
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