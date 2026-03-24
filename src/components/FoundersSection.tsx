import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import founderSaiteja from '@/assets/founder-saiteja.png';
import founderPranay from '@/assets/founder-pranay.png';

gsap.registerPlugin(ScrollTrigger);

const founders = [
  { name: 'Saiteja Kodumuru', image: founderSaiteja },
  { name: 'Pranay Pokarna', image: founderPranay },
];

export const FoundersSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = sectionRef.current?.querySelector('.founders-heading');
      gsap.fromTo(heading, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: heading, start: 'top 80%' },
      });

      sectionRef.current?.querySelectorAll('.founder-card').forEach((card) => {
        const image = card.querySelector('.founder-img');
        const name = card.querySelector('.founder-name');

        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: 'top 78%', toggleActions: 'play none none reverse' },
        });

        tl.fromTo(image, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 0)
          .fromTo(name, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 0.3);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="founders" ref={sectionRef} className="relative py-28 md:py-36 px-6 md:px-12 lg:px-20">
      <div className="founders-heading text-center mb-20 opacity-0">
        <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-4 font-body">Leadership</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter leading-tight font-display">
          The Founders of <span className="text-gradient-sapphire">Sapphire</span>
        </h2>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {founders.map((founder) => (
          <div key={founder.name} className="founder-card flex flex-col items-center text-center">
            <div className="founder-img w-full max-w-[320px] aspect-[3/4] rounded-sm overflow-hidden mb-6 opacity-0 grayscale hover:grayscale-0 transition-all duration-700">
              <img src={founder.image} alt={founder.name} className="w-full h-full object-cover object-top" />
            </div>
            <h3 className="founder-name text-xl md:text-2xl font-bold tracking-tight text-foreground opacity-0"
              style={{ fontFamily: "'Times New Roman', Georgia, serif" }}>
              {founder.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};
