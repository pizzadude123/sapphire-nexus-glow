import { useRef, useEffect } from 'react';
import backgroundVideo from '@/assets/background-video.mp4';

export const ScrollingBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();

    const smoothUpdate = () => {
      if (video.duration && isFinite(video.duration)) {
        // Lerp toward target for smooth playback
        const diff = targetTimeRef.current - video.currentTime;
        if (Math.abs(diff) > 0.01) {
          video.currentTime += diff * 0.1;
        }
      }
      rafRef.current = requestAnimationFrame(smoothUpdate);
    };

    const onScroll = () => {
      if (!video.duration || !isFinite(video.duration)) return;
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
      targetTimeRef.current = progress * video.duration;
    };

    const start = () => {
      video.currentTime = 0;
      window.addEventListener('scroll', onScroll, { passive: true });
      rafRef.current = requestAnimationFrame(smoothUpdate);
    };

    if (video.readyState >= 1) {
      start();
    } else {
      video.addEventListener('loadedmetadata', start, { once: true });
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
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
        style={{ opacity: 0.08 }}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>
    </div>
  );
};
