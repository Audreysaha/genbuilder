import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../utils/API";
import { jwtDecode } from "jwt-decode";
import { LocalStorageManager } from "../utils/LocalStorageManager";
import {
  FiPlus,
  FiSearch,
  FiEdit,
  FiTrash2,
  FiCopy,
  FiMoreVertical,
  FiFolder,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const ProjectsDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [menuProjectId, setMenuProjectId] = useState(null);
  const menuRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const api = new API();
  const token = LocalStorageManager.getItem("token");
  const user = token ? jwtDecode(token) : null;

  const fetchProjects = async () => {
    if (!user) return;
    await api.getData(`${api.apiUrl}/api/project/${user.id}/projects`)
      .then((res) => {
        const safeProjects = Array.isArray(res) ? res : [];
        setProjects(safeProjects);
        setFilteredProjects(safeProjects);
        setLoading(false);
      }).catch((err) => {
        console.error("Error loading projects:", err);
        setProjects([]);
        setFilteredProjects([]);
        setLoading(false);
        throw new Error(err);
      })
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    const filtered = projects.filter((project) =>
      project.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [searchTerm, projects]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuProjectId(null);
      }
    };

    if (menuProjectId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuProjectId]);

  const handleOpenProject = (projectId) => {
    navigate(`/interface/${projectId}`);
  };

  const handleMenuToggle = (projectId) => {
    setMenuProjectId((prev) => (prev === projectId ? null : projectId));
  };

  const handleRenameProject = async (projectId) => {
    const currentProject = projects.find((p) => p.id === projectId);
    if (!currentProject) return;

    const newName = window.prompt("Rename project:", currentProject.name);
    if (!newName || newName.trim() === "" || newName === currentProject.name) return;

    try {
      await api.putData(
        `${api.apiUrl}/api/project/${projectId}/projects`,
        { id: projectId, name: newName.trim() },
        false
      );
      fetchProjects();
    } catch (err) {
      console.error("Error renaming project:", err);
    } finally {
      setMenuProjectId(null);
    }
  };

  const handleDuplicateProject = async (projectId) => {
    try {
      await api.postData(`${api.apiUrl}/api/project/duplicate/${projectId}`, {}, false);
      fetchProjects();
    } catch (err) {
      console.error("Error duplicating project:", err);
    } finally {
      setMenuProjectId(null);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await api.deleteData(`${api.apiUrl}/api/project/remove/${projectId}`, {}, false);
      fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
    } finally {
      setMenuProjectId(null);
    }
  };

  const getRandomGradient = () => {
    const gradients = [
      "bg-gradient-to-br from-indigo-900 to-purple-900",
      "bg-gradient-to-br from-blue-900 to-indigo-900",
      "bg-gradient-to-br from-gray-900 to-blue-900",
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  if (!user) {
    return <div className="text-center text-red-500 mt-10">Utilisateur non connecté.</div>;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-t-emerald-400 border-r-transparent border-b-transparent border-l-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black-900 text-gray-100 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-24 ">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-400 mb-2">
              Projects
            </h1>
            <p className="text-gray-400 flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
              {filteredProjects.length} active projects
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-20 w-full  md:w-auto mt-6 md:mt-0">
            <div className="relative flex-grow max-w-md items-center">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-500" />
              </div>
              <input
                type="text"
                className="block w-[517px] pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-500 text-gray-500 transition-all duration-200"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => navigate(`/interface/temp-${Date.now()}`)}
              className="flex items-center justify-center px-3 py-2 bg-indigo-600 hover:from-indigo-400 hover:to-indigo-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-emerald-500/20 whitespace-nowrap"
            >
              <FiPlus className="mr-2" />
              Add Project
            </button>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 bg-gray-800/50 rounded-xl border border-gray-700/50">
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="text-gray-500 text-5xl mb-6 flex justify-center">
                <FiFolder />
              </div>
            </motion.div>
            <h3 className="text-xl font-bold text-gray-300 mb-2 text-center">
              {searchTerm ? "No results found" : "Your workspace is empty"}
            </h3>
            <p className="text-gray-500 max-w-md text-center mb-6">
              {searchTerm
                ? "No projects match your search. Try different keywords."
                : "Create your first project to get started."}
            </p>
            <button
              onClick={() => navigate(`/interface/temp-${Date.now()}`)}
              className="flex items-center justify-center px-6 py-3 bg-indigo-700 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-emerald-500/20"
            >
              <FiPlus className="mr-2" />
              Create Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative h-full flex flex-col rounded-xl overflow-hidden border border-gray-700/50 transition-all duration-300 shadow-white/20 shadow-md"
                >
                  <div className={`${getRandomGradient()} p-5`}>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-lg bg-black/20 flex items-center justify-center text-xl font-bold text-white border border-white/10">
                          {project.name?.charAt(0) || "P"}
                        </div>
                        <div>
                          <h3 className="font-bold text-white truncate max-w-[140px]">
                            {project.name}
                          </h3>
                          <p className="text-xs text-white/80">
                            Modified:{" "}
                            {project.updatedAt
                              ? new Date(project.updatedAt).toLocaleDateString()
                              : "Unknown"}
                          </p>
                        </div>
                      </div>

                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMenuToggle(project.id);
                          }}
                          className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <FiMoreVertical />
                        </button>

                        {menuProjectId === project.id && (
                          <motion.div
                            ref={menuRef}
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 mt-2 w-36 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-50 overflow-hidden"
                          >
                            <button
                              onClick={() => handleRenameProject(project.id)}
                              className="flex items-center w-full px-4 py-3 text-sm text-gray-300 hover:bg-gray-700/50 transition-colors border-b border-gray-700"
                            >
                              <FiEdit className="mr-3 text-cyan-400" />
                              Rename
                            </button>
                            <button
                              onClick={() => handleDuplicateProject(project.id)}
                              className="flex items-center w-full px-4 py-3 text-sm text-gray-300 hover:bg-gray-700/50 transition-colors border-b border-gray-700"
                            >
                              <FiCopy className="mr-3 text-purple-400" />
                              Duplicate
                            </button>
                            <button
                              onClick={() => handleDeleteProject(project.id)}
                              className="flex items-center w-full px-4 py-3 text-sm text-red-400 hover:bg-gray-700/50 transition-colors"
                            >
                              <FiTrash2 className="mr-3" />
                              Delete
                            </button>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex justify-end">
                    <button
                      onClick={() => handleOpenProject(project.id)}
                      className="px-5 py-2 bg-gray-800 text-white rounded-lg shadow-lg hover:brightness-110 transition"
                    >
                      Open
                    </button>
                  </div>

                  <div className="bg-black-800 border-t border-gray-800 p-4 flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-xs text-gray-400">Active</span>
                  </div>
                </motion.div>
              ))}

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center p-8 rounded-xl border-2 border-dashed border-gray-500 hover:border-indigo-400/50 cursor-pointer transition-all duration-300 bg-gray-800/50"
                onClick={() => navigate(`/interface/temp-${Date.now()}`)}
              >
                <div className="text-center">
                  <FiPlus className="mx-auto text-3xl text-indigo-400 mb-2" />
                  <p className="text-indigo-400 font-medium">New Project</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsDashboard;
