import React, { useState, useEffect } from 'react';
import Layout from './components/shared/Layout';
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
import Result from './pages/Result';
import Compare from './pages/Compare';

/**
 * Helper to map URL path to internal page id
 */
const getPageFromPath = (path) => {
  const normalized = path.replace(/\/$/, '') || '/';
  if (normalized === '/how-it-works') return 'how-it-works';
  if (normalized === '/about') return 'about';
  if (normalized === '/result') return 'result';
  if (normalized === '/compare') return 'compare';
  return 'home';
};

/**
 * Helper to map internal page id to URL path
 */
const getPathFromPage = (page) => {
  switch (page) {
    case 'how-it-works':
      return '/how-it-works';
    case 'about':
      return '/about';
    case 'result':
      return '/result';
    case 'compare':
      return '/compare';
    default:
      return '/';
  }
};

/**
 * Root Application Component
 * Handles clean client-side routing between Home (/), How It Works (/how-it-works),
 * About (/about), Result (/result), and Compare (/compare), global language state, and dark/light theme state.
 */
export default function App() {
  // Routing State: Initialized from current window.location.pathname
  const [currentPage, setCurrentPage] = useState(() => {
    return getPageFromPath(window.location.pathname);
  });

  const [currentLang, setCurrentLang] = useState('en');
  const [submissionData, setSubmissionData] = useState(null);

  // Theme State: Default to Light, with localStorage restoration
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('arthsetu_theme');
      return savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : 'light';
    } catch {
      return 'light';
    }
  });

  // Synchronize theme with DOM attribute and localStorage
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('arthsetu_theme', theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  // Synchronize with browser back / forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleToggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  /**
   * Navigate to a page and update browser history URL
   */
  const handleNavigate = (pageId) => {
    const targetPath = getPathFromPage(pageId);
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = (data) => {
    setSubmissionData(data);
    handleNavigate('result');
  };

  const handleBackToHome = () => {
    handleNavigate('home');
  };

  const handleStartNew = () => {
    setSubmissionData(null);
    handleNavigate('home');
  };

  // Render the active view component
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'how-it-works':
        return (
          <HowItWorks
            onNavigate={handleNavigate}
            currentLang={currentLang}
          />
        );

      case 'about':
        return (
          <About
            onNavigate={handleNavigate}
            currentLang={currentLang}
          />
        );

      case 'compare':
        return (
          <Compare
            onNavigate={handleNavigate}
            currentLang={currentLang}
          />
        );

      case 'result':
        return (
          <Result
            submissionData={submissionData}
            onBack={handleBackToHome}
            onStartNew={handleStartNew}
            onNavigate={handleNavigate}
            currentLang={currentLang}
          />
        );

      case 'home':
      default:
        return (
          <Home
            onFormSubmit={handleFormSubmit}
            onNavigate={handleNavigate}
            currentLang={currentLang}
            initialData={submissionData}
          />
        );
    }
  };

  return (
    <Layout
      currentPage={currentPage}
      currentLang={currentLang}
      onToggleLang={(lang) => setCurrentLang(lang)}
      onNavigate={handleNavigate}
      currentTheme={theme}
      onToggleTheme={handleToggleTheme}
    >
      {renderCurrentPage()}
    </Layout>
  );
}
