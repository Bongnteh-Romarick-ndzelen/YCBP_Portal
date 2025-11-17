// src/utils/constants.ts

// --- Global Constants & Mocks ---
// NOTE: I am keeping the crypto.randomUUID() usage, but remember this can cause
// issues in environments that don't support it, as discussed earlier.
export const MOCK_USER_ID = crypto.randomUUID();

// --- UPDATED CHALLENGE DATA with solution_flag ---
export const INITIAL_CHALLENGES = [
  {
    id: "c1",
    title: "Network Recon 101",
    description: "Find the hidden service port.",
    difficulty_level: "Bronze",
    points: 50,
    category: "Nmap",
    status: "Incomplete",
    solution_flag: "FLAG{c1_SECRET}", // Added mock flag
  },
  {
    id: "c2",
    title: "Injection Fortress",
    description: "Bypass a simple login page using SQL injection.",
    difficulty_level: "Silver",
    points: 150,
    category: "Web App",
    status: "Incomplete",
    solution_flag: "FLAG{c2_SECRET}", // Added mock flag
  },
  {
    id: "c3",
    title: "Secure Code Audit",
    description: "Identify 3 XSS vulnerabilities in the provided Python code.",
    difficulty_level: "Gold",
    points: 300,
    category: "Secure Coding",
    status: "Incomplete",
    solution_flag: "FLAG{c3_SECRET}", // Added mock flag
  },
];

export const INITIAL_LEADERBOARD = [
  {
    userId: MOCK_USER_ID,
    fullName: "Local Defender",
    totalPoints: 0,
    rank: 0,
    badge: "None",
  },
  {
    userId: "u1",
    fullName: "Kwame Botwe",
    totalPoints: 1250,
    rank: 1,
    badge: "National Cyber Defender",
  },
  {
    userId: "u2",
    fullName: "Fatimata Diallo",
    totalPoints: 980,
    rank: 2,
    badge: "Gold",
  },
  {
    userId: "u3",
    fullName: "Jean-Pierre N.",
    totalPoints: 750,
    rank: 3,
    badge: "Silver",
  },
];

export const BADGE_CRITERIA = {
  Bronze: 50,
  Silver: 500,
  Gold: 1000,
  "National Cyber Defender": 2000,
};

export const navItems = [
  { key: "challenges", label: "Cyber Challenges" },
  { key: "leaderboard", label: "Leaderboard" },
  { key: "mentorship", label: "Mentorship Hub" },
];

// --- Utility Functions ---

export const getBadgeForPoints = (points) => {
  if (points >= BADGE_CRITERIA["National Cyber Defender"])
    return "National Cyber Defender";
  if (points >= BADGE_CRITERIA.Gold) return "Gold";
  if (points >= BADGE_CRITERIA.Silver) return "Silver";
  if (points >= BADGE_CRITERIA.Bronze) return "Bronze";
  return "None";
};

// --- Interfaces (Recommended for TypeScript) ---

// --- UPDATED CHALLENGE INTERFACE ---
export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty_level: "Bronze" | "Silver" | "Gold";
  points: number;
  category: string;
  status: "Incomplete" | "Complete";
  solution_flag: string; // <<< New required field for mock validation
}

export interface LeaderboardEntry {
  userId: string;
  fullName: string;
  totalPoints: number;
  rank: number;
  badge: string;
}

export type View =
  | "login"
  | "signup"
  | "challenges"
  | "leaderboard"
  | "mentorship"
  | `challenge-${string}`;
// I also updated 'View' to allow dynamic challenge URLs for better type safety
