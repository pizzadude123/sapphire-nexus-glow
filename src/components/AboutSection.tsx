import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import aboutImage from '@/assets/about-sapphire.jpg';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '12+', label: 'Active Ventures' },
  { value: '50+', label: 'Global Partners' },
  { value: '30+', label: 'Countries Reached' },
  { value: '$2B+', label: 'Combined Impact' },
];

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { x: 80, opacity: 0, scale: 0.9 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Stats counter animation
      const statEls = statsRef.current?.querySelectorAll('.stat-item');
      if (statEls) {
        gsap.fromTo(
          statEls,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Text side */}
          <div>
            <h2
              ref={headingRef}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight mb-8 font-display"
            >
              Defining the{' '}
              <span className="text-gradient-sapphire">Future</span>,<br />
              One Venture at a Time
            </h2>
            <div ref={textRef}>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed font-body">
                House of Sapphire is the nexus of innovation — a parent company
                overseeing a diverse portfolio of ventures spanning technology,
                design, social impact, and beyond. We don't just build companies;
                we architect ecosystems.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-body">
                Founded on the principle that bold ideas deserve bold execution,
                HOS connects visionaries, technologists, and changemakers under
                one roof. Every project carries the sapphire standard — a
                commitment to excellence that defines everything we touch.
              </p>
              <button className="btn-sapphire">Our Story</button>
            </div>
          </div>

          {/* Image side */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-square">
              <img
                src={aboutImage}
                alt="About House of Sapphire"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full border border-primary/20 animate-pulse-glow" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full border border-accent/10 animate-float" />
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="stat-item text-center p-6 rounded-2xl bg-card/50 border border-border/50 card-hover-glow"
            >
              <div className="text-3xl md:text-4xl font-extrabold text-gradient-sapphire mb-2 font-display">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground tracking-wide uppercase font-body">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
