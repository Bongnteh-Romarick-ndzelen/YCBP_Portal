// src/components/layout/PortalHeader.tsx
import React, { useState } from "react"; // 1. Import useState for mobile menu state
import { useAuth } from "../../contexts/AuthContext";
import { usePortal } from "../../contexts/PortalContext";
import { navItems } from "../../utils/constants";
import { BadgeIcon } from "../common/BadgeIcon";

export const PortalHeader: React.FC = () => {
  const { theme, toggleTheme, user, logout, activeView, setActiveView } = useAuth();
  const { userBadge, userPoints } = usePortal(); 
  
  // State to control the mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Reusable Nav Link Component
  const NavLink: React.FC<{ item: typeof navItems[0] }> = ({ item }) => (
    <button
      key={item.key}
      onClick={() => {
        setActiveView(item.key);
        setIsMenuOpen(false); // Close menu on mobile after clicking a link
      }}
      className={`text-sm font-semibold py-2 px-3 rounded-lg transition duration-200 w-full md:w-auto text-left ${
        activeView === item.key
          ? "bg-cyan-600 text-white shadow-md shadow-cyan-500/50"
          : theme === "dark"
          ? "text-slate-300 hover:text-cyan-400 hover:bg-slate-700"
          : "text-slate-600 hover:text-cyan-600 hover:bg-gray-200"
      }`}
    >
      {item.label}
    </button>
  );

  // Theme Toggle Button
  const ThemeToggleButton: React.FC = () => (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition duration-300 ${
        theme === "dark"
          ? "bg-slate-700 text-cyan-400 hover:bg-slate-600"
          : "bg-gray-200 text-cyan-600 hover:bg-gray-300"
      }`}
      aria-label="Toggle Theme"
      title="Toggle Theme"
    >
      {theme === "dark" ? (
        // Sun Icon
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.746a.75.75 0 10-1.06-1.06l-1.591 1.59a.75.75 0 001.06 1.06l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.803 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.06 1.06l1.59 1.591zM12 18.75a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zM5.006 17.069a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.06l1.591-1.59zM3 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3.75A.75.75 0 013 12zM6.746 5.006a.75.75 0 00-1.06-1.06L4.09 5.531a.75.75 0 101.06 1.06l1.59-1.59z" />
        </svg>
      ) : (
        // Moon Icon
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.5307 20.3016a10.5 10.5 0 01-1.12-14.9351 9.75 9.75 0 0014.22 10.22 10.5 10.5 0 01-13.1 4.7151z" />
        </svg>
      )}
    </button>
  );

  return (
    <header
      className={`py-4 shadow-lg sticky top-0 z-10 ${
        theme === "dark"
          ? "bg-slate-800/90 backdrop-blur-sm"
          : "bg-white shadow-slate-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Top Row: Logo, Desktop Nav, and Icons --- */}
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <h1 className="text-2xl font-black tracking-tighter flex items-center shrink-0">
            <span className="text-cyan-500">YCBP</span>
            <span className={`${theme === "dark" ? "text-white" : "text-slate-900"} ml-1`}>Portal</span>
          </h1>

          {/* Desktop Navigation (Visible on MD and larger) */}
          <nav className="hidden md:flex space-x-4 ml-auto mr-6">
            {navItems.map((item) => (
              <NavLink key={item.key} item={item} />
            ))}
          </nav>

          {/* User Status and Action Buttons (Combined) */}
          <div className="flex items-center space-x-2 md:space-x-4 shrink-0">
            
            {/* User Info (Hidden on small screens for space) */}
            <div
              className={`hidden sm:flex p-2 rounded-lg items-center text-sm font-medium ${
                theme === "dark" ? "bg-slate-700/50" : "bg-gray-200"
              }`}
            >
              <div className="flex flex-col text-right mr-3 whitespace-nowrap">
                <span className={`font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{user.fullName}</span>
                <span className="text-xs text-cyan-500 flex items-center justify-end">
                  <BadgeIcon level={userBadge} className="mr-1 h-4 w-4" />
                  {userBadge} ({userPoints} pts)
                </span>
              </div>
              <span
                className={`hidden md:block px-2 py-0.5 rounded-full text-xs font-mono ${
                  theme === "dark" ? "bg-slate-900 text-slate-600" : "bg-gray-300 text-gray-500"
                }`}
              >
                {user.userId.substring(0, 8)}...
              </span>
            </div>

            {/* Logout Button (Always visible) */}
            <button
              onClick={logout}
              className={`p-2 rounded-full transition duration-300 ${
                theme === "dark" ? "bg-red-700 text-white hover:bg-red-600" : "bg-red-500 text-white hover:bg-red-600"
              }`}
              aria-label="Logout"
              title="Logout"
            >
              {/* Logout Icon SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
            </button>
            
            {/* Theme Toggle Button (Always visible) */}
            <ThemeToggleButton />

            {/* Mobile Menu Toggle Button (Visible only on MD and smaller) */}
            <button 
                onClick={toggleMenu} 
                className={`md:hidden p-2 rounded-full ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                aria-label="Toggle navigation menu"
            >
                {isMenuOpen ? (
                    // Close/X Icon
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    // Hamburger Icon
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                )}
            </button>
          </div>
        </div>

        {/* --- Mobile Menu Drawer --- */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          {/* Mobile Navigation Links */}
          <nav className="flex flex-col space-y-2 pb-4">
            {navItems.map((item) => (
              <NavLink key={item.key} item={item} />
            ))}
          </nav>
          
          {/* Mobile User Info (Simplified for small screens) */}
          <div className={`p-3 rounded-lg flex justify-between items-center text-sm font-medium ${
                theme === "dark" ? "bg-slate-700/50" : "bg-gray-200"
              }`}
          >
              <span className={`font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  Logged in as: {user.fullName}
              </span>
              <span className="text-xs text-cyan-500 flex items-center">
                  <BadgeIcon level={userBadge} className="mr-1 h-4 w-4" />
                  {userBadge} ({userPoints} pts)
              </span>
          </div>

        </div>
      </div>
    </header>
  );
};