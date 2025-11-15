// src/components/common/AuthLayout.tsx
import React from 'react';
import { View } from '../../utils/constants';

interface AuthLayoutProps {
    children: React.ReactNode;
    theme: 'light' | 'dark';
    title: string;
    linkText: string;
    linkTarget: View;
    onNavigate: (view: View) => void;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, theme, title, linkText, linkTarget, onNavigate }) => (
    <div className={`flex items-center justify-center min-h-screen ${theme === 'dark' ? 'bg-slate-900' : 'bg-gray-100'}`}>
        <div className={`w-full max-w-md p-8 rounded-xl shadow-2xl ${theme === 'dark' ? 'bg-slate-800/90 text-white' : 'bg-white text-slate-800'}`}>
            <h2 className="text-4xl font-extrabold text-cyan-500 mb-6">{title}</h2>
            {children}
            <div className="mt-6 text-center">
                <button
                    onClick={() => onNavigate(linkTarget)}
                    className="text-sm font-medium text-cyan-500 hover:text-cyan-400 transition duration-150"
                >
                    {linkText}
                </button>
            </div>
        </div>
    </div>
);