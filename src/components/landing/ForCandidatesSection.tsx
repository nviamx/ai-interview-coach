import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, BarChart3, Users, Clock, Target } from 'lucide-react';

export const ForCandidatesSection: React.FC = () => {
  const { t } = useLanguage();

  const benefits = [
    { icon: Target, text: t('candidates.benefit1') },
    { icon: Users, text: t('candidates.benefit2') },
    { icon: BarChart3, text: t('candidates.benefit3') },
    { icon: Clock, text: t('candidates.benefit4') },
  ];

  return (
    <section id="candidates" className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div className="space-y-8">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
                {t('candidates.title')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('candidates.subtitle')}
              </h2>
              <p className="text-lg text-muted-foreground">
                Get personalized interview practice based on your actual CV and the specific role you're targeting. Our AI adapts to your experience level and career goals.
              </p>
            </div>

            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <benefit.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground">{benefit.text}</span>
                </li>
              ))}
            </ul>

            <Button variant="hero" size="lg" asChild>
              <Link to="/auth?mode=signup">
                Start practicing now
                <ArrowRight className="w-4 h-4 rtl-flip" />
              </Link>
            </Button>
          </div>

          {/* Right - Dashboard Preview */}
          <div className="relative">
            <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
              {/* Header */}
              <div className="bg-muted/50 p-4 border-b border-border flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-warning/60" />
                  <div className="w-3 h-3 rounded-full bg-success/60" />
                </div>
                <span className="text-sm text-muted-foreground">Candidate Dashboard</span>
              </div>

              <div className="p-6 space-y-6">
                {/* Welcome */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">Welcome back, Sarah!</h3>
                    <p className="text-sm text-muted-foreground">Ready for your next practice session?</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-primary" />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Sessions', value: '12' },
                    { label: 'Avg Score', value: '85%' },
                    { label: 'This Week', value: '3' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-muted/50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-primary">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Action cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-accent/50 rounded-xl p-4 cursor-pointer hover:bg-accent transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <Target className="w-4 h-4 text-primary" />
                    </div>
                    <h4 className="font-medium text-sm">Start Interview</h4>
                    <p className="text-xs text-muted-foreground">Practice now</p>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-4 cursor-pointer hover:bg-muted transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center mb-3">
                      <BarChart3 className="w-4 h-4 text-secondary" />
                    </div>
                    <h4 className="font-medium text-sm">View Reports</h4>
                    <p className="text-xs text-muted-foreground">12 available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
