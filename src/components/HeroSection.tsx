import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import heroImage from '@/assets/hero-sapphire.jpg';

export const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(
        imageRef.current,
        { scale: 1.3, opacity: 0 },
        { scale: 1, opacity: 0.4, duration: 2 }
      )
        .fromTo(
          titleLine1Ref.current,
          { y: 120, opacity: 0, skewY: 7 },
          { y: 0, opacity: 1, skewY: 0, duration: 1.2 },
          '-=1.2'
        )
        .fromTo(
          titleLine2Ref.current,
          { y: 120, opacity: 0, skewY: 7 },
          { y: 0, opacity: 1, skewY: 0, duration: 1.2 },
          '-=0.8'
        )
        .fromTo(
          subtitleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          ctaRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.3'
        );

      // Parallax on scroll
      gsap.to(imageRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          ref={imageRef}
          src={heroImage}
          alt="House of Sapphire"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl">
        <div className="overflow-hidden mb-2">
          <span
            ref={titleLine1Ref}
            className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-none text-gradient-sapphire font-display"
          >
            HOUSE OF
          </span>
        </div>
        <div className="overflow-hidden mb-8">
          <span
            ref={titleLine2Ref}
            className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-none text-foreground font-display"
          >
            SAPPHIRE
          </span>
        </div>
        <p
          ref={subtitleRef}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-body"
        >
          A constellation of ventures shaping the future through innovation,
          technology, and design.
        </p>
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="btn-sapphire">Explore Our Universe</button>
          <button className="btn-outline-sapphire">Learn More</button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground tracking-[0.3em] uppercase font-body">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-primary/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
};
