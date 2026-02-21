import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import munVideo from '@/assets/initiative-mun.mp4';
import racingVideo from '@/assets/initiative-racing.mp4';
import sportsVideo from '@/assets/initiative-sports.mp4';

gsap.registerPlugin(ScrollTrigger);

const initiatives = [
  {
    name: 'Sapphire MUN',
    tagline: 'Where Voices Shape the World',
    description:
      'A prestigious Model United Nations platform where the next generation of leaders debate, negotiate, and drive diplomatic solutions on the global stage.',
    video: munVideo,
    number: '01',
  },
  {
    name: 'Sapphire Racing League',
    tagline: 'Speed. Precision. Glory.',
    description:
      'An elite racing competition pushing the boundaries of speed and engineering — where champions are forged on the track.',
    video: racingVideo,
    number: '02',
  },
  {
    name: 'League of Sapphire',
    tagline: 'Compete. Conquer. Celebrate.',
    description:
      'A multi-sport league uniting athletes across disciplines in fierce competition, team spirit, and the relentless pursuit of excellence.',
    video: sportsVideo,
    number: '03',
  },
];

export const InitiativesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

      // Horizontal scroll
      const container = containerRef.current;
      if (!container) return;

      const panels = container.querySelectorAll('.initiative-panel');
      const totalScroll = (panels.length - 1) * 100;

      gsap.to(container, {
        xPercent: -totalScroll / panels.length * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${window.innerHeight * panels.length}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Animate each panel's content
      panels.forEach((panel, i) => {
        const number = panel.querySelector('.panel-number');
        const name = panel.querySelector('.panel-name');
        const tagline = panel.querySelector('.panel-tagline');
        const desc = panel.querySelector('.panel-desc');
        const line = panel.querySelector('.panel-line');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `top+=${i * window.innerHeight * 0.8} top`,
            end: `top+=${(i + 0.8) * window.innerHeight * 0.8} top`,
            scrub: 1,
          },
        });

        tl.fromTo(number, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 0.15, duration: 0.3 }, 0)
          .fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.3 }, 0)
          .fromTo(name, { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.4 }, 0.1)
          .fromTo(tagline, { yPercent: 80, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.3 }, 0.2)
          .fromTo(desc, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.3 }, 0.3);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="initiatives" ref={sectionRef} className="relative">
      {/* Heading - shown before pin starts */}
      <div ref={headingRef} className="text-center py-24 md:py-32 px-6">
        <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4 font-body">
          Our Ecosystem
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight font-display">
          Initiatives &{' '}
          <span className="text-gradient-sapphire">Projects</span>
        </h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto font-body">
          Three pillars. One vision. Scroll to explore each initiative.
        </p>
      </div>

      {/* Horizontal scroll container */}
      <div className="h-screen overflow-hidden">
        <div
          ref={containerRef}
          className="flex h-full"
          style={{ width: `${initiatives.length * 100}vw` }}
        >
          {initiatives.map((initiative) => (
            <div
              key={initiative.number}
              className="initiative-panel relative w-screen h-full flex-shrink-0 overflow-hidden"
            >
              {/* Video background */}
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={initiative.video} type="video/mp4" />
              </video>

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-background/70" />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/30" />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-20 lg:px-32 max-w-4xl">
                {/* Large number */}
                <span
                  className="panel-number text-[8rem] md:text-[12rem] lg:text-[16rem] font-extrabold leading-none text-primary/15 absolute top-1/2 -translate-y-1/2 right-8 md:right-20 select-none font-display opacity-0"
                  style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
                >
                  {initiative.number}
                </span>

                {/* Accent line */}
                <div className="panel-line h-[2px] w-24 bg-gradient-to-r from-primary to-accent mb-8 origin-left" style={{ transform: 'scaleX(0)' }} />

                {/* Initiative name */}
                <h3
                  className="panel-name text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-none mb-4 text-foreground text-glow-sapphire opacity-0"
                  style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
                >
                  {initiative.name}
                </h3>

                {/* Tagline */}
                <p className="panel-tagline text-lg md:text-2xl text-accent font-semibold tracking-wide mb-6 font-body opacity-0">
                  {initiative.tagline}
                </p>

                {/* Description */}
                <p className="panel-desc text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed font-body opacity-0">
                  {initiative.description}
                </p>

                {/* CTA */}
                <div className="panel-desc mt-8 opacity-0">
                  <button className="btn-outline-sapphire text-sm tracking-widest uppercase">
                    Learn More →
                  </button>
                </div>
              </div>

              {/* Corner decorations */}
              <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-primary/30 pointer-events-none" />
              <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-primary/30 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
