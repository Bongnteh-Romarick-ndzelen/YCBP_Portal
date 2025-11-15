// src/pages/Leaderboard.tsx
import React from 'react';
import { usePortal } from '../contexts/PortalContext';
import { useAuth } from '../contexts/AuthContext';
import { BadgeIcon } from '../components/common/BadgeIcon';

export const Leaderboard: React.FC = () => {
    const { leaderboard } = usePortal();
    const { theme } = useAuth();

    return (
        <div className="p-4 md:p-8">
            <h2 className={`text-3xl font-extrabold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>National Leaderboard</h2>
            <div className={`overflow-x-auto rounded-xl shadow-2xl ${theme === 'dark' ? 'bg-slate-800/90' : 'bg-white shadow-slate-300'}`}>
                <table className="min-w-full divide-y divide-slate-700/50">
                    <thead>
                        <tr className={`${theme === 'dark' ? 'bg-slate-700' : 'bg-cyan-50'}`}>
                            <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>Rank</th>
                            <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>Name</th>
                            <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>Total Points</th>
                            <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>Current Badge</th>
                            <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>User ID (Mock)</th>
                        </tr>
                    </thead>
                    <tbody className={`${theme === 'dark' ? 'divide-y divide-slate-700' : 'divide-y divide-gray-200'}`}>
                        {leaderboard.map((user, index) => (
                            <tr key={user.userId} className={`${theme === 'dark' ? (index % 2 === 0 ? 'bg-slate-800' : 'bg-slate-800/50') : (index % 2 === 0 ? 'bg-white' : 'bg-gray-50')} transition duration-150 hover:bg-cyan-900/10`}>
                                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>
                                    {user.rank <= 3 ? (
                                        <span className="text-2xl font-black">{user.rank}.</span>
                                    ) : (
                                        `${user.rank}.`
                                    )}
                                </td>
                                <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-slate-50' : 'text-slate-900'}`}>{user.fullName}</td>
                                <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{user.totalPoints}</td>
                                <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                                    <span className="flex items-center">
                                        <BadgeIcon level={user.badge} className="mr-2" />
                                        {user.badge}
                                    </span>
                                </td>
                                <td className={`px-6 py-4 whitespace-nowrap text-xs font-mono ${theme === 'dark' ? 'text-slate-600' : 'text-gray-400'}`}>{user.userId.substring(0, 8)}...</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};