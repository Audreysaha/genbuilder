import React, { useEffect, useState, useRef } from "react";
import CanvasItem from "./CanvasItem";
import { useParams, useSearchParams } from "react-router-dom";
import API from "../utils/API";

const LivePreviewCanvas = () => {
  const { projectId } = useParams();
  const [canvasItems, setCanvasItems] = useState([]);
  const [searchParams] = useSearchParams();
  const device = searchParams.get("device");
  const page = searchParams.get("page");
  const api = new API();
  const intervalRef = useRef(null);

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

  return (
    <div className="fixed inset-0 w-screen h-screen bg-white dark:bg-gray-900 p-0 m-0 flex justify-center items-start z-50">
      {device === "mobile" ? (
        <div className="w-[375px] h-[700px] border-[12px] border-gray-800 rounded-[40px] overflow-hidden shadow-lg relative bg-white mt-10">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-gray-700 rounded-full"></div>
          <div className="w-full h-full overflow-auto relative">
            {canvasItems.map((item) => (
              <CanvasItem key={item.id} item={item} isPreviewMode={true} />
            ))}
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 w-full h-full bg-white dark:bg-gray-900 overflow-auto">
          {canvasItems.map((item) => (
            <CanvasItem key={item.id} item={item} isPreviewMode={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LivePreviewCanvas;