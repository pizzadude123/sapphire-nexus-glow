import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logoMun from '@/assets/logo-mun.png';
import logoRacing from '@/assets/logo-racing.png';
import logoLos from '@/assets/logo-los.png';

gsap.registerPlugin(ScrollTrigger);

const initiatives = [
  {
    name: 'Sapphire MUN',
    tagline: 'Where Voices Shape the World',
    description: 'A prestigious Model United Nations platform where the next generation of leaders debate, negotiate, and drive diplomatic solutions on the global stage.',
    logo: logoMun,
    links: [
      { label: 'Hyderabad', href: 'https://www.instagram.com/sapphire_mun/' },
      { label: 'Vizag', href: 'https://www.instagram.com/sapphiremunvizag/' },
    ],
  },
  {
    name: 'Sapphire Racing League',
    tagline: 'Speed. Precision. Glory.',
    description: 'An elite racing competition pushing the boundaries of speed and engineering — where champions are forged on the track.',
    logo: logoRacing,
    links: [
      { label: 'Follow Us', href: 'https://www.instagram.com/sapphireracingleague/' },
    ],
  },
  {
    name: 'League of Sapphire',
    tagline: 'Compete. Conquer. Celebrate.',
    description: 'A multi-sport league uniting athletes across disciplines in fierce competition, team spirit, and the relentless pursuit of excellence.',
    logo: logoLos,
    links: [
      { label: 'Follow Us', href: 'https://www.instagram.com/leagueofsapphire/' },
    ],
  },
];

const InitiativeCard = ({ initiative, index }: { initiative: typeof initiatives[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      const logo = card.querySelector('.init-logo');
      const content = card.querySelector('.init-content');

      const tl = gsap.timeline({
        scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none reverse' },
      });

      tl.fromTo(logo, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 0)
        .fromTo(content, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 0.2);
    }, card);

    return () => ctx.revert();
  }, [index]);

  const isReversed = index % 2 !== 0;

  return (
    <div ref={cardRef} className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-20 items-center`}>
      {/* Logo */}
      <div className="init-logo w-full lg:w-5/12 flex items-center justify-center opacity-0">
        <div className="w-full max-w-[320px] aspect-square flex items-center justify-center p-10">
          <img src={initiative.logo} alt={initiative.name} className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Content */}
      <div className={`init-content w-full lg:w-7/12 opacity-0 ${isReversed ? 'lg:text-right' : ''}`}>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight mb-2 text-foreground"
          style={{ fontFamily: "'Times New Roman', Georgia, serif" }}>
          {initiative.name}
        </h3>

        <p className="text-accent font-medium tracking-wide text-sm mb-4 font-body">
          {initiative.tagline}
        </p>

        <p className={`text-sm text-muted-foreground max-w-lg leading-relaxed font-body mb-6 ${isReversed ? 'lg:ml-auto' : ''}`}>
          {initiative.description}
        </p>

        <div className={`flex flex-wrap gap-3 ${isReversed ? 'lg:justify-end' : ''}`}>
          {initiative.links.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
              onClick={(e) => { e.preventDefault(); window.open(link.href, '_blank', 'noopener,noreferrer'); }}
              className="text-xs tracking-[0.15em] uppercase font-medium text-foreground/70 border-b border-foreground/20 pb-1 hover:text-primary hover:border-primary transition-all duration-300 cursor-pointer">
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export const InitiativesSection = () => {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="initiatives" className="relative py-28 md:py-36 px-6 md:px-12 lg:px-20">
      <div ref={headingRef} className="text-center mb-24 opacity-0">
        <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-4 font-body">Our Ecosystem</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter leading-tight font-display">
          Initiatives & <span className="text-gradient-sapphire">Projects</span>
        </h2>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-28 md:gap-36">
        {initiatives.map((initiative, i) => (
          <InitiativeCard key={initiative.name} initiative={initiative} index={i} />
        ))}
      </div>
    </section>
  );
};
