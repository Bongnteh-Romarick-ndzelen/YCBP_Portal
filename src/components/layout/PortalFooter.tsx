// src/components/layout/PortalFooter.tsx
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export const PortalFooter: React.FC = () => {
    const { theme } = useAuth();

    return (
        <footer className={`py-6 border-t ${theme === 'dark' ? 'bg-slate-900 border-slate-700 text-slate-400' : 'bg-gray-200 border-gray-300 text-slate-600'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs">
                <p className="font-semibold mb-1">YCBP - Building Cameroon's Next Generation of Cyber Defenders</p>
                <p>Target: Train 10,000+ Youths by 2027. Empowering talent through ethical hacking and secure coding.</p>
            </div>
        </footer>
    );
};