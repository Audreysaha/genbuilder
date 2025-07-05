import React, { useEffect, useState, useCallback } from "react";
import CanvasItem from "./CanvasItem";
import { useParams, useSearchParams } from "react-router-dom";
import API from "../utils/API";

const LivePreviewCanvas = () => {
  const { projectId } = useParams();
  const [canvasItems, setCanvasItems] = useState([]);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [searchParams] = useSearchParams();
  const device = searchParams.get("device") || "desktop";
  const page = searchParams.get("page");
  const api = new API();

  // Taille de design de référence (doit correspondre à la taille de design dans l'éditeur)
  const DESIGN_SIZE = { width: 1655, height: 620 };

  // Met à jour la taille de la fenêtre en temps réel
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Récupère les items du projet
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.getData(
          api.apiUrl + `/api/project/load/${projectId}`
        );
        if (!res) throw new Error("Projet not FOUND.");

        const selectedPage = res.pages.find((pag) => pag.id == page);
        if (!selectedPage) return;

        const canvas =
          device === "mobile"
            ? selectedPage.canvasMobile
            : selectedPage.canvasWeb;
        setCanvasItems(canvas || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProject();
    const interval = setInterval(fetchProject, 2000);
    return () => clearInterval(interval);
  }, [projectId, device, page]);

  // Calcule le scale et offset pour centrer le design
  const getScaleAndOffset = useCallback(() => {
    const { width: screenWidth, height: screenHeight } = windowSize;
    const scaleX = screenWidth / DESIGN_SIZE.width;
    const scaleY = screenHeight / DESIGN_SIZE.height;
    const scale = Math.min(scaleX, scaleY);

    const offsetX = (screenWidth - DESIGN_SIZE.width * scale) / 2;
    const offsetY = (screenHeight - DESIGN_SIZE.height * scale) / 2;
    return { scale, offsetX, offsetY };
  }, [windowSize]);

  const { scale, offsetX, offsetY } = getScaleAndOffset();

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-white dark:bg-gray-900 overflow-hidden z-50"
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: offsetX,
          top: offsetY,
          width: DESIGN_SIZE.width,
          height: DESIGN_SIZE.height,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          background: "transparent",
        }}
      >
        {canvasItems.map((item) => (
          <CanvasItem key={item.id} item={item} isPreviewMode={true} />
        ))}
      </div>
    </div>
  );
};

export default LivePreviewCanvas;
