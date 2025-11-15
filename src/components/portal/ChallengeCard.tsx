// src/components/portal/ChallengeCard.tsx
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import  type { Challenge } from '../../utils/constants';

interface ChallengeCardProps {
    challenge: Challenge;
    onSolve: (id: string, points: number) => void;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, onSolve }) => {
    const { theme } = useAuth();
    const isCompleted = challenge.status === 'Complete';
    const colorMap = {
        Bronze: 'border-amber-500/50 hover:bg-amber-900/20',
        Silver: 'border-slate-400/50 hover:bg-slate-700/20',
        Gold: 'border-yellow-500/50 hover:bg-yellow-900/20',
    };

    const cardClasses = theme === 'dark'
        ? `p-4 rounded-xl shadow-xl backdrop-blur-sm bg-slate-800/80 border ${colorMap[challenge.difficulty_level]}`
        : `p-4 rounded-xl shadow-lg bg-white border border-gray-200 hover:shadow-cyan-200/50`;

    return (
        <div className={`${cardClasses} transition duration-300 transform ${isCompleted ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}>
            <div className="flex justify-between items-start">
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-slate-50' : 'text-slate-900'}`}>{challenge.title}</h3>
                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${isCompleted ? 'bg-green-600 text-white' : 'bg-cyan-600/50 text-cyan-200'}`}>
                    {isCompleted ? 'SOLVED' : challenge.difficulty_level}
                </span>
            </div>
            <p className={`text-sm mt-1 line-clamp-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{challenge.description}</p>
            <div className={`flex justify-between items-center mt-3 pt-3 border-t ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'}`}>
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{challenge.points} Points</p>
                <button
                    onClick={() => !isCompleted && onSolve(challenge.id, challenge.points)}
                    disabled={isCompleted}
                    className={`text-sm font-semibold py-1 px-4 rounded-full transition duration-150 ${isCompleted ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/40'}`}
                >
                    {isCompleted ? 'Completed' : 'Capture Flag'}
                </button>
            </div>
        </div>
    );
};