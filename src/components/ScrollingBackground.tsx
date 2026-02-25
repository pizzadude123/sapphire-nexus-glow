import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import backgroundVideo from '@/assets/background-video.mp4';

gsap.registerPlugin(ScrollTrigger);

export const ScrollingBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Wait for video metadata to load
    const onLoaded = () => {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          onUpdate: (self) => {
            if (video.duration) {
              video.currentTime = self.progress * video.duration;
            }
          },
        });
      });

      return () => ctx.revert();
    };

    if (video.readyState >= 1) {
      onLoaded();
    } else {
      video.addEventListener('loadedmetadata', onLoaded, { once: true });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ top: '100vh' }}
    >
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover opacity-20"
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>
    </div>
  );
};
