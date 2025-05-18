import { motion } from 'framer-motion';
import { SparklesIcon, SunIcon, MoonIcon, UserCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

function Navbar({ theme, setTheme }) {
  const [searchFocus, setSearchFocus] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 w-full shadow-md transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
      style={{ minHeight: 64 }}
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16">
        {/* Left: Logo and Title */}
        <div className="flex items-center space-x-2">
          <SparklesIcon className="w-8 h-8 text-blue-500" />
          <span className={`text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>VisuSpin</span>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 flex justify-center items-center">
          <div
            className={`relative flex items-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} rounded-full px-4 transition-all duration-200 ${
              searchFocus
                ? theme === 'dark'
                  ? 'border-2 border-blue-400'
                  : 'border-2 border-blue-500'
                : 'border border-transparent'
            }`}
            style={{ width: 320, height: 40 }}
          >
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className={`ml-3 bg-transparent outline-none border-none text-base ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}
              style={{ width: '100%', height: 28 }}
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setSearchFocus(false)}
            />
          </div>
        </div>

        {/* Right: Theme Toggle and Profile Icon */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`p-2 rounded-full ${
              theme === 'dark' ? 'bg-gray-700 text-yellow-300' : 'bg-gray-100 text-gray-700'
            } hover:bg-opacity-80 transition-colors`}
          >
            {theme === 'dark' ? (
              <SunIcon className="w-5 h-5" />
            ) : (
              <MoonIcon className="w-5 h-5" />
            )}
          </button>
          <button className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'} hover:bg-blue-500 hover:text-white transition-colors`}>
            <UserCircleIcon className="w-7 h-7" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar; 