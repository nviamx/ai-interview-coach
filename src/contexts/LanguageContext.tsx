import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'he' | 'ar';
type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.product': 'Product',
    'nav.howItWorks': 'How it works',
    'nav.forCandidates': 'For Candidates',
    'nav.forCoaches': 'For Coaches',
    'nav.login': 'Log in',
    'nav.getStarted': 'Get started',
    'nav.dashboard': 'Dashboard',
    'nav.sessions': 'Sessions',
    'nav.reports': 'Reports',
    'nav.profile': 'Profile',
    'nav.scenarios': 'Scenarios',
    'nav.candidates': 'Candidates',
    'nav.analytics': 'Analytics',
    'nav.settings': 'Settings',
    'nav.logout': 'Log out',
    
    // Hero
    'hero.title': 'Practice real job interviews with an AI coach',
    'hero.subtitle': 'Get personalized interview questions based on your CV and target role. Practice in your language with realistic voice-based sessions and receive detailed feedback.',
    'hero.cta.primary': 'Start practicing',
    'hero.cta.secondary': 'For coaches & institutions',
    'hero.badge': 'AI-Powered Interview Preparation',
    
    // Features
    'features.title': 'How it works',
    'features.step1.title': 'Upload your CV & job description',
    'features.step1.desc': 'Share your resume and the role you\'re targeting for personalized questions.',
    'features.step2.title': 'AI generates tailored questions',
    'features.step2.desc': 'Our AI analyzes your profile to create relevant interview scenarios.',
    'features.step3.title': 'Practice with voice interviews',
    'features.step3.desc': 'Speak your answers naturally. We support English, Hebrew, and Arabic.',
    'features.step4.title': 'Get detailed feedback',
    'features.step4.desc': 'Receive comprehensive analysis with suggested improved answers.',
    
    // For Candidates
    'candidates.title': 'For Candidates',
    'candidates.subtitle': 'Build confidence with realistic practice',
    'candidates.benefit1': 'Personalized questions from your actual CV',
    'candidates.benefit2': 'Multilingual support with code-switching',
    'candidates.benefit3': 'Detailed feedback after each session',
    'candidates.benefit4': 'Track your improvement over time',
    
    // For Coaches
    'coaches.title': 'For Coaches & Institutions',
    'coaches.subtitle': 'Scale your training programs',
    'coaches.benefit1': 'Create custom interview scenarios',
    'coaches.benefit2': 'Track candidate progress in real-time',
    'coaches.benefit3': 'Review detailed session reports',
    'coaches.benefit4': 'Scalable training for any group size',
    
    // Auth
    'auth.login.title': 'Welcome back',
    'auth.login.subtitle': 'Sign in to continue your interview practice',
    'auth.signup.title': 'Create your account',
    'auth.signup.subtitle': 'Start practicing interviews with AI today',
    'auth.google': 'Continue with Google',
    'auth.email': 'Email address',
    'auth.password': 'Password',
    'auth.signin': 'Sign in',
    'auth.signup': 'Sign up',
    'auth.noAccount': 'Don\'t have an account?',
    'auth.hasAccount': 'Already have an account?',
    'auth.or': 'or',
    
    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.uploadCv': 'Upload CV & Job Description',
    'dashboard.startInterview': 'Start a New Interview',
    'dashboard.viewReports': 'View Past Sessions',
    'dashboard.lastSession': 'Last Session',
    'dashboard.noSessions': 'No sessions yet',
    
    // Upload
    'upload.title': 'Upload Your Documents',
    'upload.cv.title': 'Upload CV',
    'upload.cv.desc': 'Drag and drop or click to upload',
    'upload.cv.formats': 'PDF, DOCX up to 5MB',
    'upload.jd.title': 'Job Description',
    'upload.jd.placeholder': 'Paste the job description here...',
    'upload.jd.optional': 'Optional fields',
    'upload.jobTitle': 'Job Title',
    'upload.company': 'Company',
    'upload.industry': 'Industry',
    'upload.experience': 'Experience Level',
    'upload.continue': 'Save and continue',
    
    // Interview
    'interview.config.title': 'Configure Your Interview',
    'interview.selectCv': 'Select CV',
    'interview.selectJd': 'Select Job Description',
    'interview.type': 'Interview Type',
    'interview.type.behavioral': 'Behavioral',
    'interview.type.technical': 'Technical',
    'interview.type.mixed': 'Mixed',
    'interview.language': 'Language',
    'interview.scenario': 'Scenario',
    'interview.questions': 'questions',
    'interview.duration': 'Estimated duration',
    'interview.start': 'Start interview',
    'interview.micRequired': 'Microphone access required',
    
    // Live Interview
    'live.listening': 'Listening...',
    'live.processing': 'Processing...',
    'live.speak': 'Click to speak',
    'live.pause': 'Pause',
    'live.resume': 'Resume',
    'live.repeat': 'Repeat question',
    'live.end': 'End session',
    'live.question': 'Question',
    'live.of': 'of',
    'live.transcript': 'Your answer',
    'live.languages': 'Detected languages',
    
    // Feedback
    'feedback.title': 'Interview Report',
    'feedback.overall': 'Overall Score',
    'feedback.content': 'Content Relevance',
    'feedback.communication': 'Communication',
    'feedback.technical': 'Technical Accuracy',
    'feedback.confidence': 'Confidence',
    'feedback.structure': 'Structured Thinking',
    'feedback.strengths': 'Strengths',
    'feedback.improvements': 'Areas for Improvement',
    'feedback.suggested': 'Suggested Improved Answer',
    'feedback.download': 'Download PDF Report',
    'feedback.practiceAgain': 'Practice Again',
    
    // Coach
    'coach.dashboard.title': 'Coach Dashboard',
    'coach.activeCandidates': 'Active Candidates',
    'coach.scenarios': 'Interview Scenarios',
    'coach.recentSessions': 'Recent Sessions',
    'coach.createScenario': 'Create New Scenario',
    'coach.scenario.name': 'Scenario Name',
    'coach.scenario.description': 'Description',
    'coach.scenario.targetRole': 'Target Role',
    'coach.scenario.industry': 'Industry',
    'coach.scenario.experience': 'Experience Level',
    'coach.scenario.language': 'Language',
    'coach.scenario.questions': 'Number of Questions',
    'coach.scenario.duration': 'Estimated Duration',
    'coach.scenario.public': 'Make Public',
    'coach.scenario.save': 'Save Scenario',
    'coach.candidates.title': 'Manage Candidates',
    'coach.candidates.invite': 'Invite Candidate',
    'coach.candidates.status': 'Status',
    'coach.candidates.lastSession': 'Last Session',
    'coach.candidates.completed': 'Completed',
    
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.minutes': 'minutes',
  },
  he: {
    // Navigation
    'nav.product': 'מוצר',
    'nav.howItWorks': 'איך זה עובד',
    'nav.forCandidates': 'למועמדים',
    'nav.forCoaches': 'למאמנים',
    'nav.login': 'התחברות',
    'nav.getStarted': 'התחל עכשיו',
    'nav.dashboard': 'לוח בקרה',
    'nav.sessions': 'פגישות',
    'nav.reports': 'דוחות',
    'nav.profile': 'פרופיל',
    'nav.scenarios': 'תרחישים',
    'nav.candidates': 'מועמדים',
    'nav.analytics': 'ניתוחים',
    'nav.settings': 'הגדרות',
    'nav.logout': 'התנתקות',
    
    // Hero
    'hero.title': 'תרגול ראיונות עבודה עם מאמן AI',
    'hero.subtitle': 'קבל שאלות ראיון מותאמות אישית לקורות החיים שלך ולתפקיד המבוקש. תרגל בשפה שלך עם סשנים קוליים ריאליסטיים וקבל משוב מפורט.',
    'hero.cta.primary': 'התחל לתרגל',
    'hero.cta.secondary': 'למאמנים ומוסדות',
    'hero.badge': 'הכנה לראיונות מבוססת AI',
    
    // Features
    'features.title': 'איך זה עובד',
    'features.step1.title': 'העלה קורות חיים ותיאור משרה',
    'features.step1.desc': 'שתף את קורות החיים שלך ואת התפקיד אליו אתה שואף לשאלות מותאמות.',
    'features.step2.title': 'AI יוצר שאלות מותאמות',
    'features.step2.desc': 'ה-AI שלנו מנתח את הפרופיל שלך כדי ליצור תרחישי ראיון רלוונטיים.',
    'features.step3.title': 'תרגל עם ראיונות קוליים',
    'features.step3.desc': 'דבר את התשובות שלך בטבעיות. אנחנו תומכים באנגלית, עברית וערבית.',
    'features.step4.title': 'קבל משוב מפורט',
    'features.step4.desc': 'קבל ניתוח מקיף עם הצעות לתשובות משופרות.',
    
    // Auth
    'auth.login.title': 'ברוך שובך',
    'auth.login.subtitle': 'התחבר כדי להמשיך לתרגל ראיונות',
    'auth.signup.title': 'צור חשבון',
    'auth.signup.subtitle': 'התחל לתרגל ראיונות עם AI היום',
    'auth.google': 'המשך עם Google',
    'auth.email': 'כתובת אימייל',
    'auth.password': 'סיסמה',
    'auth.signin': 'התחבר',
    'auth.signup': 'הירשם',
    'auth.noAccount': 'אין לך חשבון?',
    'auth.hasAccount': 'כבר יש לך חשבון?',
    'auth.or': 'או',
    
    // Common
    'common.loading': 'טוען...',
    'common.save': 'שמור',
    'common.cancel': 'ביטול',
    'common.minutes': 'דקות',
  },
  ar: {
    // Navigation
    'nav.product': 'المنتج',
    'nav.howItWorks': 'كيف يعمل',
    'nav.forCandidates': 'للمرشحين',
    'nav.forCoaches': 'للمدربين',
    'nav.login': 'تسجيل الدخول',
    'nav.getStarted': 'ابدأ الآن',
    'nav.dashboard': 'لوحة التحكم',
    'nav.sessions': 'الجلسات',
    'nav.reports': 'التقارير',
    'nav.profile': 'الملف الشخصي',
    'nav.scenarios': 'السيناريوهات',
    'nav.candidates': 'المرشحين',
    'nav.analytics': 'التحليلات',
    'nav.settings': 'الإعدادات',
    'nav.logout': 'تسجيل الخروج',
    
    // Hero
    'hero.title': 'تدرب على مقابلات العمل مع مدرب AI',
    'hero.subtitle': 'احصل على أسئلة مقابلة مخصصة بناءً على سيرتك الذاتية والدور المستهدف. تدرب بلغتك مع جلسات صوتية واقعية واحصل على ملاحظات مفصلة.',
    'hero.cta.primary': 'ابدأ التدريب',
    'hero.cta.secondary': 'للمدربين والمؤسسات',
    'hero.badge': 'إعداد المقابلات بالذكاء الاصطناعي',
    
    // Features
    'features.title': 'كيف يعمل',
    'features.step1.title': 'حمّل سيرتك الذاتية ووصف الوظيفة',
    'features.step1.desc': 'شارك سيرتك الذاتية والدور المستهدف للحصول على أسئلة مخصصة.',
    'features.step2.title': 'AI يُنشئ أسئلة مخصصة',
    'features.step2.desc': 'يحلل الذكاء الاصطناعي ملفك لإنشاء سيناريوهات مقابلة ذات صلة.',
    'features.step3.title': 'تدرب مع مقابلات صوتية',
    'features.step3.desc': 'تحدث بإجاباتك بشكل طبيعي. نحن ندعم الإنجليزية والعبرية والعربية.',
    'features.step4.title': 'احصل على ملاحظات مفصلة',
    'features.step4.desc': 'احصل على تحليل شامل مع اقتراحات لإجابات محسنة.',
    
    // Auth
    'auth.login.title': 'مرحباً بعودتك',
    'auth.login.subtitle': 'سجّل الدخول لمتابعة تدريب المقابلات',
    'auth.signup.title': 'أنشئ حسابك',
    'auth.signup.subtitle': 'ابدأ تدريب المقابلات مع AI اليوم',
    'auth.google': 'المتابعة مع Google',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.signin': 'تسجيل الدخول',
    'auth.signup': 'التسجيل',
    'auth.noAccount': 'ليس لديك حساب؟',
    'auth.hasAccount': 'لديك حساب بالفعل؟',
    'auth.or': 'أو',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.minutes': 'دقائق',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  const direction: Direction = language === 'en' ? 'ltr' : 'rtl';

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [language, direction]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('preferred-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  useEffect(() => {
    const saved = localStorage.getItem('preferred-language') as Language | null;
    if (saved && ['en', 'he', 'ar'].includes(saved)) {
      setLanguageState(saved);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
