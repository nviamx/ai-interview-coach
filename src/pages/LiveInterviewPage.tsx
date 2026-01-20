import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { 
  Mic, 
  MicOff, 
  Pause, 
  Play, 
  RotateCcw, 
  StopCircle,
  Clock,
  Globe,
  MessageSquare,
  Sparkles
} from 'lucide-react';

const LiveInterviewPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [detectedLanguages, setDetectedLanguages] = useState<string[]>(['EN']);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Mock questions
  const questions = [
    {
      text: 'Tell me about yourself and your experience in software development.',
      type: 'Behavioral',
      difficulty: 'Easy',
    },
    {
      text: 'Describe a challenging project you worked on and how you overcame obstacles.',
      type: 'Behavioral',
      difficulty: 'Medium',
    },
    {
      text: 'How do you approach debugging a complex issue in production?',
      type: 'Technical',
      difficulty: 'Medium',
    },
    {
      text: 'Tell me about a time when you had to work with a difficult team member.',
      type: 'Behavioral',
      difficulty: 'Medium',
    },
    {
      text: 'How would you design a scalable microservices architecture?',
      type: 'Technical',
      difficulty: 'Hard',
    },
    {
      text: 'What are your salary expectations and career goals for the next 5 years?',
      type: 'Situational',
      difficulty: 'Medium',
    },
    {
      text: 'How do you stay updated with the latest technology trends?',
      type: 'Behavioral',
      difficulty: 'Easy',
    },
    {
      text: 'Do you have any questions for us?',
      type: 'Closing',
      difficulty: 'Easy',
    },
  ];

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isPaused) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMicClick = () => {
    if (isRecording) {
      setIsRecording(false);
      // Simulate transcript update
      setTranscript(prev => prev + ' I believe that effective communication and collaboration are key to successful project delivery...');
    } else {
      setIsRecording(true);
      // Simulate language detection
      if (Math.random() > 0.7) {
        setDetectedLanguages(['EN', 'HE']);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setTranscript('');
      setIsRecording(false);
    } else {
      // End interview
      navigate('/reports/latest');
    }
  };

  const handleEndSession = () => {
    navigate('/reports/latest');
  };

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-lg border-b border-border px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-primary" />
              <span className="font-mono font-medium">{formatTime(elapsedTime)}</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="text-sm text-muted-foreground">
              {t('live.question')} {currentQuestion + 1} {t('live.of')} {questions.length}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPaused(!isPaused)}
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              {isPaused ? t('live.resume') : t('live.pause')}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleEndSession}
            >
              <StopCircle className="w-4 h-4" />
              {t('live.end')}
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col max-w-4xl">
        {/* Question card */}
        <div className="bg-card rounded-2xl shadow-xl border border-border p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
              <MessageSquare className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {question.type}
                </span>
                <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                  {question.difficulty}
                </span>
                <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                  Q{currentQuestion + 1}/{questions.length}
                </span>
              </div>
              <p className="text-xl font-medium leading-relaxed">{question.text}</p>
            </div>
          </div>

          {/* Repeat question button */}
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <RotateCcw className="w-4 h-4" />
            {t('live.repeat')}
          </Button>
        </div>

        {/* Recording area */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Microphone button */}
          <div className="relative mb-8">
            <button
              onClick={handleMicClick}
              className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                isRecording
                  ? 'bg-primary shadow-glow scale-110'
                  : 'bg-card border-2 border-border hover:border-primary'
              }`}
            >
              {isRecording ? (
                <MicOff className="w-12 h-12 text-primary-foreground" />
              ) : (
                <Mic className="w-12 h-12 text-primary" />
              )}
            </button>

            {/* Recording pulse animation */}
            {isRecording && (
              <>
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                <div className="absolute inset-[-8px] rounded-full border-4 border-primary/30 animate-pulse" />
              </>
            )}
          </div>

          {/* Status text */}
          <div className="text-center mb-8">
            <p className="text-lg font-medium mb-1">
              {isRecording ? t('live.listening') : t('live.speak')}
            </p>
            <p className="text-sm text-muted-foreground">
              {isRecording 
                ? 'Click to stop recording' 
                : 'Click the microphone to start speaking'}
            </p>
          </div>

          {/* Audio waveform */}
          {isRecording && (
            <div className="flex items-center justify-center gap-1 h-16 mb-8">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-primary rounded-full transition-all duration-150"
                  style={{
                    height: `${20 + Math.random() * 80}%`,
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Transcript area */}
          {transcript && (
            <div className="w-full max-w-2xl bg-muted/50 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-muted-foreground">
                  {t('live.transcript')}
                </h3>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <div className="flex gap-1">
                    {detectedLanguages.map((lang) => (
                      <span
                        key={lang}
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          lang === detectedLanguages[0]
                            ? 'bg-primary/10 text-primary'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-foreground leading-relaxed">
                "{transcript.trim()}"
              </p>
            </div>
          )}
        </div>

        {/* Bottom actions */}
        <div className="flex justify-between items-center pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4" />
            <span>Code-switching supported • Speak in any language</span>
          </div>
          
          <Button
            variant="hero"
            size="lg"
            onClick={handleNextQuestion}
            disabled={!transcript && currentQuestion > 0}
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Interview'}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default LiveInterviewPage;