import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';

// --- Global Constants & Mocks ---
const MOCK_USER_ID = crypto.randomUUID();
const INITIAL_CHALLENGES = [
    { id: 'c1', title: 'Network Recon 101', description: 'Find the hidden service port.', difficulty_level: 'Bronze', points: 50, category: 'Nmap', status: 'Incomplete' },
    { id: 'c2', title: 'Injection Fortress', description: 'Bypass a simple login page using SQL injection.', difficulty_level: 'Silver', points: 150, category: 'Web App', status: 'Incomplete' },
    { id: 'c3', title: 'Secure Code Audit', description: 'Identify 3 XSS vulnerabilities in the provided Python code.', difficulty_level: 'Gold', points: 300, category: 'Secure Coding', status: 'Incomplete' },
];
const INITIAL_LEADERBOARD = [
    { userId: MOCK_USER_ID, fullName: 'Local Defender', totalPoints: 0, rank: 0, badge: 'None' },
    { userId: 'u1', fullName: 'Kwame Botwe', totalPoints: 1250, rank: 1, badge: 'National Cyber Defender' },
    { userId: 'u2', fullName: 'Fatimata Diallo', totalPoints: 980, rank: 2, badge: 'Gold' },
    { userId: 'u3', fullName: 'Jean-Pierre N.', totalPoints: 750, rank: 3, badge: 'Silver' },
];

const BADGE_CRITERIA = {
    Bronze: 50,
    Silver: 500,
    Gold: 1000,
    'National Cyber Defender': 2000,
};

const navItems = [
    { key: 'challenges', label: 'Cyber Challenges' },
    { key: 'leaderboard', label: 'Leaderboard' },
    { key: 'mentorship', label: 'Mentorship Hub' },
];

// --- Contexts ---

// 1. AuthContext: Manages user session and mock auth actions
const AuthContext = createContext();

// 2. PortalContext: Manages application data (Challenges, Leaderboard)
const PortalContext = createContext();


// --- Utility Functions & Components ---

const getBadgeForPoints = (points) => {
    if (points >= BADGE_CRITERIA['National Cyber Defender']) return 'National Cyber Defender';
    if (points >= BADGE_CRITERIA.Gold) return 'Gold';
    if (points >= BADGE_CRITERIA.Silver) return 'Silver';
    if (points >= BADGE_CRITERIA.Bronze) return 'Bronze';
    return 'None';
};

const BadgeIcon = ({ level, className = '' }) => {
    let color = 'text-gray-400';
    let icon = 'M12 2a10 10 0 100 20 10 10 0 000-20zM12 4a8 8 0 110 16 8 8 0 010-16z';

    if (level === 'Bronze') {
        color = 'text-amber-500';
        icon = 'M16.5 6l-4.5 9-4.5-9h9z';
    } else if (level === 'Silver') {
        color = 'text-slate-400';
        icon = 'M12 2l-2.4 7.2h4.8L12 2zm-5.6 14.8l2.4-7.2h6.4l2.4-7.2h-6.4l-2.4 7.2z';
    } else if (level === 'Gold' || level === 'National Cyber Defender') {
        color = 'text-yellow-500';
        icon = 'M12 2l3.09 6.31 6.91.99-5 4.87 1.18 6.88L12 18l-6.18 3.05 1.18-6.88-5-4.87 6.91-.99L12 2z';
    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${color} ${className}`} viewBox="0 0 24 24" fill="currentColor">
            <path d={icon} />
        </svg>
    );
};

// --- AUTHENTICATION COMPONENTS ---

const AuthLayout = ({ children, theme, title, linkText, linkTarget, onNavigate }) => (
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

const Login = () => {
    const { login, theme, navigate } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (email && password) {
            // Mock login logic
            login(MOCK_USER_ID, 'Local Defender');
        } else {
            setError('Please enter both email and password.');
        }
    };

    const inputClasses = theme === 'dark'
        ? 'w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:ring-cyan-500 focus:border-cyan-500'
        : 'w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-slate-900 focus:ring-cyan-500 focus:border-cyan-500';

    return (
        <AuthLayout
            theme={theme}
            title="Sign In"
            linkText="Don't have an account? Sign Up"
            linkTarget="signup"
            onNavigate={navigate}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputClasses}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={inputClasses}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-lg transition duration-150 shadow-lg shadow-cyan-500/50"
                >
                    Log In
                </button>
            </form>
        </AuthLayout>
    );
};

const SignUp = () => {
    const { theme, navigate } = useContext(AuthContext);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (fullName && email && password) {
            // Mock signup logic (auto-logs in for simulation)
            navigate('login');
            // In a real app, this would create the user and then call login.
        } else {
            setError('Please fill in all fields.');
        }
    };

    const inputClasses = theme === 'dark'
        ? 'w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:ring-cyan-500 focus:border-cyan-500'
        : 'w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-slate-900 focus:ring-cyan-500 focus:border-cyan-500';

    return (
        <AuthLayout
            theme={theme}
            title="Sign Up"
            linkText="Already have an account? Sign In"
            linkTarget="login"
            onNavigate={navigate}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <div>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className={inputClasses}
                        required
                    />
                </div>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputClasses}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password (min 6 characters)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={inputClasses}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg transition duration-150 shadow-lg shadow-green-500/50"
                >
                    Create Account
                </button>
            </form>
        </AuthLayout>
    );
};

// --- CORE PORTAL COMPONENTS (Views) ---

const ChallengeCard = ({ challenge, onSolve }) => {
    const { theme } = useContext(AuthContext);
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

const ChallengesView = () => {
    const { challenges, handleChallengeSolve } = useContext(PortalContext);
    const { theme } = useContext(AuthContext);

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

const LeaderboardView = () => {
    const { leaderboard } = useContext(PortalContext);
    const { theme } = useContext(AuthContext);

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

const MentorshipView = () => {
    const { theme } = useContext(AuthContext);

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

// --- LAYOUT COMPONENTS ---

const PortalHeader = () => {
    const { theme, toggleTheme, user, logout, activeView, setActiveView } = useContext(AuthContext);
    const { userBadge, userPoints } = useContext(PortalContext);

    return (
        <header className={`py-4 shadow-lg ${theme === 'dark' ? 'bg-slate-800/90 backdrop-blur-sm' : 'bg-white shadow-slate-200'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <h1 className="text-2xl font-black tracking-tighter flex items-center">
                    <span className="text-cyan-500">YCBP</span>
                    <span className={`${theme === 'dark' ? 'text-white' : 'text-slate-900'} ml-1`}>Portal</span>
                </h1>

                <nav className="hidden md:flex space-x-4">
                    {navItems.map(item => (
                        <button
                            key={item.key}
                            onClick={() => setActiveView(item.key)}
                            className={`text-sm font-semibold py-2 px-3 rounded-lg transition duration-200 ${activeView === item.key
                                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/50'
                                : (theme === 'dark' ? 'text-slate-300 hover:text-cyan-400 hover:bg-slate-700' : 'text-slate-600 hover:text-cyan-600 hover:bg-gray-200')
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="flex items-center space-x-4">
                    {/* User Profile / Status */}
                    <div className={`p-2 rounded-lg flex items-center text-sm font-medium ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-200'}`}>
                        <div className="flex flex-col text-right mr-3">
                            <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{user.fullName}</span>
                            <span className="text-xs text-cyan-500 flex items-center justify-end">
                                <BadgeIcon level={userBadge} className="mr-1 h-4 w-4" />
                                {userBadge} Defender ({userPoints} pts)
                            </span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-mono ${theme === 'dark' ? 'bg-slate-900 text-slate-600' : 'bg-gray-300 text-gray-500'}`}>
                            {user.userId.substring(0, 8)}...
                        </span>
                    </div>

                    <button
                        onClick={logout}
                        className={`p-2 rounded-full transition duration-300 ${theme === 'dark' ? 'bg-red-700 text-white hover:bg-red-600' : 'bg-red-500 text-white hover:bg-red-600'}`}
                        aria-label="Logout"
                        title="Logout"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                    </button>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-full transition duration-300 ${theme === 'dark' ? 'bg-slate-700 text-cyan-400 hover:bg-slate-600' : 'bg-gray-200 text-cyan-600 hover:bg-gray-300'}`}
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.746a.75.75 0 10-1.06-1.06l-1.591 1.59a.75.75 0 001.06 1.06l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.803 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.06 1.06l1.59 1.591zM12 18.75a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zM5.006 17.069a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.06l1.591-1.59zM3 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3.75A.75.75 0 013 12zM6.746 5.006a.75.75 0 00-1.06-1.06L4.09 5.531a.75.75 0 101.06 1.06l1.59-1.59z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9.5307 20.3016a10.5 10.5 0 01-1.12-14.9351 9.75 9.75 0 0014.22 10.22 10.5 10.5 0 01-13.1 4.7151z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
            {/* Mobile Navigation */}
            <div className="md:hidden mt-4 px-4 sm:px-6">
                <div className="flex justify-between space-x-2">
                    {navItems.map(item => (
                        <button
                            key={item.key}
                            onClick={() => setActiveView(item.key)}
                            className={`flex-1 text-sm font-semibold py-2 rounded-lg transition duration-200 ${activeView === item.key
                                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/50'
                                : (theme === 'dark' ? 'text-slate-300 hover:text-cyan-400 hover:bg-slate-700' : 'text-slate-600 hover:text-cyan-600 hover:bg-gray-200')
                                }`}
                        >
                            {item.label.split(' ')[0]}
                        </button>
                    ))}
                </div>
            </div>
        </header>
    );
};

const PortalFooter = () => {
    const { theme } = useContext(AuthContext);

    return (
        <footer className={`py-6 border-t ${theme === 'dark' ? 'bg-slate-900 border-slate-700 text-slate-400' : 'bg-gray-200 border-gray-300 text-slate-600'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs">
                <p className="font-semibold mb-1">YCBP - Building Cameroon's Next Generation of Cyber Defenders</p>
                <p>Target: Train 10,000+ Youths by 2027. Empowering talent through ethical hacking and secure coding.</p>
            </div>
        </footer>
    );
};

const PortalLayout = ({ children }) => {
    const { theme } = useContext(AuthContext);

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


// --- CONTEXT PROVIDERS ---

// Portal Data Provider (Challenges & Leaderboard logic)
const PortalProvider = ({ children, user, isLoggedIn }) => {
    const [challenges, setChallenges] = useState(INITIAL_CHALLENGES);
    const [leaderboard, setLeaderboard] = useState(INITIAL_LEADERBOARD);

    // Dynamic User Stats
    const userEntry = useMemo(() => leaderboard.find(u => u.userId === user.userId), [leaderboard, user.userId]);
    const userPoints = userEntry ? userEntry.totalPoints : 0;
    const userBadge = getBadgeForPoints(userPoints);

    const handleChallengeSolve = useCallback((challengeId, points) => {
        if (!isLoggedIn) return; // Guard
        
        // 1. Update Challenge Status
        setChallenges(prevChallenges => prevChallenges.map(c =>
            c.id === challengeId ? { ...c, status: 'Complete' } : c
        ));

        // 2. Update Leaderboard Score (Simulation)
        setLeaderboard(prevLeaderboard => {
            let updatedUser;
            const newLeaderboard = prevLeaderboard.map(u => {
                if (u.userId === user.userId) {
                    updatedUser = {
                        ...u,
                        totalPoints: u.totalPoints + points,
                    };
                    return updatedUser;
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


// --- MAIN APP COMPONENT ---

const App = () => {
    // Auth State (User Session & Routing)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({ userId: MOCK_USER_ID, fullName: 'Local Defender' });
    const [activeView, setActiveView] = useState('login'); // login, signup, challenges, leaderboard, mentorship
    const [theme, setTheme] = useState('dark');

    // Auth Actions
    const login = useCallback((userId, fullName) => {
        setUser({ userId, fullName });
        setIsLoggedIn(true);
        setActiveView('challenges'); // Navigate to main view after login
    }, []);

    const logout = useCallback(() => {
        setIsLoggedIn(false);
        setActiveView('login');
        setUser({ userId: '', fullName: '' });
    }, []);

    const navigate = useCallback((view) => {
        setActiveView(view);
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    }, []);

    const authContextValue = useMemo(() => ({
        isLoggedIn,
        user,
        theme,
        activeView,
        login,
        logout,
        navigate,
        toggleTheme,
        setActiveView,
    }), [isLoggedIn, user, theme, activeView, login, logout, navigate, toggleTheme]);

    // Top-Level Routing based on Auth Status
    const renderContent = () => {
        if (!isLoggedIn) {
            if (activeView === 'signup') {
                return <SignUp />;
            }
            return <Login />; // Default unauthenticated view
        }

        // Authenticated Views (wrapped in PortalProvider for data access)
        return (
            <PortalProvider user={user} isLoggedIn={isLoggedIn}>
                <PortalLayout>
                    {activeView === 'challenges' && <ChallengesView />}
                    {activeView === 'leaderboard' && <LeaderboardView />}
                    {activeView === 'mentorship' && <MentorshipView />}
                </PortalLayout>
            </PortalProvider>
        );
    };

    const containerClasses = theme === 'dark'
        ? 'bg-slate-900 text-slate-50 min-h-screen font-sans transition-colors duration-500'
        : 'bg-gray-100 text-slate-900 min-h-screen font-sans transition-colors duration-500';

    return (
        <AuthContext.Provider value={authContextValue}>
            <div className={containerClasses} style={{ fontFamily: 'Inter, sans-serif' }}>
                {renderContent()}
            </div>
        </AuthContext.Provider>
    );
};

export default App;