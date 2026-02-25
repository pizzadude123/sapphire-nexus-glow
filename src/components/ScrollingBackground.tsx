import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import backgroundVideo from '@/assets/background-video.mp4';

gsap.registerPlugin(ScrollTrigger);

export const ScrollingBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let ctx: gsap.Context;

    const onLoaded = () => {
      // Pause so we control playback manually
      video.pause();

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          onUpdate: (self) => {
            if (video.duration && isFinite(video.duration)) {
              video.currentTime = self.progress * video.duration;
            }
          },
        });
      });
    };

    if (video.readyState >= 1) {
      onLoaded();
    } else {
      video.addEventListener('loadedmetadata', onLoaded, { once: true });
    }

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover opacity-15"
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>
    </div>
  );
};
