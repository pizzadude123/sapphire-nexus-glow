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

const InitiativeCard = ({ initiative, index }: { initiative: typeof initiatives[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      const video = card.querySelector('.card-video');
      const number = card.querySelector('.card-number');
      const name = card.querySelector('.card-name');
      const tagline = card.querySelector('.card-tagline');
      const desc = card.querySelector('.card-desc');
      const line = card.querySelector('.card-line');
      const cta = card.querySelector('.card-cta');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 75%',
          end: 'top 30%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(video, { clipPath: 'inset(10% 10% 10% 10%)', opacity: 0 }, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 1, ease: 'power3.out' }, 0)
        .fromTo(number, { x: index % 2 === 0 ? -60 : 60, opacity: 0 }, { x: 0, opacity: 0.1, duration: 0.8, ease: 'power3.out' }, 0.1)
        .fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power3.out' }, 0.2)
        .fromTo(name, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 0.3)
        .fromTo(tagline, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, 0.45)
        .fromTo(desc, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, 0.55)
        .fromTo(cta, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }, 0.65);
    }, card);

    return () => ctx.revert();
  }, [index]);

  const isReversed = index % 2 !== 0;

  return (
    <div
      ref={cardRef}
      className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center`}
    >
      {/* Video */}
      <div className="card-video relative w-full lg:w-1/2 aspect-video rounded-lg overflow-hidden opacity-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source src={initiative.video} type="video/mp4" />
        </video>
        {/* Corner dots */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/30 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/30 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative w-full lg:w-1/2">
        <span
          className="card-number absolute -top-8 lg:-top-16 text-[6rem] lg:text-[10rem] font-extrabold leading-none text-primary/10 select-none font-display"
          style={{ fontFamily: "'Times New Roman', Georgia, serif", [isReversed ? 'left' : 'right']: 0 }}
        >
          {initiative.number}
        </span>

        <div className="card-line h-[2px] w-16 bg-gradient-to-r from-primary to-accent mb-6 origin-left" style={{ transform: 'scaleX(0)' }} />

        <h3
          className="card-name text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-none mb-3 text-foreground opacity-0"
          style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
        >
          {initiative.name}
        </h3>

        <p className="card-tagline text-lg md:text-xl text-accent font-semibold tracking-wide mb-4 font-body opacity-0">
          {initiative.tagline}
        </p>

        <p className="card-desc text-base text-muted-foreground max-w-lg leading-relaxed font-body opacity-0">
          {initiative.description}
        </p>

        <div className="card-cta mt-6 opacity-0">
          <button className="btn-outline-sapphire text-sm tracking-widest uppercase">
            Learn More →
          </button>
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
      <div ref={headingRef} className="text-center mb-20 md:mb-28">
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

      {/* Initiative cards */}
      <div className="max-w-7xl mx-auto flex flex-col gap-24 md:gap-36">
        {initiatives.map((initiative, i) => (
          <InitiativeCard key={initiative.number} initiative={initiative} index={i} />
        ))}
      </div>
    </section>
  );
};
