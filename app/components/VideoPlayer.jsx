import { useRef } from "react";

const VideoPlayer = ({ src, type }) => {
  const videoRef = useRef(null);

  return (
    <div className="relative w-full h-[90vh] bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        className="w-full h-full object-cover opacity-50"
        controls={false}
        autoPlay
        loop
        muted
      >
        <source src={src} type={type} />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;

