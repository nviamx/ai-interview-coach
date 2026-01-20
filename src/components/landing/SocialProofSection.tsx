import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Cohen',
    role: 'Software Engineer',
    company: 'Hired at Google',
    content: 'The AI Interview Coach helped me prepare for technical interviews in both English and Hebrew. The feedback was incredibly detailed and helped me improve my communication skills.',
    rating: 5,
  },
  {
    name: 'Ahmed Hassan',
    role: 'Career Coach',
    company: 'TechCareer Academy',
    content: 'As a coach, this platform has transformed how I prepare my students. I can create custom scenarios and track their progress in real-time. The multilingual support is a game-changer.',
    rating: 5,
  },
  {
    name: 'David Levy',
    role: 'Product Manager',
    company: 'Hired at Meta',
    content: 'I practiced over 50 interviews with this tool. The ability to switch between languages mid-answer made it feel like a real interview. Highly recommended!',
    rating: 5,
  },
];

const stats = [
  { value: '50,000+', label: 'Interview Sessions' },
  { value: '85%', label: 'Success Rate' },
  { value: '3', label: 'Languages Supported' },
  { value: '500+', label: 'Active Coaches' },
];

export const SocialProofSection: React.FC = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by candidates and coaches</h2>
          <p className="text-lg text-muted-foreground">See what our users have to say about their experience</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                ))}
              </div>

              <Quote className="w-8 h-8 text-primary/20 mb-4" />

              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-medium">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role} • {testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
