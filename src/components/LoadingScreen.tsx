import { useEffect, useState } from 'react';
import gsap from 'gsap';

export const LoadingScreen = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onLoad = () => {
      // Small delay to let videos buffer
      setTimeout(() => {
        gsap.to('.loading-screen', {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => setVisible(false),
        });
      }, 1500);
    };

    if (document.readyState === 'complete') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad, { once: true });
      // Fallback: hide after 4s max
      const fallback = setTimeout(() => onLoad(), 4000);
      return () => clearTimeout(fallback);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="loading-screen fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center gap-6">
      <h1
        className="text-4xl md:text-6xl font-extrabold tracking-tighter text-gradient-sapphire"
        style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
      >
        HOUSE OF SAPPHIRE
      </h1>
      <div className="w-48 h-[2px] bg-muted overflow-hidden rounded-full">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
          style={{ animation: 'loadbar 1.5s ease-in-out infinite' }}
        />
      </div>
      <style>{`
        @keyframes loadbar {
          0% { width: 0%; margin-left: 0%; }
          50% { width: 100%; margin-left: 0%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  );
};
