import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import timesSquareVideo from '@/assets/times-square-video.mp4';

gsap.registerPlugin(ScrollTrigger);

const showcaseItems = [
  {
    title: 'Times Square, NYC',
    description: "Our flagship campaign illuminated one of the world's most iconic intersections.",
    date: '2026',
  },
  {
    title: 'Sapphire on Wheels',
    description: 'Sapphire branding showcased on premium cars, turning heads on streets worldwide.',
    date: '2026',
  },
];

export const TimesSquareSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
      });

      gsap.fromTo(videoRef.current, { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: videoRef.current, start: 'top 85%' },
      });

      const cards = cardsRef.current?.querySelectorAll('.showcase-card');
      if (cards) {
        gsap.fromTo(cards, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="showcase" ref={sectionRef} className="relative py-28 md:py-36 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 opacity-0">
          <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-4 font-body">Global Presence</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter leading-tight font-display">
            As Seen on <span className="text-gradient-gold">Times Square</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-sm font-body">
            Our brand shines on the world's most prestigious stages.
          </p>
        </div>

        {/* Video */}
        <div ref={videoRef} className="relative rounded-sm overflow-hidden mb-16 opacity-0">
          <video autoPlay muted loop playsInline className="w-full aspect-video object-cover">
            <source src={timesSquareVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6">
            <span className="text-[10px] tracking-[0.3em] uppercase text-accent font-body">Featured</span>
            <h3 className="text-xl md:text-2xl font-bold mt-1 text-foreground"
              style={{ fontFamily: "'Times New Roman', Georgia, serif" }}>
              Times Square Takeover
            </h3>
          </div>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {showcaseItems.map((item) => (
            <div key={item.title}
              className="showcase-card p-6 rounded-sm border border-border/30 bg-card/20 opacity-0 hover:border-border/60 transition-colors duration-300">
              <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60 font-body">{item.date}</span>
              <h3 className="text-lg font-bold mt-2 mb-2 text-foreground font-display">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-body">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
