import { useRef, useEffect } from 'react';
import backgroundVideo from '@/assets/background-video.mp4';

export const ScrollingBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();

    const onScroll = () => {
      if (!video.duration || !isFinite(video.duration)) return;
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
      video.currentTime = progress * video.duration;
    };

    const start = () => {
      video.currentTime = 0;
      window.addEventListener('scroll', onScroll, { passive: true });
    };

    if (video.readyState >= 1) {
      start();
    } else {
      video.addEventListener('loadedmetadata', start, { once: true });
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
        style={{ opacity: 0.05 }}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>
    </div>
  );
};
