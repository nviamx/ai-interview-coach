import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Settings, Users, LineChart, Layers } from 'lucide-react';

export const ForCoachesSection: React.FC = () => {
  const { t } = useLanguage();

  const benefits = [
    { icon: Settings, text: t('coaches.benefit1') },
    { icon: LineChart, text: t('coaches.benefit2') },
    { icon: Layers, text: t('coaches.benefit3') },
    { icon: Users, text: t('coaches.benefit4') },
  ];

  return (
    <section id="coaches" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Scenario Builder Preview */}
          <div className="order-2 lg:order-1 relative">
            <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
              {/* Header */}
              <div className="bg-muted/50 p-4 border-b border-border flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-warning/60" />
                  <div className="w-3 h-3 rounded-full bg-success/60" />
                </div>
                <span className="text-sm text-muted-foreground">Scenario Builder</span>
              </div>

              <div className="p-6 space-y-6">
                {/* Scenario name */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Scenario Name</label>
                  <div className="bg-muted/50 rounded-lg px-4 py-3 text-sm">
                    Senior Product Manager Interview
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {['Technical', 'Leadership', 'Strategy', 'EN/HE'].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Questions list */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Questions (8)</label>
                  {[
                    'Describe your approach to roadmap prioritization',
                    'How do you handle stakeholder conflicts?',
                    'Walk me through a product launch you led',
                  ].map((q, i) => (
                    <div key={i} className="flex items-start gap-3 bg-muted/30 rounded-lg p-3">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-sm text-muted-foreground">{q}</span>
                    </div>
                  ))}
                  <div className="text-center text-sm text-muted-foreground py-2">
                    + 5 more questions
                  </div>
                </div>

                <Button className="w-full" variant="hero">
                  Save Scenario
                </Button>
              </div>
            </div>

            {/* Floating stats card */}
            <div className="absolute -right-4 -bottom-4 bg-card rounded-xl shadow-lg border border-border p-4 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-success" />
                </div>
                <div>
                  <div className="text-lg font-bold">24</div>
                  <div className="text-xs text-muted-foreground">Active Candidates</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
                {t('coaches.title')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('coaches.subtitle')}
              </h2>
              <p className="text-lg text-muted-foreground">
                Create custom interview scenarios, track your candidates' progress, and provide targeted coaching at scale. Our platform handles the AI interviews while you focus on personalized guidance.
              </p>
            </div>

            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <benefit.icon className="w-4 h-4 text-secondary" />
                  </div>
                  <span className="text-muted-foreground">{benefit.text}</span>
                </li>
              ))}
            </ul>

            <Button variant="secondary" size="lg" asChild>
              <Link to="/auth?mode=signup&type=coach">
                Start coaching with AI
                <ArrowRight className="w-4 h-4 rtl-flip" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
