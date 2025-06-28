import React, { useState, useEffect } from "react";
import {
  FiHome,
  FiUsers,
  FiSettings,
  FiMoon,
  FiSun,
  FiTrash2,
} from "react-icons/fi";
import API from "../utils/API";

const api = new API();

export default function AdminDashboard() {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    return stored !== null
      ? stored === "true"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const [activePage, setActivePage] = useState("dashboard");
  const [settingsDropdownOpen, setSettingsDropdownOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [errorUsers, setErrorUsers] = useState(null);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    setErrorUsers(null);
    try {
      // GET /api/users retourne les users avec projectCount
      const data = await api.getData(api.apiUrl + "/api/users");
      setUsers(data);
    } catch (error) {
      setErrorUsers("Failed to load users");
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
      fetchUsers();
  }, [activePage]);

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.deleteData(api.apiUrl + `/api/users/${userId}`);
        // rafraîchir la liste
        fetchUsers();
      } catch (error) {
        alert("Failed to delete user");
      }
    }
  };

  const handleSettingsClick = () => {
    setActivePage("settings");
    setSettingsDropdownOpen(!settingsDropdownOpen);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500">Total Users</h3>
          <p className="text-3xl font-bold">{ users.length }</p>
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            <li
              onClick={() => {
                setActivePage("dashboard");
                setSettingsDropdownOpen(false);
              }}
              className={`px-4 py-2 flex items-center gap-2 cursor-pointer rounded transition ${
                activePage === "dashboard"
                  ? "bg-indigo-600 text-white dark:bg-indigo-500"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <FiHome /> Dashboard
            </li>
            <li
              onClick={() => {
                setActivePage("users");
                setSettingsDropdownOpen(false);
              }}
              className={`px-4 py-2 flex items-center gap-2 cursor-pointer rounded transition ${
                activePage === "users"
                  ? "bg-indigo-600 text-white dark:bg-indigo-500"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <FiUsers /> Users
            </li>
            <li
              onClick={handleSettingsClick}
              className={`px-4 py-2 flex items-center gap-2 cursor-pointer rounded justify-between transition ${
                activePage === "settings"
                  ? "bg-indigo-600 text-white dark:bg-indigo-500"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <FiSettings /> Settings
              </div>
              <span>{settingsDropdownOpen ? "▲" : "▼"}</span>
            </li>

            {settingsDropdownOpen && (
              <ul className="bg-white dark:bg-gray-700 rounded-b-md ml-6 shadow-md">
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 rounded-b-md transition"
                  onClick={() => alert("Login clicked!")}
                >
                  Logout
                </li>
              </ul>
            )}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold capitalize">{activePage}</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xl p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {activePage === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition">
                <h2 className="text-lg font-semibold mb-2">Users</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {/* Nombre total utilisateurs */}
                  {users.length} users registered
                </p>
              </div>
              {/* Autres stats possibles */}
              <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition">
                <h2 className="text-lg font-semibold mb-2">Revenue</h2>
                <p className="text-gray-600 dark:text-gray-300">$12,345 this month</p>
              </div>
            </div>
          )}

          {activePage === "users" && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Users List</h2>

              {loadingUsers && <p>Loading users...</p>}
              {errorUsers && <p className="text-red-500">{errorUsers}</p>}

              {!loadingUsers && !errorUsers && users.length === 0 && (
                <p className="text-gray-500">No users available.</p>
              )}

              {!loadingUsers && !errorUsers && users.length > 0 && (
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                    <tr>
                      <th className="py-2">Name</th>
                      <th>Email</th>
                      <th>Projects</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(({ id, name, email, projectCount }) => (
                      <tr
                        key={id}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      >
                        <td className="py-2">{name}</td>
                        <td>{email}</td>
                        <td>{projectCount ?? 0}</td>
                        <td>
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteUser(id)}
                            title="Delete User"
                          >
                            <FiTrash2 />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {activePage === "settings" && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Settings</h2>
              <p>Use the dropdown menu on the sidebar to select Logout.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}