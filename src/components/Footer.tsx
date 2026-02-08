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
  const contentRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder - would integrate with backend
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <footer
      id="footer"
      ref={sectionRef}
      className="relative pt-24 md:pt-32 pb-8 px-6"
    >
      <div className="section-divider mb-16" />

      <div ref={contentRef} className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Contact form */}
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4 font-body">
              Get in Touch
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter leading-tight mb-8 font-display">
              Let's Build{' '}
              <span className="text-gradient-sapphire">Together</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-5 py-4 rounded-xl bg-card border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 font-body"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full px-5 py-4 rounded-xl bg-card border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 font-body"
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  className="w-full px-5 py-4 rounded-xl bg-card border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 resize-none font-body"
                />
              </div>
              <button type="submit" className="btn-sapphire w-full sm:w-auto">
                Send Message
              </button>
            </form>
          </div>

          {/* Info side */}
          <div className="lg:pl-12">
            <div className="mb-12">
              <h3 className="text-2xl font-bold tracking-tight mb-4 font-display">
                House of Sapphire
              </h3>
              <p className="text-muted-foreground leading-relaxed font-body">
                A constellation of ventures shaping the future. We connect
                visionaries, technologists, and changemakers under one roof.
              </p>
            </div>

            <div className="mb-12">
              <h4 className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body">
                Quick Links
              </h4>
              <nav className="space-y-3">
                {quickLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-sm text-foreground/70 hover:text-primary transition-colors duration-300 font-body"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            <div>
              <h4 className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body">
                Follow Us
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm text-foreground/70 hover:text-primary transition-colors duration-300 px-3 py-2 rounded-lg border border-border/50 hover:border-primary/30 font-body"
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
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-body">
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
