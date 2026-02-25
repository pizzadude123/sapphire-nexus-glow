import { useRef, useEffect } from 'react';
import backgroundVideo from '@/assets/background-video.mp4';

export const ScrollingBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Ensure autoplay works
    video.play().catch(() => {});
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
        style={{ opacity: 0.08 }}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>
    </div>
  );
};
