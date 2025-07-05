import React, { useRef, useEffect } from "react";

const Aude = () => {
  const videoRef = useRef(null);

  useEffect(() => {
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
  }, []);

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
    </div>
  );
};

export default Aude;