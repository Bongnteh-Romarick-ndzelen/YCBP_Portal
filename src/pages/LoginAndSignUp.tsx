// src/pages/LoginAndSignUp.tsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AuthLayout } from '../components/common/AuthLayout';
import { MOCK_USER_ID } from '../utils/constants';

// --- Login Component ---
export const Login: React.FC = () => {
    const { login, theme, navigate } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
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

// --- Sign Up Component ---
export const SignUp: React.FC = () => {
    const { theme, navigate } = useAuth();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (fullName && email && password) {
            // Mock signup logic (just redirects to login for simulation)
            navigate('login');
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