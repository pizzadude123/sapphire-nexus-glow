import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const partners = [
  'Pokarna Limited',
  'Pokarna Engineered Stone',
  'Quantace Films',
  'StudioNex',
  'Sapphire Labs',
  'Meridian Group',
];

export const TrustedBy = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { opacity: 0, y: 15 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="trusted" ref={sectionRef} className="relative py-16 overflow-hidden">
      <div className="section-divider mb-12" />

      <p ref={titleRef} className="text-center text-[10px] tracking-[0.4em] uppercase text-muted-foreground/60 mb-10 font-body">
        Affiliated With
      </p>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee">
          {[...partners, ...partners, ...partners].map((name, i) => (
            <div key={i} className="flex-shrink-0 px-10 md:px-14 flex items-center">
              <span className="text-lg md:text-xl tracking-tight text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors duration-500 whitespace-nowrap font-body cursor-default select-none">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider mt-12" />
    </section>
  );
};
