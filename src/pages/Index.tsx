import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { ForCandidatesSection } from '@/components/landing/ForCandidatesSection';
import { ForCoachesSection } from '@/components/landing/ForCoachesSection';
import { SocialProofSection } from '@/components/landing/SocialProofSection';
import { CTASection } from '@/components/landing/CTASection';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <ForCandidatesSection />
        <ForCoachesSection />
        <SocialProofSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;