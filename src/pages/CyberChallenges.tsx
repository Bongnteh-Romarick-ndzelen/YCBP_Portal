// src/pages/CyberChallenges.tsx
import React from 'react';
import { usePortal } from '../contexts/PortalContext';
import { useAuth } from '../contexts/AuthContext';

export const CyberChallenges: React.FC = () => {
  const { challenges } = usePortal();
  const { theme, navigate } = useAuth(); // Import navigate from useAuth
  
  const cardBgClass = theme === 'dark' ? 'bg-slate-800 shadow-cyan-900/50' : 'bg-white shadow-gray-300/50';
  const textClass = theme === 'dark' ? 'text-slate-300' : 'text-slate-700';

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold mb-6 text-cyan-500">Cyber Challenges 🛡️</h2>
      <p className={`mb-8 ${textClass}`}>Select a challenge to test your skills and earn points!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <div 
            key={challenge.id} 
            className={`p-6 rounded-xl shadow-lg transition-all duration-300 ${cardBgClass} ${
              challenge.status === 'Complete' ? 'opacity-70 border-l-4 border-green-500' : 'hover:shadow-xl'
            }`}
          >
            <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {challenge.title}
            </h3>
            <p className={`text-sm mb-3 ${textClass}`}>{challenge.description}</p>
            
            <div className="flex justify-between items-center text-xs mt-4 pt-4 border-t border-dashed border-slate-600/30">
              <span className={`px-2 py-1 rounded-full font-medium ${
                challenge.status === 'Complete' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-slate-900'
              }`}>
                {challenge.status}
              </span>
              <span className="font-bold text-lg text-cyan-500">
                {challenge.points} pts
              </span>
            </div>

            {/* This button now uses the navigate function to change the activeView */}
            <button
              onClick={() => navigate(`challenge-${challenge.id}`)}
              className="mt-4 w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition duration-200"
            >
              {challenge.status === 'Complete' ? 'View Details' : 'Start Challenge'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};