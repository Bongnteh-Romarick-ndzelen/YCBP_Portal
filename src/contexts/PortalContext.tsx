// src/contexts/PortalContext.tsx

import React, {
  useState,
  useMemo,
  useCallback,
  createContext,
  useContext,
} from "react";

// --- VALUE IMPORTS (Runtime JS values) ---
import {
  INITIAL_CHALLENGES,
  INITIAL_LEADERBOARD,
  getBadgeForPoints,
} from "../utils/constants";

// --- TYPE IMPORTS (Compile-time TS definitions) ---
import type { Challenge, LeaderboardEntry } from "../utils/constants";

import { useAuth } from "./AuthContext";

// --- Context Definition ---
interface PortalContextType {
  challenges: Challenge[];
  leaderboard: LeaderboardEntry[];
  userPoints: number;
  userBadge: string;
  handleChallengeSolve: (challengeId: string, points: number) => void;
}

export const PortalContext = createContext<PortalContextType | undefined>(
  undefined
);

// --- Provider Component ---
export const PortalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Get user and auth status from AuthContext
  const { user, isLoggedIn } = useAuth();

  // State Initialization
  const [challenges, setChallenges] = useState(INITIAL_CHALLENGES);
  const [leaderboard, setLeaderboard] = useState(INITIAL_LEADERBOARD);

  // Dynamic User Stats
  // NOTE: This assumes the user entry (user.userId) exists in INITIAL_LEADERBOARD.
  const userEntry = useMemo(
    () => leaderboard.find((u) => u.userId === user.userId),
    [leaderboard, user.userId]
  );
  const userPoints = userEntry ? userEntry.totalPoints : 0;
  const userBadge = getBadgeForPoints(userPoints); // getBadgeForPoints is imported as a value

  const handleChallengeSolve = useCallback(
    (challengeId: string, points: number) => {
      if (!isLoggedIn) return;

      // 1. Update Challenge Status (Set to 'Complete')
      setChallenges((prevChallenges) =>
        prevChallenges.map((c) =>
          c.id === challengeId ? { ...c, status: "Complete" } : c
        )
      );

      // 2. Update Leaderboard Score
      setLeaderboard((prevLeaderboard) => {
        const newLeaderboard = prevLeaderboard.map((u) => {
          if (u.userId === user.userId) {
            return {
              ...u,
              totalPoints: u.totalPoints + points,
            };
          }
          return u;
        });

        // Re-sort, re-rank, and update badges based on new totals
        const sortedLeaderboard = newLeaderboard.sort(
          (a, b) => b.totalPoints - a.totalPoints
        );
        return sortedLeaderboard.map((u, index) => ({
          ...u,
          rank: index + 1,
          badge: getBadgeForPoints(u.totalPoints),
        }));
      });
    },
    [isLoggedIn, user.userId]
  ); // Dependencies ensure function updates when necessary

  // Memoize the final context value
  const contextValue = useMemo(
    () => ({
      challenges,
      leaderboard,
      userPoints,
      userBadge,
      handleChallengeSolve,
    }),
    [challenges, leaderboard, userPoints, userBadge, handleChallengeSolve]
  );

  return (
    <PortalContext.Provider value={contextValue}>
      {children}
    </PortalContext.Provider>
  );
};

// --- Custom Hook for Consumption ---
export const usePortal = () => {
  const context = useContext(PortalContext);
  if (context === undefined) {
    throw new Error("usePortal must be used within a PortalProvider");
  }
  return context;
};
