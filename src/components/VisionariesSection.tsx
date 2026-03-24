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

      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
      });

      tl.fromTo(heading, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, 0)
        .fromTo(image, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 0.2)
        .fromTo(content, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 0.4);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="visionaries" ref={sectionRef} className="relative py-28 md:py-36 px-6 md:px-12 lg:px-20">
      <div className="vis-heading text-center mb-20 opacity-0">
        <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-4 font-body">Vision</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter leading-tight font-display">
          The Visionaries Behind <span className="text-gradient-sapphire">Sapphire</span>
        </h2>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
        <div className="vis-image w-full lg:w-5/12 opacity-0">
          <div className="rounded-sm overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
            <img src={visionaryGautam} alt="Shri. Gautam Chand Jain" className="w-full h-auto object-cover" />
          </div>
        </div>

        <div className="vis-content w-full lg:w-7/12 opacity-0">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight mb-2 text-foreground"
            style={{ fontFamily: "'Times New Roman', Georgia, serif" }}>
            Shri. Gautam Chand Jain
          </h3>
          <p className="text-accent font-medium tracking-wide text-sm mb-5 font-body">
            Chief Promoter — Pokarna Group
          </p>
          <p className="text-sm text-muted-foreground max-w-xl leading-relaxed font-body">
            Mr. Gautam Chand Jain, the visionary and the Chief Promoter of Pokarna Group was born on 15th August, 1955. He initially started off with the family business of retailing and wholesaling of Raymond Fabrics in 1979-80 and within a very short span of time, he earned the distinction of being Raymond's top distributor in India.
          </p>
        </div>
      </div>
    </section>
  );
};
