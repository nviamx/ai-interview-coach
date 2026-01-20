import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Upload, Sparkles, Mic, FileText } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    titleKey: 'features.step1.title',
    descKey: 'features.step1.desc',
    color: 'primary',
  },
  {
    icon: Sparkles,
    titleKey: 'features.step2.title',
    descKey: 'features.step2.desc',
    color: 'secondary',
  },
  {
    icon: Mic,
    titleKey: 'features.step3.title',
    descKey: 'features.step3.desc',
    color: 'primary',
  },
  {
    icon: FileText,
    titleKey: 'features.step4.title',
    descKey: 'features.step4.desc',
    color: 'success',
  },
];

export const HowItWorksSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('features.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From upload to feedback in four simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-border to-transparent z-0" />
              )}
              
              <div className="relative bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                {/* Step number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-md">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl mb-4 flex items-center justify-center ${
                  step.color === 'primary' ? 'bg-primary/10' :
                  step.color === 'secondary' ? 'bg-secondary/10' :
                  'bg-success/10'
                }`}>
                  <step.icon className={`w-7 h-7 ${
                    step.color === 'primary' ? 'text-primary' :
                    step.color === 'secondary' ? 'text-secondary' :
                    'text-success'
                  }`} />
                </div>

                <h3 className="font-semibold text-lg mb-2">{t(step.titleKey)}</h3>
                <p className="text-muted-foreground text-sm">{t(step.descKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
