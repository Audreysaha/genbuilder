// components/Dashboard.js
import { useState, useEffect } from 'react';
import API from '../utils/API';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchStats = async () => {
      try {
        const api = new API();
        const response = await api.getData(`${api.apiUrl}/api/auth/dashboard/stats`);
        
        if (response.success) {
          setStats(response.stats);
        } else {
          throw new Error(response.error || 'Failed to load dashboard data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="p-4">Loading dashboard...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500">Total Users</h3>
          <p className="text-3xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500">Active Today</h3>
          <p className="text-3xl font-bold">{stats.activeToday}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500">Projects</h3>
          <p className="text-3xl font-bold">{stats.projects.length}</p>
        </div>
      </div>

      {/* Users and Projects Table */}
      <div className="bg-white p-4 rounded shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Users and Their Projects</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Email</th>
                <th className="text-left p-2">Last Login</th>
                <th className="text-left p-2">Projects</th>
              </tr>
            </thead>
            <tbody>
              {stats.users.map(user => (
                <tr key={user.id} className="border-b">
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}
                  </td>
                  <td className="p-2">
                    {user.projects.length > 0 ? (
                      <ul className="list-disc pl-5">
                        {user.projects.map(project => (
                          <li key={project.id}>
                            {project.name} ({project.status})
                          </li>
                        ))}
                      </ul>
                    ) : 'No projects'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Project Statistics */}
      <div className="bg-white p-4 rounded shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Project Statistics</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Project</th>
              <th className="text-left p-2">Users Working</th>
            </tr>
          </thead>
          <tbody>
            {stats.projects.map(project => (
              <tr key={project.name} className="border-b">
                <td className="p-2">{project.name}</td>
                <td className="p-2">{project.userCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}