import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import aboutImage from '@/assets/about-sapphire.jpg';

gsap.registerPlugin(ScrollTrigger);


export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading — each word slides up
      const words = headingRef.current?.querySelectorAll('.word');
      if (words) {
        gsap.fromTo(
          words,
          { y: 100, opacity: 0, rotateX: 30 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            stagger: 0.06,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        );
      }

      // Text paragraphs — stagger reveal
      const paras = textRef.current?.querySelectorAll('.about-para');
      if (paras) {
        gsap.fromTo(
          paras,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 75%',
            },
          }
        );
      }

      // Image — parallax + reveal
      if (imageRef.current) {
        const img = imageRef.current.querySelector('img');
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

        // Inner image parallax
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -10, scale: 1.15 },
            {
              yPercent: 10,
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: imageRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          );
        }
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headingWords = ['Defining', 'the', 'Future,', 'One', 'Venture', 'at', 'a', 'Time'];

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
              style={{ perspective: '600px' }}
            >
              {headingWords.map((word, i) => (
                <span key={i} className="word inline-block mr-[0.3em]">
                  {word === 'Future,' ? (
                    <span className="text-gradient-sapphire">{word}</span>
                  ) : (
                    word
                  )}
                </span>
              ))}
            </h2>
            <div ref={textRef}>
              <p className="about-para text-lg text-muted-foreground mb-6 leading-relaxed font-body">
                House of Sapphire is the nexus of innovation — a parent company
                overseeing a diverse portfolio of ventures spanning technology,
                design, social impact, and beyond. We don't just build companies;
                we architect ecosystems.
              </p>
              <p className="about-para text-lg text-muted-foreground mb-8 leading-relaxed font-body">
                Founded on the principle that bold ideas deserve bold execution,
                HOS connects visionaries, technologists, and changemakers under
                one roof. Every project carries the sapphire standard — a
                commitment to excellence that defines everything we touch.
              </p>
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
          </div>
        </div>

      </div>
    </section>
  );
};
