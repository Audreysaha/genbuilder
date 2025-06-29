import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Signup";
import Interface from "./pages/Interface";
import Docs from "./pages/Docs";
import Chat from "./pages/Chat";
import ProjectsDashboard from "./components/ProjectsDashboard";
import AdminDashboard from "./components/AdminDashboard";
import { LocalStorageManager } from "./utils/LocalStorageManager";
import Navbar from "./components/Navbar";
import LivePreviewCanvas from "./components/LivePreviewConvas";

const PrivateRoute = ({ element }) => {
  const token = LocalStorageManager.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      localStorage.removeItem("token");
      return <Navigate to="/" replace />;
    }

    return element;
  } catch (error) {
    localStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }
};

const PrivateAdminRoute = ({ element }) => {
  const token = LocalStorageManager.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      localStorage.removeItem("token");
      return <Navigate to="/" replace />;
    }

    if (decoded.role !== "admin") {
      localStorage.removeItem("token");
      return <Navigate to="/" replace />;
    }

    return element;
  } catch (error) {
    localStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }
};


function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage on initial load
    return localStorage.getItem("theme") === "dark";
  });
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/project_dashboard"
          element={<PrivateRoute element={<ProjectsDashboard />} />}
        />
        <Route
          path="/Admin_dashboard"
          element={<PrivateAdminRoute element={<AdminDashboard />} />}
        />
        <Route
          path="/interface/:projectId"
          element={<PrivateRoute element={<Interface />} />}
        />
        <Route
          path="/preview/:projectId"
          element={<PrivateRoute element={<LivePreviewCanvas />} />}
        />
        <Route path="/docs" element={<PrivateRoute element={<Docs />} />} />
        <Route path="/chat" element={<PrivateRoute element={<Chat />} />} />
      </Routes>
    </Router>
  );
}

export default App;
