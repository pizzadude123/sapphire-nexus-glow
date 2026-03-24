import { useEffect, useRef, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SapphireScene } from './SapphireScene';

gsap.registerPlugin(ScrollTrigger);

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = headingRef.current?.querySelectorAll('.word');
      if (words) {
        gsap.fromTo(words, { y: 80, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.05, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        });
      }

      const paras = textRef.current?.querySelectorAll('.about-para');
      if (paras) {
        gsap.fromTo(paras, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: textRef.current, start: 'top 75%' },
        });
      }

      if (sceneRef.current) {
        gsap.fromTo(sceneRef.current, { opacity: 0, scale: 0.85 }, {
          opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headingWords = ['Defining', 'the', 'Future,', 'One', 'Venture', 'at', 'a', 'Time'];

  return (
    <section id="about" ref={sectionRef} className="relative py-28 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Text */}
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-6 font-body">About</p>
            <h2 ref={headingRef} className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter leading-[1.1] mb-8 font-display">
              {headingWords.map((word, i) => (
                <span key={i} className="word inline-block mr-[0.3em]">
                  {word === 'Future,' ? <span className="text-gradient-sapphire">{word}</span> : word}
                </span>
              ))}
            </h2>
            <div ref={textRef}>
              <p className="about-para text-muted-foreground mb-5 leading-relaxed font-body">
                House of Sapphire is the nexus of innovation — a parent company overseeing a diverse portfolio of ventures spanning technology, design, social impact, and beyond.
              </p>
              <p className="about-para text-muted-foreground leading-relaxed font-body">
                Founded on the principle that bold ideas deserve bold execution, HOS connects visionaries, technologists, and changemakers under one roof. Every project carries the sapphire standard.
              </p>
            </div>
          </div>

          {/* 3D Sapphire */}
          <div ref={sceneRef} className="relative aspect-square max-w-[420px] mx-auto w-full">
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-10 h-10 border border-primary/20 border-t-primary/60 rounded-full animate-spin" />
              </div>
            }>
              <SapphireScene />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};
