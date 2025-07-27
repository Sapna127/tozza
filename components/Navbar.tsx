'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="bg-gray-50 dark:bg-green-600 p-2 shadow-md fixed w-[600px] top-5 left-1/2 transform -translate-x-1/2 flex rounded-lg justify-center align-middle">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          {/* Icon */}
          <svg width="30" height="30" viewBox="0 0 64 65" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* ... your existing path ... */}
            <path fill={theme === 'dark' ? 'white' : 'black'} d="..." />
          </svg>
        </div>

        <div className="flex-1 text-center">
          <h1 className="text-lg font-bold text-gray-700 dark:text-white">Tozza</h1>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="text-black dark:text-white focus:outline-none"
          >
            {/* Toggle Icon */}
            {theme === 'dark' ? (
              // Sun icon for light mode
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m8-9h1M4 12H3m15.364 6.364l-.707.707M6.343 6.343l-.707-.707m12.728 0l-.707-.707M6.343 17.657l-.707.707"
                />
              </svg>
            ) : (
              // Moon icon for dark mode
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293a8 8 0 11-10.586-10.586A8.001 8.001 0 0017.293 13.293z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
