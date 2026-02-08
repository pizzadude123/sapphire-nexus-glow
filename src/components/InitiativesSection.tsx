import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Lightbulb,
  Palette,
  TrendingUp,
  Heart,
  Globe,
  Film,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: 'Sapphire Labs',
    description:
      'Pioneering next-generation technology through fearless R&D and rapid innovation cycles.',
    icon: Lightbulb,
    status: 'Active',
    color: 'primary',
  },
  {
    name: 'Sapphire Studios',
    description:
      'A creative powerhouse delivering world-class design, branding, and visual experiences.',
    icon: Palette,
    status: 'Active',
    color: 'accent',
  },
  {
    name: 'Sapphire Ventures',
    description:
      'Strategic investments in disruptive startups and transformative technologies.',
    icon: TrendingUp,
    status: 'Active',
    color: 'primary',
  },
  {
    name: 'Sapphire Foundation',
    description:
      'Driving social change through philanthropy, education, and community development.',
    icon: Heart,
    status: 'Active',
    color: 'accent',
  },
  {
    name: 'Sapphire Digital',
    description:
      'Building scalable digital products and platforms that reach millions worldwide.',
    icon: Globe,
    status: 'Coming Soon',
    color: 'primary',
  },
  {
    name: 'Sapphire Media',
    description:
      'Content creation and entertainment that inspires, educates, and captivates audiences.',
    icon: Film,
    status: 'Coming Soon',
    color: 'accent',
  },
];

export const InitiativesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      const cards = cardsRef.current?.querySelectorAll('.initiative-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="initiatives"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4 font-body">
            Our Ecosystem
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight font-display">
            Initiatives &{' '}
            <span className="text-gradient-sapphire">Projects</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto font-body">
            Each venture operates independently while drawing strength from the
            collective. Together, they form the sapphire constellation.
          </p>
        </div>

        {/* Cards grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: (typeof projects)[0];
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setRotation({ x: y * -10, y: x * 10 });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setRotation({ x: 0, y: 0 });
  }, []);

  const Icon = project.icon;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="initiative-card group relative rounded-2xl bg-card border border-border/50 p-8 cursor-pointer card-hover-glow overflow-hidden"
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
    >
      {/* Background glow effect */}
      <div
        className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 ${
          project.color === 'primary' ? 'bg-primary' : 'bg-accent'
        }`}
      />

      {/* Icon */}
      <div
        className={`relative w-12 h-12 rounded-xl flex items-center justify-center mb-6 border transition-colors duration-300 ${
          project.color === 'primary'
            ? 'border-primary/30 group-hover:border-primary/60'
            : 'border-accent/30 group-hover:border-accent/60'
        }`}
      >
        <Icon
          className={`w-6 h-6 transition-colors duration-300 ${
            project.color === 'primary'
              ? 'text-primary group-hover:text-sapphire-glow'
              : 'text-accent group-hover:text-gold-light'
          }`}
        />
      </div>

      {/* Status badge */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className={`inline-flex items-center gap-1.5 text-[10px] tracking-wider uppercase px-3 py-1 rounded-full font-medium font-body ${
            project.status === 'Active'
              ? 'bg-primary/10 text-primary border border-primary/20'
              : 'bg-accent/10 text-accent border border-accent/20'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              project.status === 'Active'
                ? 'bg-primary animate-pulse'
                : 'bg-accent'
            }`}
          />
          {project.status}
        </span>
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300 font-display">
        {project.name}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed font-body">
        {project.description}
      </p>

      {/* Arrow indicator */}
      <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground group-hover:text-primary transition-all duration-300 font-body">
        <span className="tracking-wider uppercase">Explore</span>
        <span className="transform group-hover:translate-x-2 transition-transform duration-300">
          →
        </span>
      </div>
    </div>
  );
};
