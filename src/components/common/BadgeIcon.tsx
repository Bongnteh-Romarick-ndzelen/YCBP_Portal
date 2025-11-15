// src/components/common/BadgeIcon.tsx
import React from 'react';

interface BadgeIconProps {
    level: string;
    className?: string;
}

export const BadgeIcon: React.FC<BadgeIconProps> = ({ level, className = '' }) => {
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