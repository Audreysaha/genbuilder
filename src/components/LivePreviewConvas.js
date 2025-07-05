import React, { useEffect, useState, useRef } from "react";
import CanvasItem from "./CanvasItem";
import { useParams, useSearchParams } from "react-router-dom";
import API from "../utils/API";

const DESIGN_SIZE = { width: 1655, height: 900 }; // Taille de référence pour le web

const LivePreviewCanvas = () => {
  const { projectId } = useParams();
  const [canvasItems, setCanvasItems] = useState([]);
  const [searchParams] = useSearchParams();
  const device = searchParams.get("device");
  const page = searchParams.get("page");
  const api = new API();
  const intervalRef = useRef(null);

  // Pour le scale responsive
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

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

  const fetchProject = async () => {
    try {
      const res = await api.getData(api.apiUrl + `/api/project/load/${projectId}`);
      if (!res) throw new Error("Projet not FOUND.");
      if (res.pages?.length) {
        const selectedPage = res.pages.find((pag) => pag.id == page);
        if (!selectedPage) return;

        const newCanvas = device === "mobile"
          ? selectedPage.canvasMobile
          : selectedPage.canvasWeb;

        setCanvasItems((prevCanvas) => {
          const prevString = JSON.stringify(prevCanvas);
          const newString = JSON.stringify(newCanvas);
          if (prevString !== newString) {
            return newCanvas;
          }
          return prevCanvas;
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProject(); // initial
    intervalRef.current = setInterval(fetchProject, 2000);

    return () => clearInterval(intervalRef.current);
  }, [projectId, device, page]);

  // Calcule le scale et offset pour centrer le canvas web
  const getScaleAndOffset = () => {
    const scale = Math.min(
      windowSize.width / DESIGN_SIZE.width,
      windowSize.height / DESIGN_SIZE.height
    );
    const offsetX = (windowSize.width - DESIGN_SIZE.width * scale) / 2;
    const offsetY = (windowSize.height - DESIGN_SIZE.height * scale) / 2;
    return { scale, offsetX, offsetY };
  };

  if (device === "mobile") {
    // Mobile preview reste comme avant
    return (
      <div className="w-full min-h-screen bg-white dark:bg-gray-900 p-10 flex justify-center items-start">
        <div className="w-[375px] h-[812px] border-[12px] border-gray-800 rounded-[40px] overflow-hidden shadow-lg relative bg-white">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-gray-700 rounded-full"></div>
          <div className="w-full h-full overflow-auto relative">
            {canvasItems.map((item) => (
              <CanvasItem key={item.id} item={item} isPreviewMode={true} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Version web : scale et centrage responsive
  const { scale, offsetX, offsetY } = getScaleAndOffset();

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        background: "#fff",
        overflow: "hidden",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: DESIGN_SIZE.width,
          height: DESIGN_SIZE.height,
          position: "absolute",
          left: offsetX,
          top: offsetY,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          background: "#fff",
          overflow: "hidden",
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
