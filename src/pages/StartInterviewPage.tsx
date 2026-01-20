import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  ArrowLeft,
  ArrowRight,
  FileText,
  Briefcase,
  Globe,
  MessageSquare,
  Clock,
  Mic,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const StartInterviewPage: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const [selectedCv, setSelectedCv] = useState('cv-1');
  const [selectedJd, setSelectedJd] = useState('jd-1');
  const [interviewType, setInterviewType] = useState('mixed');
  const [interviewLanguage, setInterviewLanguage] = useState<string>(language);
  const [micPermission, setMicPermission] = useState<'unknown' | 'granted' | 'denied'>('unknown');

  // Mock data
  const cvs = [
    { id: 'cv-1', name: 'Software_Engineer_CV.pdf', uploadedAt: '2 days ago' },
    { id: 'cv-2', name: 'Resume_2024.docx', uploadedAt: '1 week ago' },
  ];

  const jds = [
    { id: 'jd-1', title: 'Senior Software Engineer', company: 'TechCorp' },
    { id: 'jd-2', title: 'Full Stack Developer', company: 'StartupX' },
  ];

  const interviewTypes = [
    { id: 'behavioral', label: t('interview.type.behavioral'), icon: MessageSquare },
    { id: 'technical', label: t('interview.type.technical'), icon: FileText },
    { id: 'mixed', label: t('interview.type.mixed'), icon: Briefcase },
  ];

  const languages = [
    { id: 'en', label: 'English', flag: '🇺🇸' },
    { id: 'he', label: 'עברית', flag: '🇮🇱' },
    { id: 'ar', label: 'العربية', flag: '🇸🇦' },
    { id: 'multi', label: 'Multilingual', flag: '🌍' },
  ];

  const checkMicPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      setMicPermission('granted');
    } catch (error) {
      setMicPermission('denied');
    }
  };

  const handleStartInterview = () => {
    if (micPermission !== 'granted') {
      checkMicPermission();
      return;
    }
    navigate('/interview/live');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated />

      <main className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold mb-2">{t('interview.config.title')}</h1>
          <p className="text-muted-foreground">
            Configure your interview session and start practicing.
          </p>
        </div>

        <div className="space-y-8">
          {/* CV Selection */}
          <div className="bg-card rounded-xl border border-border p-6">
            <Label className="text-lg font-semibold mb-4 block">
              <FileText className="w-5 h-5 inline mr-2 text-primary" />
              {t('interview.selectCv')}
            </Label>
            <div className="grid sm:grid-cols-2 gap-4">
              {cvs.map((cv) => (
                <button
                  key={cv.id}
                  onClick={() => setSelectedCv(cv.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedCv === cv.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="font-medium">{cv.name}</div>
                  <div className="text-sm text-muted-foreground">Uploaded {cv.uploadedAt}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Job Description Selection */}
          <div className="bg-card rounded-xl border border-border p-6">
            <Label className="text-lg font-semibold mb-4 block">
              <Briefcase className="w-5 h-5 inline mr-2 text-primary" />
              {t('interview.selectJd')}
            </Label>
            <div className="grid sm:grid-cols-2 gap-4">
              {jds.map((jd) => (
                <button
                  key={jd.id}
                  onClick={() => setSelectedJd(jd.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedJd === jd.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="font-medium">{jd.title}</div>
                  <div className="text-sm text-muted-foreground">{jd.company}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Interview Type */}
          <div className="bg-card rounded-xl border border-border p-6">
            <Label className="text-lg font-semibold mb-4 block">
              {t('interview.type')}
            </Label>
            <div className="grid grid-cols-3 gap-4">
              {interviewTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setInterviewType(type.id)}
                  className={`p-4 rounded-lg border-2 text-center transition-all ${
                    interviewType === type.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <type.icon className={`w-6 h-6 mx-auto mb-2 ${
                    interviewType === type.id ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                  <div className="font-medium text-sm">{type.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Language Selection */}
          <div className="bg-card rounded-xl border border-border p-6">
            <Label className="text-lg font-semibold mb-4 block">
              <Globe className="w-5 h-5 inline mr-2 text-primary" />
              {t('interview.language')}
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setInterviewLanguage(lang.id)}
                  className={`p-4 rounded-lg border-2 text-center transition-all ${
                    interviewLanguage === lang.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="text-2xl mb-1">{lang.flag}</div>
                  <div className="font-medium text-sm">{lang.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Session Summary */}
          <div className="bg-accent/50 rounded-xl border border-primary/20 p-6">
            <h3 className="font-semibold mb-4">Session Summary</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Questions</div>
                  <div className="font-medium">8 {t('interview.questions')}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">{t('interview.duration')}</div>
                  <div className="font-medium">~25 {t('common.minutes')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Microphone check */}
          <div className={`rounded-xl border p-6 ${
            micPermission === 'granted' 
              ? 'bg-success/5 border-success/20' 
              : micPermission === 'denied'
              ? 'bg-destructive/5 border-destructive/20'
              : 'bg-muted/50 border-border'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  micPermission === 'granted'
                    ? 'bg-success/10'
                    : micPermission === 'denied'
                    ? 'bg-destructive/10'
                    : 'bg-muted'
                }`}>
                  <Mic className={`w-5 h-5 ${
                    micPermission === 'granted'
                      ? 'text-success'
                      : micPermission === 'denied'
                      ? 'text-destructive'
                      : 'text-muted-foreground'
                  }`} />
                </div>
                <div>
                  <div className="font-medium">
                    {micPermission === 'granted' && (
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        Microphone ready
                      </span>
                    )}
                    {micPermission === 'denied' && (
                      <span className="flex items-center gap-2 text-destructive">
                        <AlertCircle className="w-4 h-4" />
                        Microphone access denied
                      </span>
                    )}
                    {micPermission === 'unknown' && t('interview.micRequired')}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {micPermission === 'unknown' && 'Click to check microphone access'}
                    {micPermission === 'denied' && 'Please enable microphone in browser settings'}
                  </div>
                </div>
              </div>
              {micPermission !== 'granted' && (
                <Button variant="outline" size="sm" onClick={checkMicPermission}>
                  Check Access
                </Button>
              )}
            </div>
          </div>

          {/* Start button */}
          <div className="flex justify-end">
            <Button
              variant="hero"
              size="xl"
              onClick={handleStartInterview}
              disabled={micPermission === 'denied'}
            >
              {t('interview.start')}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StartInterviewPage;