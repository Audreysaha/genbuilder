import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import API from "../utils/API";
import { jwtDecode } from "jwt-decode";
import { LocalStorageManager } from "../utils/LocalStorageManager";
import { FiPlus, FiSearch, FiMoreVertical, FiEdit, FiTrash2, FiCopy, FiArrowRight } from "react-icons/fi";

const ProjectsDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [contextMenu, setContextMenu] = useState({
    open: false,
    projectId: null,
    x: 0,
    y: 0
  });
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const api = new API();
  const user = jwtDecode(LocalStorageManager.getItem("token"));

  const fetchProjects = async () => {
    try {
      const res = await api.getData(`${api.apiUrl}/api/project/${user.id}/projects`);
      setProjects(res);
      setFilteredProjects(res);
      setLoading(false);
    } catch (err) {
      console.error("Error loading projects:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.state?.reloadProjects) {
      fetchProjects();
      window.history.replaceState({}, document.title);
    } else {
      fetchProjects();
    }
  }, [location.state]);

  useEffect(() => {
    const filtered = projects.filter(project => 
      project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [searchTerm, projects]);

  const handleOpenProject = (projectId) => {
    navigate(`/interface/${projectId}`);
  };

  const handleContextMenu = (e, projectId) => {
    e.preventDefault();
    setContextMenu({
      open: true,
      projectId,
      x: e.clientX,
      y: e.clientY
    });
  };

  const closeContextMenu = () => {
    setContextMenu({ ...contextMenu, open: false });
  };

  const handleRenameProject = async () => {
    if (!contextMenu.projectId) return;
    
    const currentProject = projects.find(p => p.id === contextMenu.projectId);
    const newName = window.prompt("Rename project:", currentProject?.name);
    if (!newName || newName.trim() === "" || newName === currentProject?.name) {
      closeContextMenu();
      return;
    }

    try {
      await api.putData(
        `${api.apiUrl}/api/project/${contextMenu.projectId}/projects`,
        {
          id: contextMenu.projectId,
          name: newName.trim(),
        },
        false
      );
      await fetchProjects(); // Refresh the project list
    } catch (err) {
      console.error("Error renaming project:", err);
    } finally {
      closeContextMenu();
    }
  };

  const handleDuplicateProject = async () => {
    if (!contextMenu.projectId) return;
    
    try {
      await api.postData(
        `${api.apiUrl}/api/project/duplicate/${contextMenu.projectId}`,
        {},
        false
      );
      await fetchProjects(); // Refresh the project list
    } catch (err) {
      console.error("Error duplicating project:", err);
    } finally {
      closeContextMenu();
    }
  };

  const handleDeleteProject = async () => {
    if (!contextMenu.projectId) return;
    
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await api.deleteData(`${api.apiUrl}/api/project/remove/${contextMenu.projectId}`);
        await fetchProjects(); // Refresh the project list
      } catch (err) {
        console.error("Error deleting project:", err);
      } finally {
        closeContextMenu();
      }
    } else {
      closeContextMenu();
    }
  };

  const getRandomGradient = () => {
    const gradients = [
      'bg-gradient-to-br from-indigo-900 to-purple-900',
      'bg-gradient-to-br from-blue-900 to-indigo-900',
      'bg-gradient-to-br from-gray-900 to-blue-900',
      'bg-gradient-to-br from-purple-900 to-pink-900'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

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
    <div 
      className="min-h-screen bg-gray-900 text-gray-100 p-6 md:p-8"
      onClick={closeContextMenu}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2">
              Project Nexus
            </h1>
            <p className="text-gray-400 flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
              {filteredProjects.length} active projects
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto mt-6 md:mt-0">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-500 text-white transition-all duration-200"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => navigate(`/interface/temp-${Date.now()}`)}
              className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-emerald-500/20 whitespace-nowrap"
            >
              <FiPlus className="mr-2" />
              New Project
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 bg-gray-800/50 rounded-xl border border-gray-700/50">
            <h3 className="text-xl font-bold text-gray-300 mb-2 text-center">
              {searchTerm ? "No projects found" : "Your workspace is empty"}
            </h3>
            <p className="text-gray-500 max-w-md text-center mb-6">
              {searchTerm 
                ? "No projects match your search. Try different keywords."
                : "Create your first project to get started."}
            </p>
            <button
              onClick={() => navigate(`/interface/temp-${Date.now()}`)}
              className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-emerald-500/20"
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
                  whileHover={{ y: -5 }}
                  onMouseEnter={() => setHoveredCard(project.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onContextMenu={(e) => handleContextMenu(e, project.id)}
                >
                  <div 
                    className={`relative h-full flex flex-col rounded-xl overflow-hidden border border-gray-700/50 transition-all duration-300 ${hoveredCard === project.id ? 'shadow-xl shadow-emerald-500/10 border-cyan-400/30' : 'shadow-lg shadow-black/20'}`}
                  >
                    {/* Card Header */}
                    <div className={`${getRandomGradient()} p-5`}>
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-lg bg-black/20 flex items-center justify-center text-xl font-bold text-white border border-white/10">
                            {project.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-bold text-white truncate max-w-[140px]">
                              {project.name}
                            </h3>
                            <p className="text-xs text-white/80">
                              Modified: {new Date(project.updatedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleContextMenu(e, project.id);
                          }}
                          className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <FiMoreVertical />
                        </button>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div 
                      className="flex-grow bg-gray-800 p-5 cursor-pointer"
                      onClick={() => handleOpenProject(project.id)}
                    >
                      <div className="h-32 rounded-lg bg-gray-900/50 border border-gray-700/50 flex items-center justify-center">
                        <div className="text-gray-600 text-sm">
                          Project Preview
                        </div>
                        {hoveredCard === project.id && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-black/30 flex items-center justify-center"
                          >
                            <button className="flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg shadow-lg">
                              Open <FiArrowRight className="ml-1" />
                            </button>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="bg-gray-800/80 border-t border-gray-700/50 p-4 flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span className="text-xs text-gray-400">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Add New Project Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center p-8 rounded-xl border-2 border-dashed border-gray-700 hover:border-cyan-400/50 cursor-pointer transition-all duration-300 bg-gray-800/50"
              onClick={() => navigate(`/interface/temp-${Date.now()}`)}
            >
              <div className="text-center">
                <FiPlus className="mx-auto text-3xl text-cyan-400 mb-2" />
                <p className="text-cyan-400 font-medium">Add New Project</p>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Context Menu */}
      <AnimatePresence>
        {contextMenu.open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed z-50 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden w-48"
            style={{
              top: `${contextMenu.y}px`,
              left: `${contextMenu.x}px`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={handleRenameProject}
              className="flex items-center w-full px-4 py-3 text-sm text-gray-300 hover:bg-gray-700/50 transition-colors border-b border-gray-700"
            >
              <FiEdit className="mr-3 text-cyan-400" />
              Rename
            </button>
            <button 
              onClick={handleDuplicateProject}
              className="flex items-center w-full px-4 py-3 text-sm text-gray-300 hover:bg-gray-700/50 transition-colors border-b border-gray-700"
            >
              <FiCopy className="mr-3 text-purple-400" />
              Duplicate
            </button>
            <button 
              onClick={handleDeleteProject}
              className="flex items-center w-full px-4 py-3 text-sm text-red-400 hover:bg-gray-700/50 transition-colors"
            >
              <FiTrash2 className="mr-3" />
              Delete
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsDashboard;