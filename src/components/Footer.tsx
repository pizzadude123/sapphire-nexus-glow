import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const quickLinks = [
  { name: 'About', href: '#about' },
  { name: 'Initiatives', href: '#initiatives' },
  { name: 'Showcase', href: '#showcase' },
];

export const Footer = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: contentRef.current, start: 'top 90%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <footer id="footer" ref={sectionRef} className="relative pt-28 md:pt-36 pb-8 px-6">
      <div className="section-divider mb-16" />

      <div ref={contentRef} className="max-w-6xl mx-auto opacity-0">
        {/* Headline */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-[0.95] mb-16"
          style={{ fontFamily: "'Times New Roman', Georgia, serif" }}>
          Let's Build<br />
          <span className="text-gradient-sapphire">Something</span><br />
          Extraordinary<span className="text-accent">.</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Contact form */}
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-8 font-body">Get in Touch</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Name" value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-0 py-3 bg-transparent border-b border-border/40 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/50 transition-colors duration-300 font-body text-sm" />
              <input type="email" placeholder="Email" value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-0 py-3 bg-transparent border-b border-border/40 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/50 transition-colors duration-300 font-body text-sm" />
              <textarea placeholder="Message" rows={3} value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="w-full px-0 py-3 bg-transparent border-b border-border/40 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/50 transition-colors duration-300 resize-none font-body text-sm" />
              <button type="submit"
                className="mt-4 text-xs tracking-[0.2em] uppercase font-medium text-foreground/70 border-b border-foreground/20 pb-1 hover:text-primary hover:border-primary transition-all duration-300">
                Send Message →
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="lg:pl-12">
            <h3 className="text-xl font-bold tracking-tight mb-3"
              style={{ fontFamily: "'Times New Roman', Georgia, serif" }}>
              House of Sapphire
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-body max-w-sm mb-10">
              A constellation of ventures shaping the future. We connect visionaries, technologists, and changemakers under one roof.
            </p>

            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/50 mb-4 font-body">Links</p>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <a key={link.name} href={link.href}
                  className="text-sm text-foreground/50 hover:text-foreground transition-colors duration-300 font-body">
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="section-divider mb-6" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] text-muted-foreground/40 font-body">
          <p>© 2025 House of Sapphire. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-muted-foreground transition-colors duration-300">Privacy</a>
            <a href="#" className="hover:text-muted-foreground transition-colors duration-300">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
