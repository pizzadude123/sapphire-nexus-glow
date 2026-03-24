import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import founderSaiteja from '@/assets/founder-saiteja.png';
import founderPranay from '@/assets/founder-pranay.png';

gsap.registerPlugin(ScrollTrigger);

const founders = [
  {
    name: 'Saiteja Kodumuru',
    image: founderSaiteja,
  },
  {
    name: 'Pranay Pokarna',
    image: founderPranay,
  },
];

export const FoundersSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = sectionRef.current?.querySelector('.founders-heading');
      const cards = sectionRef.current?.querySelectorAll('.founder-card');

      gsap.fromTo(
        heading,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
          },
        }
      );

      cards?.forEach((card, i) => {
        const image = card.querySelector('.founder-img');
        const name = card.querySelector('.founder-name');
        const line = card.querySelector('.founder-line');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        });

        tl.fromTo(
          image,
          { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
          { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 1.2, ease: 'power4.out' },
          i * 0.15
        )
          .fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power3.out' }, 0.4 + i * 0.15)
          .fromTo(name, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 0.5 + i * 0.15);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="founders" ref={sectionRef} className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20">
      {/* Heading */}
      <div className="founders-heading text-center mb-20 md:mb-28 opacity-0">
        <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4 font-body">
          Leadership
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight font-display">
          The Founders of{' '}
          <span className="text-gradient-sapphire">Sapphire</span>
        </h2>
      </div>

      {/* Founder Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
        {founders.map((founder) => (
          <div key={founder.name} className="founder-card flex flex-col items-center text-center">
            {/* Image */}
            <div className="founder-img relative w-full max-w-[360px] aspect-[3/4] rounded-lg overflow-hidden mb-8 opacity-0">
              <img
                src={founder.image}
                alt={founder.name}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/30 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/30 pointer-events-none" />
            </div>

            {/* Line */}
            <div className="founder-line h-[2px] w-12 bg-gradient-to-r from-primary to-accent mb-4 origin-center" style={{ transform: 'scaleX(0)' }} />

            {/* Name */}
            <h3
              className="founder-name text-2xl md:text-3xl font-extrabold tracking-tight text-foreground opacity-0"
              style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
            >
              {founder.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};
