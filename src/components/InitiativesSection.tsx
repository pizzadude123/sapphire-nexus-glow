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
    description:
      'A prestigious Model United Nations platform where the next generation of leaders debate, negotiate, and drive diplomatic solutions on the global stage.',
    logo: logoMun,
    number: '01',
    links: [
      { label: 'Hyderabad', href: 'https://www.instagram.com/sapphire_mun/' },
      { label: 'Vizag', href: 'https://www.instagram.com/sapphiremunvizag/' },
    ],
  },
  {
    name: 'Sapphire Racing League',
    tagline: 'Speed. Precision. Glory.',
    description:
      'An elite racing competition pushing the boundaries of speed and engineering — where champions are forged on the track.',
    logo: logoRacing,
    number: '02',
    links: [
      { label: 'Follow Us', href: 'https://www.instagram.com/sapphireracingleague/' },
    ],
  },
  {
    name: 'League of Sapphire',
    tagline: 'Compete. Conquer. Celebrate.',
    description:
      'A multi-sport league uniting athletes across disciplines in fierce competition, team spirit, and the relentless pursuit of excellence.',
    logo: logoLos,
    number: '03',
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
      const name = card.querySelector('.init-name');
      const tagline = card.querySelector('.init-tagline');
      const desc = card.querySelector('.init-desc');
      const line = card.querySelector('.init-line');
      const links = card.querySelector('.init-links');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          end: 'top 40%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(logo, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'power4.out' }, 0)
        .fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'power3.out' }, 0.3)
        .fromTo(name, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 0.35)
        .fromTo(tagline, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 0.5)
        .fromTo(desc, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 0.6)
        .fromTo(links, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, 0.7);
    }, card);

    return () => ctx.revert();
  }, [index]);

  const isReversed = index % 2 !== 0;

  return (
    <div ref={cardRef} className="relative">
      <div className={`relative z-10 flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center`}>
        {/* Logo */}
        <div className="init-logo w-full lg:w-[45%] flex items-center justify-center opacity-0">
          <div className="w-full max-w-[400px] aspect-square flex items-center justify-center p-8 rounded-lg bg-secondary/30 border border-border/30">
            <img
              src={initiative.logo}
              alt={initiative.name}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Content */}
        <div className={`w-full lg:w-[55%] ${isReversed ? 'lg:text-right' : ''}`}>
          <div
            className={`init-line h-[2px] w-14 bg-gradient-to-r from-primary to-accent mb-5 ${isReversed ? 'lg:ml-auto origin-right' : 'origin-left'}`}
            style={{ transform: 'scaleX(0)' }}
          />

          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2 font-body">{initiative.number}</p>

          <h3
            className="init-name text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.05] mb-3 text-foreground opacity-0"
            style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
          >
            {initiative.name}
          </h3>

          <p className="init-tagline text-accent font-semibold tracking-wide text-base md:text-lg mb-4 font-body opacity-0">
            {initiative.tagline}
          </p>

          <p className="init-desc text-sm md:text-base text-muted-foreground max-w-md leading-relaxed font-body opacity-0" style={isReversed ? { marginLeft: 'auto' } : {}}>
            {initiative.description}
          </p>

          <div className={`init-links mt-6 flex flex-wrap gap-3 opacity-0 ${isReversed ? 'lg:justify-end' : ''}`}>
            {initiative.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(link.href, '_blank', 'noopener,noreferrer');
                }}
                className="inline-flex items-center gap-1.5 text-xs tracking-[0.2em] uppercase font-medium text-primary border border-primary/20 px-5 py-2.5 rounded-sm hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 cursor-pointer"
              >
                {link.label}
                <span className="text-primary/60">→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const InitiativesSection = () => {
  const headingRef = useRef<HTMLDivElement>(null);

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
            trigger: headingRef.current,
            start: 'top 80%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="initiatives" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20">
      {/* Heading */}
      <div ref={headingRef} className="text-center mb-20 md:mb-28 opacity-0">
        <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4 font-body">
          Our Ecosystem
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight font-display">
          Initiatives &{' '}
          <span className="text-gradient-sapphire">Projects</span>
        </h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto font-body">
          Three pillars. One vision.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto flex flex-col gap-32 md:gap-44">
        {initiatives.map((initiative, i) => (
          <InitiativeCard key={initiative.number} initiative={initiative} index={i} />
        ))}
      </div>
    </section>
  );
};
