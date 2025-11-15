// src/pages/CyberChallenges.tsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usePortal } from '../contexts/PortalContext';
import { ChallengeCard } from '../components/portal/ChallengeCard';

export const CyberChallenges: React.FC = () => {
    const { challenges, handleChallengeSolve } = usePortal();
    const { theme } = useAuth();

    return (
        <div className="p-4 md:p-8">
            <h2 className={`text-3xl font-extrabold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>Cyber Challenges (CTF)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {challenges.map(c => (
                    <ChallengeCard key={c.id} challenge={c} onSolve={handleChallengeSolve} />
                ))}
            </div>
        </div>
    );
};