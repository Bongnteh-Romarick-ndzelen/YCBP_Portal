// src/contexts/AuthContext.tsx
import React, { useState, useMemo, useCallback, createContext, useContext } from 'react';
import { MOCK_USER_ID, View } from '../utils/constants';

interface User {
    userId: string;
    fullName: string;
}

interface AuthContextType {
    isLoggedIn: boolean;
    user: User;
    theme: 'light' | 'dark';
    activeView: View;
    login: (userId: string, fullName: string) => void;
    logout: () => void;
    navigate: (view: View) => void;
    toggleTheme: () => void;
    setActiveView: (view: View) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Auth State (User Session & Routing)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User>({ userId: MOCK_USER_ID, fullName: 'Local Defender' });
    const [activeView, setActiveView] = useState<View>('login'); // login, signup, challenges, leaderboard, mentorship
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    // Auth Actions
    const login = useCallback((userId: string, fullName: string) => {
        setUser({ userId, fullName });
        setIsLoggedIn(true);
        setActiveView('challenges'); // Navigate to main view after login
    }, []);

    const logout = useCallback(() => {
        setIsLoggedIn(false);
        setActiveView('login');
        setUser({ userId: '', fullName: '' });
    }, []);

    const navigate = useCallback((view: View) => {
        setActiveView(view);
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    }, []);

    const authContextValue = useMemo(() => ({
        isLoggedIn,
        user,
        theme,
        activeView,
        login,
        logout,
        navigate,
        toggleTheme,
        setActiveView,
    }), [isLoggedIn, user, theme, activeView, login, logout, navigate, toggleTheme]);

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};