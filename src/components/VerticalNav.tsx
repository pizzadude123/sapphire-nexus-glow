import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'trusted', label: 'Partners' },
  { id: 'about', label: 'About' },
  { id: 'initiatives', label: 'Projects' },
  { id: 'visionaries', label: 'Visionaries' },
  { id: 'showcase', label: 'Showcase' },
  { id: 'footer', label: 'Contact' },
];

export const VerticalNav = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    sections.forEach(({ id }) => {
      const trigger = ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id),
      });
      triggers.push(trigger);
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed left-0 top-0 z-50 h-screen hidden md:flex flex-col items-center justify-center gap-8 w-16 group">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className="relative flex items-center gap-4 cursor-pointer"
          aria-label={`Navigate to ${label}`}
        >
          <div
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              activeSection === id
                ? 'bg-primary scale-[2] animate-pulse-glow'
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/60 hover:scale-150'
            }`}
          />
          <span
            className={`absolute left-8 text-xs font-medium tracking-wider uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 ${
              activeSection === id ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            {label}
          </span>
        </button>
      ))}
    </nav>
  );
};
