import React, { useEffect, useState, useRef } from "react";
import CanvasItem from "./CanvasItem";
import { useParams, useSearchParams } from "react-router-dom";
import API from "../utils/API";

const LivePreviewCanvas = () => {
  const { projectId } = useParams();
  const [canvasItems, setCanvasItems] = useState([]);
  const [originalCanvasSize, setOriginalCanvasSize] = useState({ width: 1200, height: 800 });
  const [searchParams] = useSearchParams();
  const device = searchParams.get("device");
  const page = searchParams.get("page");
  const api = new API();
  const intervalRef = useRef(null);
  const containerRef = useRef(null);

  const DESIGN_SIZES = {
    desktop: { width: 1655, height: 620 },
    mobile: { width: 460, height: 1024 }
  };

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

        const originalSize = device === "mobile" 
          ? DESIGN_SIZES.mobile 
          : DESIGN_SIZES.desktop;
        
        setOriginalCanvasSize(originalSize);

        setCanvasItems((prevCanvas) => {
          const prevString = JSON.stringify(prevCanvas);
          const newString = JSON.stringify(newCanvas);
          if (prevString !== newString) {
            return newCanvas || [];
          }
          return prevCanvas;
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const calculateScale = () => {
    if (!containerRef.current) return { scaleX: 1, scaleY: 1 };

    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const scaleX = containerWidth / originalCanvasSize.width;
    const scaleY = containerHeight / originalCanvasSize.height;

    const uniformScale = Math.min(scaleX, scaleY);
        
    return { scaleX: uniformScale, scaleY: uniformScale };
  };

  const getScaledItems = () => {
    const { scaleX, scaleY } = calculateScale();
    
    return canvasItems.map(item => ({
      ...item,
      x: (item.x || 0) * scaleX,
      y: (item.y || 0) * scaleY,
      width: item.width ? item.width * scaleX : item.width,
      height: item.height ? item.height * scaleY : item.height,
      props: {
        ...item.props,
        fontSize: item.props?.fontSize ? Math.round(parseInt(item.props.fontSize) * Math.min(scaleX, scaleY)) + 'px' : item.props?.fontSize,
        padding: item.props?.padding ? Math.round(parseInt(item.props.padding) * Math.min(scaleX, scaleY)) + 'px' : item.props?.padding,
        borderRadius: item.props?.borderRadius ? Math.round(parseInt(item.props.borderRadius) * Math.min(scaleX, scaleY)) : item.props?.borderRadius,
      }
    }));
  };

  useEffect(() => {
    fetchProject();
    intervalRef.current = setInterval(fetchProject, 2000);

    return () => clearInterval(intervalRef.current);
  }, [projectId, device, page]);

  useEffect(() => {
    const handleResize = () => {
      setCanvasItems(prev => [...prev]);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scaledItems = getScaledItems();

  return (
    <div className="fixed inset-0 w-screen h-screen bg-white dark:bg-gray-900 p-0 m-0 flex justify-center items-start z-50">
      {device === "mobile" ? (
        <div className="w-[375px] h-[700px] border-[12px] border-gray-800 rounded-[40px] overflow-hidden shadow-lg relative bg-white mt-10">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-gray-700 rounded-full"></div>
          <div 
            ref={containerRef}
            className="w-full h-full overflow-auto relative"
            style={{
              minHeight: '100%'
            }}
          >
            {scaledItems.map((item) => (
              <CanvasItem key={item.id} item={item} isPreviewMode={true} />
            ))}
          </div>
        </div>
      ) : (
        <div 
          ref={containerRef}
          className="absolute inset-0 w-full h-full bg-white dark:bg-gray-900 overflow-auto"
        >
          {scaledItems.map((item) => (
            <CanvasItem key={item.id} item={item} isPreviewMode={true} />
          ))}
        </div>
      )}
      
      {/* Debug info - à retirer en production */}
      {/* {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 bg-black text-white p-2 rounded text-xs z-50">
          <div>Original: {originalCanvasSize.width}x{originalCanvasSize.height}</div>
          <div>Container: {containerRef.current?.clientWidth}x{containerRef.current?.clientHeight}</div>
          <div>Scale: {JSON.stringify(calculateScale())}</div>
          <div>Items: {canvasItems.length}</div>
        </div>
      )} */}
    </div>
  );
};

export default LivePreviewCanvas;