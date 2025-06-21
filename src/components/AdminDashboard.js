import React, { useState, useEffect } from 'react';
import { FiHome, FiUsers, FiSettings, FiMenu, FiMoon, FiSun } from 'react-icons/fi';

export default function AdminDashboard() {
  // Dark mode state with persistence
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) return stored === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Track which page is active
  const [activePage, setActivePage] = useState('dashboard');
  // Control dropdown visibility for Settings
  const [settingsDropdownOpen, setSettingsDropdownOpen] = useState(false);

  // Handle clicking Settings
  const handleSettingsClick = () => {
    setActivePage('settings');
    setSettingsDropdownOpen(!settingsDropdownOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md hidden md:block">
        <div className="p-4 text-xl font-bold border-b border-gray-200 dark:border-gray-700">
          Admin Panel
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            <li
              onClick={() => {
                setActivePage('dashboard');
                setSettingsDropdownOpen(false);
              }}
              className={`px-4 py-2 flex items-center gap-2 cursor-pointer rounded
                ${
                  activePage === 'dashboard'
                    ? 'bg-indigo-600 text-white dark:bg-indigo-500'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
            >
              <FiHome /> Dashboard
            </li>
            <li
              onClick={() => {
                setActivePage('users');
                setSettingsDropdownOpen(false);
              }}
              className={`px-4 py-2 flex items-center gap-2 cursor-pointer rounded
                ${
                  activePage === 'users'
                    ? 'bg-indigo-600 text-white dark:bg-indigo-500'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
            >
              <FiUsers /> Users
            </li>
            {/* Settings with dropdown */}
            <li
              onClick={handleSettingsClick}
              className={`px-4 py-2 flex items-center gap-2 cursor-pointer rounded justify-between
                ${
                  activePage === 'settings'
                    ? 'bg-indigo-600 text-white dark:bg-indigo-500'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
            >
              <div className="flex items-center gap-2">
                <FiSettings /> Settings
              </div>
              <span className="select-none">{settingsDropdownOpen ? '▲' : '▼'}</span>
            </li>

            {/* Dropdown menu */}
            {settingsDropdownOpen && (
              <ul className="bg-white dark:bg-gray-700 rounded-b-md shadow-md ml-6">
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 rounded-b-md"
                  onClick={() => alert('Login clicked!')}
                >
                  Login
                </li>
              </ul>
            )}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold capitalize">{activePage}</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xl p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {activePage === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-2">Users</h2>
                <p>1,234 active users</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-2">Revenue</h2>
                <p>$12,345 this month</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-2">System Status</h2>
                <p>All systems operational</p>
              </div>
            </div>
          )}

          {activePage === 'users' && (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Users List</h2>
              <ul className="space-y-2">
                <li className="border-b border-gray-300 dark:border-gray-700 pb-2">
                  <strong>John Doe</strong> - john@example.com
                </li>
                <li className="border-b border-gray-300 dark:border-gray-700 pb-2">
                  <strong>Jane Smith</strong> - jane@example.com
                </li>
                <li className="border-b border-gray-300 dark:border-gray-700 pb-2">
                  <strong>Bob Johnson</strong> - bob@example.com
                </li>
              </ul>
            </div>
          )}

          {activePage === 'settings' && (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Settings</h2>
              <p>Use the dropdown menu on the sidebar to select Login.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
