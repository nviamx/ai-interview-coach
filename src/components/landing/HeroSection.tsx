import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mic, MessageSquare, Globe, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container relative mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="text-center lg:text-start space-y-8 stagger-children">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              {t('hero.badge')}
            </div>

            {/* Main headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-gradient">{t('hero.title').split(' ').slice(0, 3).join(' ')}</span>
              <br />
              {t('hero.title').split(' ').slice(3).join(' ')}
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
              {t('hero.subtitle')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="xl" asChild>
                <Link to="/auth?mode=signup">
                  {t('hero.cta.primary')}
                  <ArrowRight className="w-5 h-5 rtl-flip" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/#coaches">
                  {t('hero.cta.secondary')}
                </Link>
              </Button>
            </div>

            {/* Language chips */}
            <div className="flex items-center gap-3 justify-center lg:justify-start pt-4">
              <span className="text-sm text-muted-foreground">Supported:</span>
              <div className="flex gap-2">
                {['EN', 'עברית', 'العربية'].map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1 rounded-full bg-muted text-sm font-medium"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Hero illustration */}
          <div className="relative lg:pl-8">
            <div className="relative max-w-md mx-auto">
              {/* Main card - Interview question */}
              <div className="bg-card rounded-2xl shadow-xl border border-border p-6 animate-fade-in-up">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Question 3 of 8 • Behavioral</div>
                    <p className="font-medium">
                      Tell me about a time when you had to work with a difficult team member. How did you handle it?
                    </p>
                  </div>
                </div>

                {/* Audio waveform visualization */}
                <div className="bg-muted/50 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-center gap-1 h-12">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-primary rounded-full animate-wave"
                        style={{
                          height: `${Math.random() * 100}%`,
                          animationDelay: `${i * 0.05}s`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-center mt-2">
                    <span className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                      <Mic className="w-4 h-4 text-primary" />
                      Listening...
                    </span>
                  </div>
                </div>

                {/* Transcript preview */}
                <div className="text-sm text-muted-foreground">
                  <span className="text-foreground">"In my previous role, I had a colleague who..."</span>
                </div>
              </div>

              {/* Floating feedback card */}
              <div className="absolute -right-4 top-1/2 bg-card rounded-xl shadow-lg border border-border p-4 w-48 animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                    <span className="text-success font-bold text-sm">87</span>
                  </div>
                  <span className="text-sm font-medium">Great Answer!</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Content</span>
                    <span className="text-success">92%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Clarity</span>
                    <span className="text-primary">85%</span>
                  </div>
                </div>
              </div>

              {/* Floating language detection */}
              <div className="absolute -left-4 bottom-1/4 bg-card rounded-xl shadow-lg border border-border p-3 animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" />
                  <div className="flex gap-1">
                    <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">EN</span>
                    <span className="px-2 py-0.5 rounded bg-muted text-muted-foreground text-xs">עב</span>
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
