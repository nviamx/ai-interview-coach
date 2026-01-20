import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, ArrowLeft, Mail } from 'lucide-react';
import { LanguageSelector } from '@/components/LanguageSelector';

const AuthPage: React.FC = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') !== 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  React.useEffect(() => {
    // Initialize Google Sign-In
    // @ts-ignore - google is loaded from script in index.html
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "YOUR_CLIENT_ID.apps.googleusercontent.com",
        callback: handleCredentialResponse
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-sign-in-button"),
        { theme: "outline", size: "large", width: "100%" }  // customization attributes
      );
    }
  }, []);

  const handleCredentialResponse = (response: any) => {
    // This function handles the response from Google
    console.log("Encoded JWT ID token: " + response.credential);
    // Here you would send the token to your backend or Firebase
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Firebase Auth integration will go here
    console.log('Auth submit:', { email, password, isLogin });
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to home</span>
        </Link>
        <LanguageSelector />
      </header>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo and title */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 font-semibold text-xl mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <span>AI Interview Coach</span>
            </Link>
            <h1 className="text-2xl font-bold mb-2">
              {isLogin ? t('auth.login.title') : t('auth.signup.title')}
            </h1>
            <p className="text-muted-foreground">
              {isLogin ? t('auth.login.subtitle') : t('auth.signup.subtitle')}
            </p>
          </div>

          {/* Auth card */}
          <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
            {/* Google Sign In Button Container */}
            <div id="google-sign-in-button" className="w-full mb-6 flex justify-center h-[40px]"></div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-card px-4 text-muted-foreground">{t('auth.or')}</span>
              </div>
            </div>

            {/* Email/Password form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.email')}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t('auth.password')}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                {isLogin ? t('auth.signin') : t('auth.signup')}
              </Button>
            </form>

            {/* Toggle login/signup */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              {isLogin ? t('auth.noAccount') : t('auth.hasAccount')}{' '}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary font-medium hover:underline"
              >
                {isLogin ? t('auth.signup') : t('auth.signin')}
              </button>
            </p>
          </div>

          {/* Terms */}
          <p className="text-center text-xs text-muted-foreground mt-6">
            By continuing, you agree to our{' '}
            <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;