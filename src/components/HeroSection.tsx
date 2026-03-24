import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroVideo from '@/assets/hero-video.mp4';
import heroImage from '@/assets/hero-sapphire.jpg';

gsap.registerPlugin(ScrollTrigger);

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const ScrambleText = ({ text, className }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = useCallback(() => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDisplayText(
        text.split('').map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iteration) return text[index];
          return LETTERS[Math.floor(Math.random() * LETTERS.length)];
        }).join('')
      );
      iteration += 1 / 3;
      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
      }
    }, 30);
  }, [text]);

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  return (
    <span className={className} onMouseEnter={scramble} style={{ cursor: 'default' }}>
      {displayText}
    </span>
  );
};

const GlowingLetter = ({ char, delay }: { char: string; delay: number }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current || char === ' ') return;
    gsap.to(ref.current, {
      textShadow: '0 0 40px hsl(217 90% 60% / 0.8), 0 0 80px hsl(217 90% 60% / 0.4), 0 0 120px hsl(217 90% 60% / 0.2)',
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay,
    });
  }, [char, delay]);

  return (
    <span ref={ref} className="inline-block" style={{ textShadow: '0 0 10px hsl(217 90% 60% / 0.3)' }}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  );
};

export const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const titleLine1Ref = useRef<HTMLDivElement>(null);
  const titleLine2Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(videoRef.current, { scale: 1.3, opacity: 0 }, { scale: 1, opacity: 0.4, duration: 2 })
        .fromTo(titleLine1Ref.current, { y: 120, opacity: 0, skewY: 7 }, { y: 0, opacity: 1, skewY: 0, duration: 1.2 }, '-=1.2')
        .fromTo(titleLine2Ref.current, { y: 120, opacity: 0, skewY: 7 }, { y: 0, opacity: 1, skewY: 0, duration: 1.2 }, '-=0.8')
        .fromTo(subtitleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
        .fromTo(scrollIndicatorRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.1');

      // Parallax on scroll
      gsap.to(videoRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: { trigger: containerRef.current, start: 'top top', end: 'bottom top', scrub: true },
      });

      // Title fades on scroll
      [titleLine1Ref.current, titleLine2Ref.current, subtitleRef.current].forEach((el) => {
        if (!el) return;
        gsap.fromTo(el, { y: 0, opacity: 1 }, {
          y: -60, opacity: 0, ease: 'none',
          scrollTrigger: { trigger: containerRef.current, start: '60% top', end: 'bottom top', scrub: true },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video ref={videoRef} autoPlay muted loop playsInline poster={heroImage} className="w-full h-full object-cover">
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/20 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl">
        <div className="overflow-hidden mb-2" ref={titleLine1Ref}>
          <ScrambleText
            text="HOUSE OF"
            className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-none text-gradient-sapphire"
          />
        </div>

        <div className="overflow-hidden mb-10" ref={titleLine2Ref}>
          <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-none text-foreground"
            style={{ fontFamily: "'Times New Roman', Georgia, serif" }}>
            {'SAPPHIRE'.split('').map((char, i) => (
              <GlowingLetter key={i} char={char} delay={i * 0.2} />
            ))}
          </span>
        </div>

        <p ref={subtitleRef} className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto font-body">
          A constellation of ventures shaping the future through innovation, technology, and design.
        </p>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollIndicatorRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 opacity-0">
        <span className="text-[10px] text-muted-foreground/60 tracking-[0.3em] uppercase font-body">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-muted-foreground/40 to-transparent" />
      </div>
    </section>
  );
};
