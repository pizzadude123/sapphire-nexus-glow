import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import visionaryGautam from '@/assets/visionary-gautam.png';

gsap.registerPlugin(ScrollTrigger);

export const VisionariesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = sectionRef.current?.querySelector('.vis-heading');
      const image = sectionRef.current?.querySelector('.vis-image');
      const content = sectionRef.current?.querySelector('.vis-content');
      const line = sectionRef.current?.querySelector('.vis-line');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'top 30%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(heading, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 0)
        .fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power3.out' }, 0.2)
        .fromTo(image, { clipPath: 'inset(10% 10% 10% 10%)', opacity: 0 }, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 1, ease: 'power3.out' }, 0.3)
        .fromTo(content, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 0.5);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="visionaries" ref={sectionRef} className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20">
      {/* Heading */}
      <div className="vis-heading text-center mb-20 md:mb-28 opacity-0">
        <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4 font-body">
          Leadership
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight font-display">
          The Visionaries Behind{' '}
          <span className="text-gradient-sapphire">Sapphire</span>
        </h2>
      </div>

      {/* Card */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
        {/* Image */}
        <div className="vis-image relative w-full lg:w-5/12 opacity-0">
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={visionaryGautam}
              alt="Shri. Gautam Chand Jain"
              className="w-full h-auto object-cover"
            />
            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/30 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/30 pointer-events-none" />
          </div>
        </div>

        {/* Content */}
        <div className="vis-content w-full lg:w-7/12 opacity-0">
          <div className="vis-line h-[2px] w-16 bg-gradient-to-r from-primary to-accent mb-6 origin-left" style={{ transform: 'scaleX(0)' }} />

          <h3
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter leading-none mb-2 text-foreground"
            style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
          >
            Shri. Gautam Chand Jain
          </h3>

          <p className="text-lg text-accent font-semibold tracking-wide mb-6 font-body">
            Chief Promoter — Pokarna Group
          </p>

          <p className="text-base text-muted-foreground max-w-xl leading-relaxed font-body">
            Mr. Gautam Chand Jain, the visionary and the Chief Promoter of Pokarna Group was born on 15th August, 1955. 
            He initially started off with the family business of retailing and wholesaling of Raymond Fabrics in 1979-80 
            and within a very short span of time, he earned the distinction of being Raymond's top distributor in India.
          </p>
        </div>
      </div>
    </section>
  );
};
