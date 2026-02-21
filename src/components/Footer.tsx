import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { name: 'Twitter', href: '#' },
  { name: 'LinkedIn', href: '#' },
  { name: 'Instagram', href: '#' },
  { name: 'YouTube', href: '#' },
];

const quickLinks = [
  { name: 'About', href: '#about' },
  { name: 'Initiatives', href: '#initiatives' },
  { name: 'Showcase', href: '#showcase' },
  { name: 'Careers', href: '#' },
  { name: 'Press Kit', href: '#' },
];

export const Footer = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bigTextRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Big text reveal — sliding in from left with scale
      gsap.fromTo(
        bigTextRef.current,
        { xPercent: -30, opacity: 0, scale: 0.9 },
        {
          xPercent: 0,
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: { trigger: bigTextRef.current, start: 'top 85%' },
        }
      );

      // Form elements stagger in
      const formEls = formRef.current?.querySelectorAll('.form-el');
      if (formEls) {
        gsap.fromTo(
          formEls,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: formRef.current, start: 'top 80%' },
          }
        );
      }

      // Links slide in from right
      gsap.fromTo(
        linksRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: linksRef.current, start: 'top 85%' },
        }
      );

      // Bottom bar
      gsap.fromTo(
        bottomRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: bottomRef.current, start: 'top 95%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <footer
      id="footer"
      ref={sectionRef}
      className="relative pt-32 md:pt-44 pb-8 px-6 overflow-hidden"
    >
      <div className="section-divider mb-20" />

      {/* Big serif headline */}
      <div ref={bigTextRef} className="max-w-7xl mx-auto mb-20">
        <h2
          className="text-5xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tighter leading-[0.9] text-glow-sapphire"
          style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
        >
          Let's Build
          <br />
          <span className="text-gradient-sapphire">Something</span>
          <br />
          Extraordinary<span className="text-accent">.</span>
        </h2>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Contact form */}
          <div ref={formRef}>
            <p className="form-el text-xs tracking-[0.4em] uppercase text-accent mb-8 font-body">
              Get in Touch
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="form-el w-full px-0 py-4 bg-transparent border-b border-border/50 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/60 transition-all duration-500 font-body text-lg"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="form-el w-full px-0 py-4 bg-transparent border-b border-border/50 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/60 transition-all duration-500 font-body text-lg"
              />
              <textarea
                placeholder="Your Message"
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                className="form-el w-full px-0 py-4 bg-transparent border-b border-border/50 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/60 transition-all duration-500 resize-none font-body text-lg"
              />
              <button type="submit" className="form-el btn-sapphire mt-4">
                Send Message →
              </button>
            </form>
          </div>

          {/* Info side */}
          <div ref={linksRef} className="lg:pl-12 flex flex-col justify-between">
            <div>
              <div className="mb-12">
                <h3
                  className="text-3xl font-bold tracking-tight mb-4"
                  style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
                >
                  House of Sapphire
                </h3>
                <p className="text-muted-foreground leading-relaxed font-body max-w-sm">
                  A constellation of ventures shaping the future. We connect
                  visionaries, technologists, and changemakers under one roof.
                </p>
              </div>

              <div className="mb-12">
                <h4 className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6 font-body">
                  Quick Links
                </h4>
                <nav className="grid grid-cols-2 gap-3">
                  {quickLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-sm text-foreground/60 hover:text-primary hover:translate-x-1 transition-all duration-300 font-body"
                    >
                      → {link.name}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            <div>
              <h4 className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body">
                Follow Us
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm text-foreground/60 hover:text-primary transition-all duration-300 px-4 py-2.5 rounded-full border border-border/40 hover:border-primary/40 hover:shadow-[0_0_20px_hsl(var(--primary)/0.15)] font-body"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="section-divider mb-8" />
        <div ref={bottomRef} className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-body">
          <p>© 2025 House of Sapphire. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
