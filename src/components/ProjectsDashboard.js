import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/API";
import { jwtDecode } from "jwt-decode";
import { LocalStorageManager } from "../utils/LocalStorageManager";

const ProjectsDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const api = new API();
  const user = jwtDecode(LocalStorageManager.getItem("token"));

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.getData(api.apiUrl + `/api/project/${user.id}/projects`);
        setProjects(res);
      } catch (err) {
        console.error("Erreur lors du chargement des projets :", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProjects();
  }, []);

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) return;

    try {
      const res = api.postData(api.apiUrl + "/api/project/save", {
        name: newProjectName,
        userId: user.id,
      }, false);
      setProjects((prev) => [...prev, res.data]);
      setNewProjectName("");
    } catch (err) {
      console.error("Erreur lors de la création :", err);
    }
  };

  const handleOpenProject = (projectId) => {
    navigate(`/interface/${projectId}`);
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="p-8 text-white max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Mes projets</h1>

      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Nom du nouveau projet"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          className="border text-black rounded px-4 py-2 flex-1"
        />
        <button
          onClick={handleCreateProject}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Créer
        </button>
      </div>

      {projects?.length === 0 ? (
        <p>Aucun projet pour l'instant.</p>
      ) : (
        <ul className="space-y-2">
          {projects?.map((project) => (
            <li
              key={project?.id}
              className="p-4 border rounded cursor-pointer hover:bg-gray-100 hover:text-black transition-all duration-150 ease-in-out"
              onClick={() => handleOpenProject(project?.id)}
            >
              <strong>{project?.name}</strong> (ID : {project?.id})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectsDashboard;
