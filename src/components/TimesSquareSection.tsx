import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import timesSquareVideo from '@/assets/times-square-video.mp4';

gsap.registerPlugin(ScrollTrigger);

const showcaseItems = [
  {
    title: 'Times Square, NYC',
    subtitle: 'Digital Billboard Campaign',
    date: '2024',
    description:
      "Our flagship campaign illuminated one of the world's most iconic intersections, reaching millions of viewers.",
  },
  {
    title: 'Dubai Mall',
    subtitle: 'LED Display Installation',
    date: '2024',
    description:
      'A stunning visual experience at the heart of luxury retail, showcasing the Sapphire brand to a global audience.',
  },
  {
    title: 'Tokyo Shibuya',
    subtitle: 'Cross-Screen Takeover',
    date: '2025',
    description:
      'A synchronized multi-screen takeover at the famous Shibuya crossing, creating an unforgettable brand moment.',
  },
];

export const TimesSquareSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading — split word reveal
      const headingWords = headingRef.current?.querySelectorAll('.reveal-word');
      if (headingWords) {
        gsap.fromTo(
          headingWords,
          { y: 80, opacity: 0, rotateX: 40 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            stagger: 0.08,
            ease: 'power4.out',
            scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
          }
        );
      }

      // Video — scale up from small with parallax
      gsap.fromTo(
        videoRef.current,
        { scale: 0.7, opacity: 0, borderRadius: '2rem' },
        {
          scale: 1,
          opacity: 1,
          borderRadius: '1rem',
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: videoRef.current,
            start: 'top 85%',
            end: 'top 20%',
            scrub: 1,
          },
        }
      );

      // Counter stats
      const counters = counterRef.current?.querySelectorAll('.counter-item');
      if (counters) {
        gsap.fromTo(
          counters,
          { scale: 0.5, opacity: 0, y: 40 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: { trigger: counterRef.current, start: 'top 80%' },
          }
        );
      }

      // Showcase cards — stagger from bottom with rotation
      const cards = cardsRef.current?.querySelectorAll('.showcase-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 100, opacity: 0, rotateY: 8 },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headingText = 'As Seen on Times Square';

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="relative py-32 md:py-44 px-6 overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full pointer-events-none opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, hsl(var(--accent)), transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Heading — word-by-word reveal */}
        <div ref={headingRef} className="text-center mb-6" style={{ perspective: '800px' }}>
          <p className="reveal-word text-xs tracking-[0.4em] uppercase text-accent mb-4 font-body">
            Global Presence
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-tight font-display">
            {headingText.split(' ').map((word, i) => (
              <span key={i} className="reveal-word inline-block mr-[0.3em]">
                {word === 'Times' || word === 'Square' ? (
                  <span className="text-gradient-gold">{word}</span>
                ) : (
                  word
                )}
              </span>
            ))}
          </h2>
          <p className="reveal-word text-muted-foreground mt-6 max-w-2xl mx-auto text-lg font-body">
            Our brand shines on the world's most prestigious stages — from iconic billboards to immersive digital installations.
          </p>
        </div>

        {/* Impact counters */}
        <div ref={counterRef} className="flex flex-wrap justify-center gap-8 md:gap-16 my-16">
          {[
            { value: '50M+', label: 'Impressions' },
            { value: '3', label: 'Continents' },
            { value: '12', label: 'Campaigns' },
          ].map((stat) => (
            <div key={stat.label} className="counter-item text-center">
              <div
                className="text-4xl md:text-5xl font-extrabold text-gradient-gold font-display mb-1"
                style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
              >
                {stat.value}
              </div>
              <div className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-body">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Featured video — scales up on scroll */}
        <div ref={videoRef} className="relative rounded-2xl overflow-hidden mb-20 group">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
          >
            <source src={timesSquareVideo} type="video/mp4" />
          </video>

          {/* Subtle gradient for text */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />

          <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
            <div>
              <span className="text-xs tracking-[0.3em] uppercase text-accent font-body">
                Featured
              </span>
              <h3
                className="text-3xl md:text-4xl font-extrabold mt-1 text-glow-sapphire"
                style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
              >
                Times Square Takeover
              </h3>
            </div>
            <div className="flex items-center gap-2 bg-card/60 backdrop-blur-sm px-4 py-2 rounded-full border border-border/30">
              <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
              <span className="text-[10px] tracking-wider uppercase text-foreground/80 font-body">
                Live
              </span>
            </div>
          </div>

          {/* Corner dots */}
          <div className="absolute top-6 left-6 w-10 h-10 border-l-2 border-t-2 border-primary/40 pointer-events-none" />
          <div className="absolute top-6 right-6 w-10 h-10 border-r-2 border-t-2 border-primary/40 pointer-events-none" />
          <div className="absolute bottom-6 left-6 w-10 h-10 border-l-2 border-b-2 border-primary/40 pointer-events-none" />
          <div className="absolute bottom-6 right-6 w-10 h-10 border-r-2 border-b-2 border-primary/40 pointer-events-none" />
        </div>

        {/* Showcase cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ perspective: '1000px' }}>
          {showcaseItems.map((item, index) => (
            <div
              key={item.title}
              className="showcase-card group relative p-8 rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm overflow-hidden cursor-pointer transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_40px_hsl(var(--primary)/0.1)]"
            >
              {/* Number */}
              <span
                className="absolute top-4 right-6 text-6xl font-extrabold text-primary/5 select-none"
                style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
              >
                0{index + 1}
              </span>

              <span className="inline-block text-[10px] tracking-[0.3em] uppercase text-accent mb-4 px-3 py-1 rounded-full border border-accent/20 font-body">
                {item.date}
              </span>
              <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors duration-300 font-display">
                {item.title}
              </h3>
              <p className="text-sm text-accent mb-4 font-body">{item.subtitle}</p>
              <p className="text-sm text-muted-foreground leading-relaxed font-body">
                {item.description}
              </p>

              {/* Hover arrow */}
              <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground group-hover:text-primary transition-all duration-300 font-body">
                <span className="tracking-wider uppercase">View Campaign</span>
                <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
