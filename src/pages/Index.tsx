import { VerticalNav } from '@/components/VerticalNav';
import { HeroSection } from '@/components/HeroSection';

import { LoadingScreen } from '@/components/LoadingScreen';
import { TrustedBy } from '@/components/TrustedBy';
import { AboutSection } from '@/components/AboutSection';
import { InitiativesSection } from '@/components/InitiativesSection';
import { FoundersSection } from '@/components/FoundersSection';
import { VisionariesSection } from '@/components/VisionariesSection';
import { TimesSquareSection } from '@/components/TimesSquareSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <LoadingScreen />
      <VerticalNav />

      <main className="relative z-[1] md:pl-16">
        <HeroSection />
        <TrustedBy />
        <AboutSection />
        <InitiativesSection />
        <FoundersSection />
        <VisionariesSection />
        <TimesSquareSection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
