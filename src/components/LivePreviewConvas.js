import React, { useEffect, useState } from "react";
import CanvasItem from "./CanvasItem";
import { useParams, useSearchParams } from "react-router-dom";
import API from "../utils/API";

const LivePreviewCanvas = () => {
  const { projectId } = useParams();
  const [canvasItems, setCanvasItems] = useState([]);
  const [searchParams] = useSearchParams();
  const device = searchParams.get("device") || "desktop";
  const page = searchParams.get("page");
  const api = new API();

  const DESIGN_SIZE = { width: 1655, height: 620 };

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

  const getScaledItems = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const scaleX = screenWidth / DESIGN_SIZE.width;
    const scaleY = screenHeight / DESIGN_SIZE.height;
    const uniformScale = Math.min(scaleX, scaleY);

    const offsetX =
      (screenWidth - DESIGN_SIZE.width * uniformScale) / 2;
    const offsetY =
      (screenHeight - DESIGN_SIZE.height * uniformScale) / 2;

    return canvasItems.map((item) => ({
      ...item,
      x: (item.x || 0) * uniformScale + offsetX,
      y: (item.y || 0) * uniformScale + offsetY,
      width: item.width ? item.width * uniformScale : item.width,
      height: item.height ? item.height * uniformScale : item.height,
      props: {
        ...item.props,
        fontSize: item.props?.fontSize
          ? Math.round(parseInt(item.props.fontSize) * uniformScale) + "px"
          : item.props?.fontSize,
        padding: item.props?.padding
          ? Math.round(parseInt(item.props.padding) * uniformScale) + "px"
          : item.props?.padding,
        borderRadius: item.props?.borderRadius
          ? Math.round(parseInt(item.props.borderRadius) * uniformScale)
          : item.props?.borderRadius,
      },
    }));
  };

  const scaledItems = getScaledItems();

  return (
    <div className="fixed inset-0 w-screen h-screen bg-white dark:bg-gray-900 overflow-hidden z-50">
      <div
        className="relative w-full h-full"
        style={{
          position: "relative",
        }}
      >
        {scaledItems.map((item) => (
          <CanvasItem key={item.id} item={item} isPreviewMode={true} />
        ))}
      </div>
    </div>
  );
};

export default LivePreviewCanvas;
