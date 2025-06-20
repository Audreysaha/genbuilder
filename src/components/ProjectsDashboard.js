import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/API";
import { jwtDecode } from "jwt-decode";
import { LocalStorageManager } from "../utils/LocalStorageManager";

const ProjectsDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newProjectName, setNewProjectName] = useState("");
  const [showNewProjectInput, setShowNewProjectInput] = useState(false);
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    projectId: null,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const api = new API();
  const user = jwtDecode(LocalStorageManager.getItem("token"));

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.getData(
          `${api.apiUrl}/api/project/${user.id}/projects`
        );
        setProjects(res);
        setFilteredProjects(res);
      } catch (err) {
        console.error("Erreur lors du chargement des projets :", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProjects();
  }, []);

  useEffect(() => {
    const filtered = projects.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [searchTerm, projects]);

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) return;

    try {
      const res = await api.postData(
        `${api.apiUrl}/api/project/save`,
        {
          name: newProjectName,
          userId: user.id,
        },
        false
      );

      setProjects((prev) => [...prev, res.data]);
      setNewProjectName("");
      setShowNewProjectInput(false);
    } catch (err) {
      console.error("Erreur lors de la création :", err);
    }
  };

  const handleOpenProject = (projectId) => {
    navigate(`/interface/${projectId}`);
  };

  const handleContextMenu = (e, projectId) => {
    e.preventDefault();
    setContextMenu({ visible: true, x: e.pageX, y: e.pageY, projectId });
  };

  const closeContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, projectId: null });
  };

  const handleDuplicateProject = async (id) => {
    console.log("Dupliquer", id);
    closeContextMenu();
    const res = await api.postData(
      `${api.apiUrl}/api/project/duplicate/${id}`,
      {},
      false
    );
  };

  const handleDeleteProject = async (id) => {
    console.log("Supprimer", id);
    closeContextMenu();
    const res = await api.deleteData(
      `${api.apiUrl}/api/project/remove/${id}`
    );
  };

  const handleRenameProject = async (id) => {
    closeContextMenu();

    const currentProject = projects.find((p) => p.id === id);
    const newName = window.prompt(
      "Nouveau nom du projet :",
      currentProject?.name
    );

    if (!newName || newName.trim() === "" || newName === currentProject?.name)
      return;

    try {
      const res = await api.putData(
        `${api.apiUrl}/api/project/${id}/projects`,
        {
          id,
          name: newName.trim(),
        },
        false
      );

      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, name: newName.trim() } : p))
      );
    } catch (err) {
      console.error("Erreur lors du renommage :", err);
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="p-8 w-full h-screen text-black px-80 bg-white" onClick={closeContextMenu}>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search"
          className="w-full md:w-1/2 mx-auto block border border-gray-300 rounded-full px-6 py-3 text-black shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <h2 className="text-xl font-semibold mb-4">Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => handleOpenProject(project.id)}
            onContextMenu={(e) => handleContextMenu(e, project.id)}
            className="bg-white rounded-xl p-5 shadow-md cursor-pointer hover:shadow-lg transition duration-300 relative group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-bold flex items-center justify-center rounded-full text-lg">
                {project.name.charAt(0).toUpperCase()}
              </div>
              <div className="font-semibold text-gray-800">{project.name}</div>
            </div>
            <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-green-400"></div>
          </div>
        ))}

        <div className="bg-white rounded-xl p-5 shadow flex flex-col justify-center items-center hover:shadow-lg transition duration-300">
          {!showNewProjectInput ? (
            <button
              className="text-blue-500 font-semibold text-lg"
              onClick={() => setShowNewProjectInput(true)}
            >
              + Add new
            </button>
          ) : (
            <div className="w-full">
              <input
                type="text"
                placeholder="Project name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded text-black mb-2"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleCreateProject}
                  className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
                >
                  Create
                </button>
                <button
                  onClick={() => {
                    setNewProjectName("");
                    setShowNewProjectInput(false);
                  }}
                  className="text-sm text-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {contextMenu.visible && (
        <div
          className="absolute z-50 bg-white border shadow-lg rounded w-40"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <ul className="text-sm text-gray-700">
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleDuplicateProject(contextMenu.projectId)}
            >
              Dupliquer
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleDeleteProject(contextMenu.projectId)}
            >
              Supprimer
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleRenameProject(contextMenu.projectId)}
            >
              Renommer
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProjectsDashboard;
