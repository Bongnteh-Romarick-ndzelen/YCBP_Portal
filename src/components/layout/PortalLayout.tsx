// src/components/layout/PortalLayout.tsx
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { PortalHeader } from './PortalHeader';
import { PortalFooter } from './PortalFooter';

export const PortalLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { theme } = useAuth();

    const containerClasses = theme === 'dark'
        ? 'bg-slate-900 text-slate-50 min-h-screen font-sans transition-colors duration-500'
        : 'bg-gray-100 text-slate-900 min-h-screen font-sans transition-colors duration-500';

    return (
        <div className={containerClasses} style={{ fontFamily: 'Inter, sans-serif' }}>
            <PortalHeader />
            <main className="max-w-7xl mx-auto pb-12">
                {children}
            </main>
            <PortalFooter />
        </div>
    );
};