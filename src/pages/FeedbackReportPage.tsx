import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  Play, 
  ArrowLeft,
  TrendingUp,
  MessageSquare,
  Star,
  Target,
  Brain,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const FeedbackReportPage: React.FC = () => {
  const { t } = useLanguage();
  const [expandedQuestion, setExpandedQuestion] = React.useState<number | null>(0);

  // Mock data
  const report = {
    overallScore: 85,
    date: 'January 20, 2026',
    duration: '24 minutes',
    type: 'Mixed Interview',
    language: 'English (with Hebrew)',
    scores: {
      content: 88,
      communication: 82,
      technical: 90,
      confidence: 78,
      structure: 85,
    },
    strengths: [
      'Strong technical knowledge demonstrated in system design questions',
      'Clear articulation of past project experiences',
      'Good use of STAR method in behavioral responses',
      'Confident tone when discussing familiar topics',
    ],
    improvements: [
      'Could provide more specific metrics and outcomes',
      'Some hesitation when transitioning between topics',
      'Consider practicing more concise answers for introductory questions',
      'More eye contact and pauses for emphasis would enhance delivery',
    ],
    questions: [
      {
        text: 'Tell me about yourself and your experience in software development.',
        score: 82,
        feedback: 'Good overview of background, but could be more concise. Consider focusing on 2-3 key highlights rather than a chronological summary.',
        suggestedAnswer: 'I\'m a software engineer with 5 years of experience specializing in full-stack development. Most recently at TechCorp, I led the development of a microservices platform that reduced deployment time by 60%. I\'m passionate about building scalable systems and mentoring junior developers, which is what drew me to this role at your company.',
      },
      {
        text: 'Describe a challenging project you worked on and how you overcame obstacles.',
        score: 90,
        feedback: 'Excellent use of the STAR method. The specific metrics provided (40% improvement) added credibility. Consider adding more about the lessons learned.',
        suggestedAnswer: null,
      },
      {
        text: 'How do you approach debugging a complex issue in production?',
        score: 95,
        feedback: 'Outstanding response! Systematic approach clearly explained with real-world examples. The mention of post-mortem processes showed maturity.',
        suggestedAnswer: null,
      },
      {
        text: 'Tell me about a time when you had to work with a difficult team member.',
        score: 75,
        feedback: 'The situation was well described, but the resolution felt rushed. More detail on how you rebuilt the relationship would strengthen this answer.',
        suggestedAnswer: 'In my previous role, I worked with a senior developer who was resistant to new testing practices. Instead of pushing my ideas, I scheduled a one-on-one to understand his concerns. I learned he was worried about timeline impacts. Together, we created a phased rollout plan that addressed his concerns while still improving our code quality by 35%. This experience taught me the importance of active listening and finding common ground.',
      },
    ],
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-success';
    if (score >= 70) return 'text-primary';
    return 'text-warning';
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return 'bg-success/10';
    if (score >= 70) return 'bg-primary/10';
    return 'bg-warning/10';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated />

      <main className="container mx-auto px-4 pt-24 pb-12 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{t('feedback.title')}</h1>
              <p className="text-muted-foreground">
                {report.type} • {report.date} • {report.duration}
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Download className="w-4 h-4" />
                {t('feedback.download')}
              </Button>
              <Button variant="hero" asChild>
                <Link to="/interview/start">
                  <Play className="w-4 h-4" />
                  {t('feedback.practiceAgain')}
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Overall score */}
        <div className="bg-card rounded-2xl border border-border p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Score circle */}
            <div className="relative">
              <div className="w-40 h-40 rounded-full bg-gradient-primary flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-card flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold">{report.overallScore}</div>
                    <div className="text-sm text-muted-foreground">{t('feedback.overall')}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Score breakdown */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { key: 'content', label: t('feedback.content'), icon: MessageSquare },
                { key: 'communication', label: t('feedback.communication'), icon: Target },
                { key: 'technical', label: t('feedback.technical'), icon: Brain },
                { key: 'confidence', label: t('feedback.confidence'), icon: Star },
                { key: 'structure', label: t('feedback.structure'), icon: TrendingUp },
              ].map(({ key, label, icon: Icon }) => (
                <div key={key} className="text-center">
                  <div className={`w-12 h-12 mx-auto rounded-xl ${getScoreBg(report.scores[key as keyof typeof report.scores])} flex items-center justify-center mb-2`}>
                    <Icon className={`w-5 h-5 ${getScoreColor(report.scores[key as keyof typeof report.scores])}`} />
                  </div>
                  <div className={`text-2xl font-bold ${getScoreColor(report.scores[key as keyof typeof report.scores])}`}>
                    {report.scores[key as keyof typeof report.scores]}%
                  </div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Strengths & Improvements */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Strengths */}
          <div className="bg-success/5 rounded-xl border border-success/20 p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-success">
              <CheckCircle2 className="w-5 h-5" />
              {t('feedback.strengths')}
            </h3>
            <ul className="space-y-3">
              {report.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-success mt-2 shrink-0" />
                  <span className="text-muted-foreground">{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Improvements */}
          <div className="bg-warning/5 rounded-xl border border-warning/20 p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-warning">
              <AlertCircle className="w-5 h-5" />
              {t('feedback.improvements')}
            </h3>
            <ul className="space-y-3">
              {report.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-warning mt-2 shrink-0" />
                  <span className="text-muted-foreground">{improvement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Per-question analysis */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Question-by-Question Analysis</h2>
          
          {report.questions.map((question, index) => (
            <div
              key={index}
              className="bg-card rounded-xl border border-border overflow-hidden"
            >
              <button
                onClick={() => setExpandedQuestion(expandedQuestion === index ? null : index)}
                className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg ${getScoreBg(question.score)} flex items-center justify-center shrink-0`}>
                    <span className={`font-bold ${getScoreColor(question.score)}`}>{question.score}</span>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Question {index + 1}</div>
                    <div className="font-medium">{question.text}</div>
                  </div>
                </div>
                {expandedQuestion === index ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                )}
              </button>

              {expandedQuestion === index && (
                <div className="px-6 pb-6 pt-0 space-y-4 border-t border-border">
                  <div className="pt-4">
                    <h4 className="text-sm font-medium mb-2">Feedback</h4>
                    <p className="text-muted-foreground text-sm">{question.feedback}</p>
                  </div>

                  {question.suggestedAnswer && (
                    <div className="bg-accent/50 rounded-lg p-4 border border-primary/20">
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-primary" />
                        {t('feedback.suggested')}
                      </h4>
                      <p className="text-sm text-muted-foreground italic">
                        "{question.suggestedAnswer}"
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default FeedbackReportPage;