// src/contexts/PortalContext.tsx
import React, { useState, useMemo, useCallback, createContext, useContext } from 'react';
import { INITIAL_CHALLENGES, INITIAL_LEADERBOARD, getBadgeForPoints, Challenge, LeaderboardEntry } from '../utils/constants';
import { useAuth } from './AuthContext';

interface PortalContextType {
    challenges: Challenge[];
    leaderboard: LeaderboardEntry[];
    userPoints: number;
    userBadge: string;
    handleChallengeSolve: (challengeId: string, points: number) => void;
}

export const PortalContext = createContext<PortalContextType | undefined>(undefined);

// Portal Data Provider (Challenges & Leaderboard logic)
export const PortalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, isLoggedIn } = useAuth();
    const [challenges, setChallenges] = useState(INITIAL_CHALLENGES);
    const [leaderboard, setLeaderboard] = useState(INITIAL_LEADERBOARD);

    // Dynamic User Stats
    const userEntry = useMemo(() => leaderboard.find(u => u.userId === user.userId), [leaderboard, user.userId]);
    const userPoints = userEntry ? userEntry.totalPoints : 0;
    const userBadge = getBadgeForPoints(userPoints);

    const handleChallengeSolve = useCallback((challengeId: string, points: number) => {
        if (!isLoggedIn) return; // Guard
         
        // 1. Update Challenge Status
        setChallenges(prevChallenges => prevChallenges.map(c =>
            c.id === challengeId ? { ...c, status: 'Complete' } : c
        ));

        // 2. Update Leaderboard Score (Simulation)
        setLeaderboard(prevLeaderboard => {
            const newLeaderboard = prevLeaderboard.map(u => {
                if (u.userId === user.userId) {
                    return {
                        ...u,
                        totalPoints: u.totalPoints + points,
                    };
                }
                return u;
            });

            // Re-sort, re-rank, and update badges
            const sortedLeaderboard = newLeaderboard.sort((a, b) => b.totalPoints - a.totalPoints);
            return sortedLeaderboard.map((u, index) => ({
                ...u,
                rank: index + 1,
                badge: getBadgeForPoints(u.totalPoints),
            }));
        });
    }, [isLoggedIn, user.userId]);

    const contextValue = useMemo(() => ({
        challenges,
        leaderboard,
        userPoints,
        userBadge,
        handleChallengeSolve,
    }), [challenges, leaderboard, userPoints, userBadge, handleChallengeSolve]);

    return (
        <PortalContext.Provider value={contextValue}>
            {children}
        </PortalContext.Provider>
    );
};

export const usePortal = () => {
    const context = useContext(PortalContext);
    if (context === undefined) {
        throw new Error('usePortal must be used within a PortalProvider');
    }
    return context;
};