import { VerticalNav } from '@/components/VerticalNav';
import { HeroSection } from '@/components/HeroSection';
import { TrustedBy } from '@/components/TrustedBy';
import { AboutSection } from '@/components/AboutSection';
import { VideoReelSection } from '@/components/VideoReelSection';
import { InitiativesSection } from '@/components/InitiativesSection';
import { TimesSquareSection } from '@/components/TimesSquareSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <VerticalNav />

      <main className="md:pl-16">
        <HeroSection />
        <TrustedBy />
        <AboutSection />
        <VideoReelSection />
        <InitiativesSection />
        <TimesSquareSection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
