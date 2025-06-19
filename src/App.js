// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import Landing from './pages/Landing';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Signup';
import Interface from './pages/Interface';
import Docs from './pages/Docs';
import Chat from './pages/Chat';
import ProjectsDashboard from './components/ProjectsDashboard';
import { LocalStorageManager } from './utils/LocalStorageManager';

// 🔐 Composant de protection des routes privées
const PrivateRoute = ({ element }) => {
  const token = LocalStorageManager.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      localStorage.removeItem('token');
      return <Navigate to="/login" replace />;
    }

    return element;
  } catch (error) {
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/project_dashboard" element={<PrivateRoute element={<ProjectsDashboard />} />} />
        <Route path="/interface/:projectId" element={<PrivateRoute element={<Interface />} />} />
        <Route path="/docs" element={<PrivateRoute element={<Docs />} />} />
        <Route path="/chat" element={<PrivateRoute element={<Chat />} />} />
      </Routes>
    </Router>
  );
}

export default App;
