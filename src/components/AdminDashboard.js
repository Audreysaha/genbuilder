import React, { useState, useEffect } from "react";
import { FiHome, FiUsers,FiTrash2,FiLogOut} from "react-icons/fi";
import { GoProjectSymlink } from "react-icons/go";
import API from "../utils/API";

const api = new API();

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [settingsDropdownOpen, setSettingsDropdownOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [errorUsers, setErrorUsers] = useState(null);
  const [clicked, setClicked] = useState(false);

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

  const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/"; 
};

  const handleClick = () => {
    setClicked(true);
    handleLogout();
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-5 text-xl font-bold border-b border-gray-200 dark:border-gray-700">
          Admin Panel
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
            onClick={() => {
                setActivePage("projects");
                setSettingsDropdownOpen(false);
              }}
              className={`px-4 py-2 flex items-center gap-2 cursor-pointer rounded transition ${
                activePage === "projects"
                  ? "bg-indigo-600 text-white dark:bg-indigo-500"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
            <GoProjectSymlink /> Projects
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
  <div className="flex-1 flex flex-col">
  {/* Header */}
  <header className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
    <h1 className="text-xl font-semibold capitalize text-gray-800 dark:text-white">
      {activePage}
    </h1>

    <button
      onClick={handleLogout}
      className="bg-white p-2 rounded-lg transition text-black flex items-center gap-2 w-[140px] justify-end"
      aria-label="Logout"
      title="Logout"
    >
       <FiLogOut
        size={25}
        className={`transition ${
          clicked ? "text-indigo-600" : "text-black"
        } hover:text-indigo-700`}
      />
    </button>
  </header>


        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {activePage === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition">
                <h2 className="text-lg font-semibold mb-2">Users</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {/* Nombre total utilisateurs */}
                  {users.length} users registered
                </p>
              </div>
              {/* Autres stats possibles */}
              <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition">
                <h2 className="text-lg font-semibold mb-2">Projects</h2>
                <p className="text-gray-600 dark:text-gray-300">Automate it</p>
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
              <h2 className="text-xl font-semibold mb-4">Projects</h2>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
