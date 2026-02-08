import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import timesSquareVideo from '@/assets/times-square-video.mp4';
import timesSquareImage from '@/assets/times-square.jpg';

gsap.registerPlugin(ScrollTrigger);

const showcaseItems = [
  {
    title: 'Times Square, NYC',
    subtitle: 'Digital Billboard Campaign',
    date: '2024',
    description:
      'Our flagship campaign illuminated one of the world\'s most iconic intersections, reaching millions of viewers.',
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
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        videoRef.current,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: videoRef.current,
            start: 'top 80%',
          },
        }
      );

      const items = listRef.current?.querySelectorAll('.showcase-item');
      if (items) {
        gsap.fromTo(
          items,
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4 font-body">
            Global Presence
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight font-display">
            As Seen on{' '}
            <span className="text-gradient-gold">Times Square</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto font-body">
            Our brand has been featured on some of the world's most prestigious
            advertising platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Featured video */}
          <div ref={videoRef} className="relative">
            <div className="relative rounded-2xl overflow-hidden group">
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={timesSquareImage}
                className="w-full h-auto aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
              >
                <source src={timesSquareVideo} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs tracking-[0.3em] uppercase text-accent font-body">
                  Featured
                </span>
                <h3 className="text-2xl font-bold mt-1 font-display">
                  Times Square Takeover
                </h3>
              </div>

              {/* Play indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-background/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                <span className="text-[10px] tracking-wider uppercase text-foreground/80 font-body">
                  Live
                </span>
              </div>
            </div>
            {/* Glow decoration */}
            <div className="absolute -z-10 inset-0 blur-3xl opacity-20 bg-primary rounded-2xl transform scale-110" />
          </div>

          {/* Showcase list */}
          <div ref={listRef} className="space-y-6">
            {showcaseItems.map((item) => (
              <div
                key={item.title}
                className="showcase-item group p-6 rounded-2xl bg-card/50 border border-border/50 card-hover-glow cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors duration-300 font-display">
                      {item.title}
                    </h3>
                    <p className="text-sm text-accent font-body">
                      {item.subtitle}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground bg-muted/50 px-3 py-1 rounded-full font-body">
                    {item.date}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed font-body">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
