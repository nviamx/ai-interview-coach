import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { 
  Upload, 
  Play, 
  FileText, 
  Clock, 
  TrendingUp, 
  Target,
  ArrowRight,
  Calendar,
  BarChart3
} from 'lucide-react';

const CandidateDashboard: React.FC = () => {
  const { t } = useLanguage();

  // Mock data
  const lastSession = {
    date: '2 days ago',
    score: 85,
    type: 'Behavioral',
    duration: '25 min',
  };

  const stats = [
    { label: 'Total Sessions', value: '12', icon: Calendar },
    { label: 'Average Score', value: '85%', icon: TrendingUp },
    { label: 'This Week', value: '3', icon: Target },
  ];

  const quickActions = [
    {
      title: t('dashboard.uploadCv'),
      description: 'Add your CV and target job description',
      icon: Upload,
      href: '/upload',
      variant: 'primary' as const,
    },
    {
      title: t('dashboard.startInterview'),
      description: 'Begin a practice session',
      icon: Play,
      href: '/interview/start',
      variant: 'secondary' as const,
    },
    {
      title: t('dashboard.viewReports'),
      description: 'Review past performance',
      icon: FileText,
      href: '/reports',
      variant: 'outline' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Welcome header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {t('dashboard.welcome')}, Sarah! 👋
            </h1>
            <p className="text-muted-foreground">
              Ready for your next practice session?
            </p>
          </div>
          <Button variant="hero" className="mt-4 md:mt-0" asChild>
            <Link to="/interview/start">
              <Play className="w-4 h-4" />
              Start Interview
            </Link>
          </Button>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card rounded-xl border border-border p-6 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick actions */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  to={action.href}
                  className={`group bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                    action.variant === 'primary' ? 'bg-accent/50 border-primary/20' : ''
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${
                    action.variant === 'primary' 
                      ? 'bg-primary text-primary-foreground' 
                      : action.variant === 'secondary'
                      ? 'bg-secondary/10 text-secondary'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </Link>
              ))}
            </div>

            {/* Recent sessions */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Recent Sessions</h2>
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                {[1, 2, 3].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Behavioral Interview</div>
                        <div className="text-sm text-muted-foreground">
                          {i === 0 ? '2 days ago' : i === 1 ? '5 days ago' : '1 week ago'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-semibold text-primary">{85 - i * 3}%</div>
                        <div className="text-xs text-muted-foreground">Score</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Last session summary */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-semibold mb-4">{t('dashboard.lastSession')}</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary-foreground">
                      {lastSession.score}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-sm font-medium">{lastSession.type}</div>
                    <div className="text-xs text-muted-foreground">Type</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-sm font-medium">{lastSession.duration}</div>
                    <div className="text-xs text-muted-foreground">Duration</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/reports/latest">
                    View Full Report
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-accent/50 rounded-xl border border-primary/20 p-6">
              <h3 className="font-semibold mb-3">💡 Quick Tip</h3>
              <p className="text-sm text-muted-foreground">
                Practice at least 3 times per week to see significant improvement in your interview skills. Consistency is key!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CandidateDashboard;