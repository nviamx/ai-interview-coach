# AI Interview Coach

> An intelligent interview preparation platform powered by AI that helps job candidates practice interviews with personalized questions, real-time voice interaction, and comprehensive feedback analysis.

## Overview

AI Interview Coach is a multilingual web application designed to help job seekers prepare for interviews through AI-powered practice sessions. The platform generates personalized interview questions based on uploaded CVs and job descriptions, conducts voice-based interview simulations, and provides detailed performance feedback with actionable insights.

### Key Highlights

- **AI-Powered Question Generation** - Tailored questions based on your CV and target role
- **Voice-Based Interviews** - Natural conversation flow with speech recognition
- **Multilingual Support** - Practice in English, Hebrew, or Arabic with code-switching detection
- **Comprehensive Analytics** - Detailed scoring across multiple performance dimensions
- **Coach Dashboard** - Tools for career coaches and institutions to manage candidates
- **Progress Tracking** - Monitor improvement over time with historical data

##  Features

### For Candidates

#### 1. **CV & Job Description Upload**
Upload your resume and target job description to receive personalized interview questions that match your experience and the role requirements.

#### 2. **AI-Generated Interview Questions**
The platform analyzes your profile and generates relevant questions across multiple categories:
- Behavioral questions (STAR method scenarios)
- Technical questions (role-specific)
- Situational questions
- Closing questions

#### 3. **Live Voice Interview Sessions**
Practice with realistic voice-based interviews featuring:
- Real-time speech-to-text transcription
- Automatic language detection
- Code-switching support (mix languages naturally)
- Visual feedback during recording
- Question repetition option

#### 4. **Detailed Performance Reports**
After each session, receive comprehensive feedback including:
- **Overall Score** - Aggregate performance rating
- **Content Relevance** (0-100%) - How well answers address the questions
- **Communication Skills** (0-100%) - Clarity and articulation
- **Technical Accuracy** (0-100%) - Correctness of technical responses
- **Confidence Level** (0-100%) - Tone and delivery assessment
- **Structured Thinking** (0-100%) - Organization and coherence

#### 5. **Suggested Improved Answers**
For questions where improvement is needed, the AI provides example answers demonstrating best practices.

#### 6. **Progress Dashboard**
Track your interview preparation journey with:
- Session history
- Performance trends over time
- Average scores across dimensions
- Quick action buttons for new sessions

### For Coaches & Institutions

#### 1. **Custom Interview Scenarios**
Create tailored interview templates for specific:
- Job roles
- Industries
- Experience levels
- Languages

#### 2. **Candidate Management**
- Invite and track multiple candidates
- Monitor individual progress
- View session reports
- Identify top performers

#### 3. **Analytics Dashboard**
- Real-time performance metrics
- Candidate comparison views
- Session completion rates
- Improvement trends

##  Technology Stack

### Frontend
- **React 18.3** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool and dev server
- **React Router 6** - Client-side routing and navigation

### UI/Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality accessible components built on Radix UI
- **Custom Design System** - Professional B2B SaaS aesthetic with calm teal/blue palette
- **Inter Font** - Modern, readable typography

### State Management
- **TanStack Query (React Query)** - Server state management and caching
- **React Context API** - Global state for language/i18n

### Testing
- **Vitest** - Fast unit testing framework
- **Testing Library** - Component testing utilities
- **jsdom** - DOM simulation for tests

##  Getting Started

### Prerequisites

- **Node.js** 16.x or higher
- **npm** 7.x or higher

Install Node.js using [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) (recommended):

```bash
nvm install 16
nvm use 16
```

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/nviamx/ai-interview-coach
cd ai-interview-coach
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

The application will be available at `http://localhost:8080/`

### Environment Setup

The application currently runs with mock data for demonstration purposes. To connect to a backend API:

1. Create a `.env` file in the root directory
2. Add your API endpoints:

```env
VITE_API_URL=https://your-api-endpoint.com
VITE_SPEECH_API_KEY=your-speech-recognition-key
```

##  Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build optimized production bundle |
| `npm run build:dev` | Build with development mode settings |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |
| `npm test` | Run test suite once |
| `npm run test:watch` | Run tests in watch mode |

##  Project Structure

```
interview-pro-main/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── landing/      # Landing page sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── HowItWorksSection.tsx
│   │   │   ├── ForCandidatesSection.tsx
│   │   │   ├── ForCoachesSection.tsx
│   │   │   ├── SocialProofSection.tsx
│   │   │   └── CTASection.tsx
│   │   ├── ui/           # shadcn/ui components (49 components)
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── LanguageSelector.tsx
│   ├── contexts/         # React contexts
│   │   └── LanguageContext.tsx  # i18n with EN/HE/AR
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── pages/            # Main application pages
│   │   ├── Index.tsx              # Landing page
│   │   ├── AuthPage.tsx           # Login/Signup
│   │   ├── CandidateDashboard.tsx # Candidate home
│   │   ├── CoachDashboard.tsx     # Coach home
│   │   ├── UploadPage.tsx         # CV/JD upload
│   │   ├── StartInterviewPage.tsx # Interview config
│   │   ├── LiveInterviewPage.tsx  # Active interview
│   │   └── FeedbackReportPage.tsx # Results & feedback
│   ├── test/             # Test files
│   ├── App.tsx           # Root component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles & design system
├── index.html            # HTML template
├── package.json          # Dependencies & scripts
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

##  Internationalization (i18n)

The application supports three languages with full RTL (right-to-left) support:

- **English (EN)** - Default, LTR
- **Hebrew (HE)** - RTL layout
- **Arabic (AR)** - RTL layout

### Features:
- Automatic direction switching
- Comprehensive translations for all UI elements
- Language selector in navigation
- Persistent language preference (localStorage)
- Code-switching detection during interviews

##  Design System

### Color Palette

- **Primary**: Calm teal-blue (`hsl(199, 89%, 48%)`) - Trust and professionalism
- **Secondary**: Soft violet (`hsl(250, 60%, 60%)`) - Accent color
- **Success**: Green - Positive feedback
- **Warning**: Orange - Areas for improvement
- **Destructive**: Red - Critical issues

### Design Principles

- **Professional B2B SaaS aesthetic** - Clean, trustworthy, modern
- **Accessibility-first** - WCAG compliant components
- **Responsive design** - Mobile, tablet, and desktop optimized
- **Dark mode support** - Full theme switching capability
- **Smooth animations** - Micro-interactions for better UX

##  Testing

Run the test suite:

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch
```

##  Building for Production

Create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist/` directory. These can be deployed to any static hosting service:

- **Vercel** - Zero-config deployment
- **Netlify** - Continuous deployment from Git
- **AWS S3 + CloudFront** - Scalable static hosting
- **GitHub Pages** - Free hosting for public repos

### Preview Production Build

```bash
npm run preview
```

##  Future Enhancements

### Planned Features
- [x] fix the github account issue
- [ ] Backend API integration for user authentication
- [ ] Real speech recognition using Web Speech API or cloud services
- [ ] AI integration for dynamic question generation (OpenAI/Anthropic)
- [ ] Interview recording playback
- [ ] implement language translations in hebrew and arabic
- [ ] connect google auth and firebase
