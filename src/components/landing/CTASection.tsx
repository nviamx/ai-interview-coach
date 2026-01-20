import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CTASection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-primary opacity-10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container relative mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Start your free practice today
          </div>

          <h2 className="text-3xl md:text-5xl font-bold">
            Ready to ace your next interview?
          </h2>

          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Join thousands of candidates who have improved their interview skills with AI-powered practice sessions. Start for free, no credit card required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/auth?mode=signup">
                Get started for free
                <ArrowRight className="w-5 h-5 rtl-flip" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/#how-it-works">
                Learn more
              </Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            ✓ Free trial included • ✓ No credit card required • ✓ Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};
