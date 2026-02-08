import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const partners = [
  'Sapphire Labs',
  'Meridian Group',
  'Nova Capital',
  'Atlas Digital',
  'Vertex Systems',
  'Pinnacle AI',
  'Quantum Dynamics',
  'Eclipse Studios',
  'Horizon Fund',
  'Prism Technologies',
  'Zenith Corp',
  'Apex Ventures',
];

export const TrustedBy = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="trusted"
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
    >
      <div className="section-divider mb-16" />

      <p
        ref={titleRef}
        className="text-center text-xs tracking-[0.4em] uppercase text-muted-foreground mb-12 font-body"
      >
        Trusted By Industry Leaders
      </p>

      {/* Marquee */}
      <div className="relative">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee">
          {[...partners, ...partners].map((name, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-10 md:px-14 flex items-center"
            >
              <span className="text-xl md:text-2xl font-bold tracking-tight text-muted-foreground/40 hover:text-primary/70 transition-colors duration-500 whitespace-nowrap font-display cursor-default select-none">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider mt-16" />
    </section>
  );
};
