// src/pages/Mentorship.tsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export const Mentorship: React.FC = () => {
    const { theme } = useAuth();

    return (
        <div className="p-4 md:p-8">
            <h2 className={`text-3xl font-extrabold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>Mentorship Hub & Secure Sandbox</h2>
            <div className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-slate-800/90' : 'bg-white shadow-lg'}`}>
                <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>Secure Sandbox Console</h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} mb-4`}>
                    Launch your Dockerized lab environments here. (Simulation only - requires external integration).
                </p>
                <button className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg transition duration-150">
                    Launch Sandbox Environment
                </button>
                <div className={`mt-8 border-t pt-4 ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'}`}>
                    <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>Mentor Chat Forum</h3>
                    <div className={`h-40 p-4 rounded-lg overflow-y-auto ${theme === 'dark' ? 'bg-slate-900 border border-slate-700' : 'bg-gray-100 border border-gray-300'}`}>
                        <p className={`text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-gray-400'}`}>
                            [Simulation: Real-time chat powered by Socket.io would appear here.]
                        </p>
                        <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>
                            Mentor Kwasi: Welcome to the Web App Security room! Let me know your questions about Challenge C2.
                        </p>
                    </div>
                    <input
                        type="text"
                        placeholder="Type your message to the mentor..."
                        className={`mt-3 w-full p-2 rounded-lg text-sm transition duration-150 ${theme === 'dark' ? 'bg-slate-700 text-white border border-slate-600 focus:ring-cyan-500' : 'bg-white border border-gray-300 focus:ring-cyan-500'}`}
                    />
                </div>
            </div>
        </div>
    );
};