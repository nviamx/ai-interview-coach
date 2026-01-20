import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Users, 
  Layers, 
  BarChart3,
  ArrowRight,
  Calendar,
  TrendingUp,
  Clock,
  Star
} from 'lucide-react';

const CoachDashboard: React.FC = () => {
  const { t } = useLanguage();

  // Mock data
  const stats = [
    { label: t('coach.activeCandidates'), value: '24', icon: Users, trend: '+3 this week' },
    { label: t('coach.scenarios'), value: '8', icon: Layers, trend: '2 published' },
    { label: t('coach.recentSessions'), value: '42', icon: Calendar, trend: 'This month' },
  ];

  const recentSessions = [
    { candidate: 'Sarah Cohen', scenario: 'Product Manager', score: 87, date: '2 hours ago' },
    { candidate: 'David Levy', scenario: 'Software Engineer', score: 92, date: 'Yesterday' },
    { candidate: 'Ahmed Hassan', scenario: 'Data Analyst', score: 75, date: '2 days ago' },
    { candidate: 'Rachel Green', scenario: 'UX Designer', score: 88, date: '3 days ago' },
  ];

  const topCandidates = [
    { name: 'David Levy', sessions: 12, avgScore: 91, improvement: '+15%' },
    { name: 'Sarah Cohen', sessions: 8, avgScore: 86, improvement: '+12%' },
    { name: 'Ahmed Hassan', sessions: 6, avgScore: 78, improvement: '+8%' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated userType="coach" />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t('coach.dashboard.title')}</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your coaching activity.
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="outline" asChild>
              <Link to="/coach/candidates">
                <Users className="w-4 h-4" />
                {t('coach.candidates.title')}
              </Link>
            </Button>
            <Button variant="hero" asChild>
              <Link to="/coach/scenarios/new">
                <Plus className="w-4 h-4" />
                {t('coach.createScenario')}
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card rounded-xl border border-border p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent sessions */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recent Sessions</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/coach/analytics">
                  View all
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Candidate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Scenario
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {recentSessions.map((session, index) => (
                      <tr key={index} className="hover:bg-muted/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-xs font-medium">
                              {session.candidate.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="font-medium">{session.candidate}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {session.scenario}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`font-semibold ${
                            session.score >= 85 ? 'text-success' :
                            session.score >= 70 ? 'text-primary' :
                            'text-warning'
                          }`}>
                            {session.score}%
                          </span>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground text-sm">
                          {session.date}
                        </td>
                        <td className="px-6 py-4">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top performers */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Star className="w-4 h-4 text-warning" />
                Top Performers
              </h3>
              <div className="space-y-4">
                {topCandidates.map((candidate, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </span>
                      <div>
                        <div className="font-medium text-sm">{candidate.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {candidate.sessions} sessions
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-sm">{candidate.avgScore}%</div>
                      <div className="text-xs text-success">{candidate.improvement}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="bg-accent/50 rounded-xl border border-primary/20 p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link to="/coach/scenarios/new">
                    <Plus className="w-4 h-4" />
                    Create new scenario
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link to="/coach/candidates">
                    <Users className="w-4 h-4" />
                    Invite candidate
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link to="/coach/analytics">
                    <BarChart3 className="w-4 h-4" />
                    View analytics
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CoachDashboard;