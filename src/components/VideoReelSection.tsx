import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import showreelVideo from '@/assets/showreel-video.mp4';

gsap.registerPlugin(ScrollTrigger);

export const VideoReelSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const overlayTextRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Video container scales up from smaller to full as you scroll into it
      gsap.fromTo(
        videoContainerRef.current,
        { scale: 0.7, borderRadius: '2rem' },
        {
          scale: 1,
          borderRadius: '0rem',
          ease: 'none',
          scrollTrigger: {
            trigger: videoContainerRef.current,
            start: 'top 80%',
            end: 'top 10%',
            scrub: true,
          },
        }
      );

      // Video scrub - plays video based on scroll position
      const onLoadedMetadata = () => {
        if (!video.duration) return;

        ScrollTrigger.create({
          trigger: videoContainerRef.current,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            if (video.duration) {
              video.currentTime = self.progress * video.duration;
            }
          },
        });

        // Progress bar
        gsap.to(progressRef.current, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: videoContainerRef.current,
            start: 'top top',
            end: '+=300%',
            scrub: true,
          },
        });

        // Overlay text fades in at 30% and out at 70%
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: videoContainerRef.current,
            start: 'top top',
            end: '+=300%',
            scrub: true,
          },
        });

        tl.fromTo(
          overlayTextRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.3 },
          0.2
        ).to(
          overlayTextRef.current,
          { opacity: 0, y: -40, duration: 0.3 },
          0.6
        );
      };

      if (video.readyState >= 1) {
        onLoadedMetadata();
      } else {
        video.addEventListener('loadedmetadata', onLoadedMetadata);
      }

      return () => {
        video.removeEventListener('loadedmetadata', onLoadedMetadata);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="reel" ref={sectionRef} className="relative py-24 md:py-32">
      {/* Heading */}
      <div ref={headingRef} className="text-center mb-16 px-6">
        <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4 font-body">
          The Vision
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight font-display">
          Our <span className="text-gradient-sapphire">Cinematic</span> Reel
        </h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto font-body">
          Scroll to explore our world — a visual journey through the ventures and ambitions
          that define House of Sapphire.
        </p>
      </div>

      {/* Video Container */}
      <div
        ref={videoContainerRef}
        className="relative w-full h-screen overflow-hidden"
      >
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source src={showreelVideo} type="video/mp4" />
        </video>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-background/20 pointer-events-none" />

        {/* Overlay text that fades in/out during scroll */}
        <div
          ref={overlayTextRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none opacity-0"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4 font-body">
            Building Tomorrow
          </p>
          <h3
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-none text-foreground font-display mb-6"
            style={{ fontFamily: "'Times New Roman', 'Georgia', serif" }}
          >
            <span className="text-glow-sapphire">Where Vision</span>
            <br />
            Meets Reality
          </h3>
          <p className="text-lg text-muted-foreground max-w-lg font-body">
            Every venture, every project, every pixel — crafted with purpose.
          </p>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/20">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-primary to-accent origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        {/* Corner decorations */}
        <div className="absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2 border-primary/30 pointer-events-none" />
        <div className="absolute top-6 right-6 w-12 h-12 border-r-2 border-t-2 border-primary/30 pointer-events-none" />
        <div className="absolute bottom-6 left-6 w-12 h-12 border-l-2 border-b-2 border-primary/30 pointer-events-none" />
        <div className="absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 border-primary/30 pointer-events-none" />
      </div>
    </section>
  );
};
