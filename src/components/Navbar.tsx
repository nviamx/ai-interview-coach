import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { Button } from '@/components/ui/button';
import { Menu, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  isAuthenticated?: boolean;
  userType?: 'candidate' | 'coach';
}

export const Navbar: React.FC<NavbarProps> = ({ isAuthenticated = false, userType = 'candidate' }) => {
  const { t, direction } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const publicLinks = [
    { href: '#how-it-works', label: t('nav.howItWorks') },
    { href: '#candidates', label: t('nav.forCandidates') },
    { href: '#coaches', label: t('nav.forCoaches') },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only handle anchor links on the home page
    if (href.startsWith('#') && location.pathname === '/') {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setMobileMenuOpen(false);
      }
    }
  };

  const candidateLinks = [
    { href: '/dashboard', label: t('nav.dashboard') },
    { href: '/sessions', label: t('nav.sessions') },
    { href: '/reports', label: t('nav.reports') },
  ];

  const coachLinks = [
    { href: '/coach/dashboard', label: t('nav.dashboard') },
    { href: '/coach/scenarios', label: t('nav.scenarios') },
    { href: '/coach/candidates', label: t('nav.candidates') },
    { href: '/coach/analytics', label: t('nav.analytics') },
  ];

  const links = isAuthenticated
    ? (userType === 'coach' ? coachLinks : candidateLinks)
    : publicLinks;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="hidden sm:inline">AI Interview Coach</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const isHashLink = link.href.startsWith('#');
              const isActive = isHashLink
                ? location.hash === link.href
                : location.pathname === link.href;

              if (isHashLink) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    )}
                  >
                    {link.label}
                  </a>
                );
              }

              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <LanguageSelector />

            {!isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link to="/auth">{t('nav.login')}</Link>
                </Button>
                <Button variant="hero" asChild>
                  <Link to="/auth?mode=signup">{t('nav.getStarted')}</Link>
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="sm" asChild>
                <Link to="/profile">{t('nav.profile')}</Link>
              </Button>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in-up">
            <div className="flex flex-col gap-2">
              {links.map((link) => {
                const isHashLink = link.href.startsWith('#');
                const isActive = isHashLink
                  ? location.hash === link.href
                  : location.pathname === link.href;

                if (isHashLink) {
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={cn(
                        "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                      )}
                    >
                      {link.label}
                    </a>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              {!isAuthenticated && (
                <div className="flex flex-col gap-2 pt-4 border-t border-border/50 mt-2">
                  <Button variant="outline" asChild className="justify-center">
                    <Link to="/auth">{t('nav.login')}</Link>
                  </Button>
                  <Button variant="hero" asChild className="justify-center">
                    <Link to="/auth?mode=signup">{t('nav.getStarted')}</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
