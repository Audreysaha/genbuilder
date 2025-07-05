import React, { useRef } from "react";

const Aude = () => {
  const videoRef = useRef(null);

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (video && video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video && video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video && video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video && video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <video
        ref={videoRef}
        src="/demo.mp4"
        controls
        autoPlay
        className="w-full h-full object-contain bg-black"
        style={{ background: "#000" }}
      />
      <button
        onClick={handleFullscreen}
        className="absolute top-4 right-4 bg-gray-900 bg-opacity-80 text-white px-4 py-2 rounded shadow"
        style={{ zIndex: 10 }}
      >
        Plein écran
      </button>
    </div>
  );
};

export default Aude;