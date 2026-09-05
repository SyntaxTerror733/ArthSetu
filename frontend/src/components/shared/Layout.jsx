import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Landmark,
  Home,
  HelpCircle,
  Info,
  ChevronRight,
  ShieldCheck,
  ArrowRightLeft,
} from 'lucide-react';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';

/**
 * Layout Component:
 * - Top Navbar with:
 *   - LEFT: Hamburger menu icon
 *   - CENTER: VITAARA logo & branding horizontally centered
 *   - RIGHT: Language toggle & Dark/Light theme toggle
 * - Left-side Navigation Drawer with Home, Compare, How It Works, and About links
 * - Clean minimal Footer
 */
export default function Layout({
  children,
  currentPage = 'home',
  currentLang = 'en',
  onToggleLang,
  onNavigate,
  currentTheme = 'light',
  onToggleTheme,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Track sticky scroll shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard accessibility: Close drawer on Escape & lock body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && drawerOpen) {
        setDrawerOpen(false);
      }
    };

    if (drawerOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  const handleNavItemClick = (pageId) => {
    setDrawerOpen(false);
    if (onNavigate) {
      onNavigate(pageId);
    }
  };

  const navItems = [
    {
      id: 'home',
      path: '/',
      icon: Home,
      labelEn: 'Home',
      labelHi: 'मुख्य पृष्ठ',
    },
    {
      id: 'compare',
      path: '/compare',
      icon: ArrowRightLeft,
      labelEn: 'Compare Opportunities',
      labelHi: 'व्यावसायिक तुलना',
    },
    {
      id: 'how-it-works',
      path: '/how-it-works',
      icon: HelpCircle,
      labelEn: 'How It Works',
      labelHi: 'यह कैसे काम करता है',
    },
    {
      id: 'about',
      path: '/about',
      icon: Info,
      labelEn: 'About',
      labelHi: 'हमारे बारे में',
    },
  ];

  return (
    <div className="app-layout">
      {/* 1. TOP NAVBAR */}
      <header className={`site-header ${currentPage === 'home' ? 'is-home-header' : ''} ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          {currentPage === 'home' ? (
            <div className="navbar-grid navbar-grid-home">
              {/* FAR LEFT: Brand Logo & Mobile Hamburger */}
              <div className="navbar-left navbar-left-home">
                <button
                  type="button"
                  className="hamburger-btn mobile-only-hamburger"
                  onClick={() => setDrawerOpen(true)}
                  aria-label="Open navigation menu"
                  aria-expanded={drawerOpen}
                  aria-controls="navigation-drawer"
                >
                  <span className="hamburger-box" aria-hidden="true">
                    <span className="hamburger-line" />
                    <span className="hamburger-line" />
                    <span className="hamburger-line" />
                  </span>
                </button>

                <a
                  href="/"
                  className="brand-wrapper"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavItemClick('home');
                  }}
                  aria-label="VITAARA Home"
                >
                  <div className="brand-icon" aria-hidden="true">
                    <Landmark size={26} strokeWidth={2.2} />
                  </div>
                  <div className="brand-text">
                    <span className="brand-name">
                      VITA<span>ARA</span>
                    </span>
                    <span className="brand-tagline">
                      {currentLang === 'hi'
                        ? 'एआई-संचालित व्यापार मार्गदर्शन'
                        : 'AI-powered Business Guidance'}
                    </span>
                  </div>
                </a>
              </div>

              {/* CENTER: Inline Nav Links */}
              <nav className="navbar-center-links" aria-label="Main Navigation">
                <ul className="inline-nav-list">
                  {navItems.map((item) => {
                    const isActive = currentPage === item.id;
                    return (
                      <li key={item.id}>
                        <a
                          href={item.path}
                          className={`inline-nav-link ${isActive ? 'active' : ''}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavItemClick(item.id);
                          }}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          {currentLang === 'hi' ? item.labelHi : item.labelEn}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* FAR RIGHT: Language Toggle & Theme Toggle */}
              <div className="navbar-right">
                <LanguageToggle
                  currentLang={currentLang}
                  onToggle={onToggleLang}
                />
                <ThemeToggle
                  currentTheme={currentTheme}
                  onToggle={onToggleTheme}
                />
              </div>
            </div>
          ) : (
            <div className="navbar-grid">
              {/* LEFT: Hamburger Menu Icon */}
              <div className="navbar-left">
                <button
                  type="button"
                  className="hamburger-btn"
                  onClick={() => setDrawerOpen(true)}
                  aria-label="Open navigation menu"
                  aria-expanded={drawerOpen}
                  aria-controls="navigation-drawer"
                >
                  <span className="hamburger-box" aria-hidden="true">
                    <span className="hamburger-line" />
                    <span className="hamburger-line" />
                    <span className="hamburger-line" />
                  </span>
                </button>
              </div>

              {/* CENTER: VITAARA Logo & Branding */}
              <div className="navbar-center-branding">
                <a
                  href="/"
                  className="brand-wrapper"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavItemClick('home');
                  }}
                  aria-label="VITAARA Home"
                >
                  <div className="brand-icon" aria-hidden="true">
                    <Landmark size={26} strokeWidth={2.2} />
                  </div>
                  <div className="brand-text">
                    <span className="brand-name">
                      VITA<span>ARA</span>
                    </span>
                    <span className="brand-tagline">
                      {currentLang === 'hi'
                        ? 'एआई-संचालित व्यापार मार्गदर्शन'
                        : 'AI-powered Business Guidance'}
                    </span>
                  </div>
                </a>
              </div>

              {/* RIGHT: Language Toggle & Theme Toggle */}
              <div className="navbar-right">
                <LanguageToggle
                  currentLang={currentLang}
                  onToggle={onToggleLang}
                />
                <ThemeToggle
                  currentTheme={currentTheme}
                  onToggle={onToggleTheme}
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* 2. LEFT-SIDE NAVIGATION DRAWER */}
      {/* Backdrop */}
      <div
        className={`drawer-backdrop ${drawerOpen ? 'open' : ''}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden={!drawerOpen}
      />

      {/* Drawer Panel */}
      <aside
        id="navigation-drawer"
        className={`drawer-panel ${drawerOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={currentLang === 'hi' ? 'नेविगेशन मेन्यू' : 'Navigation Menu'}
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-brand">
            <div className="brand-icon" aria-hidden="true" style={{ width: '34px', height: '34px' }}>
              <Landmark size={18} strokeWidth={2.2} />
            </div>
            <div className="brand-text">
              <span className="brand-name" style={{ fontSize: '1.2rem' }}>
                VITA<span>ARA</span>
              </span>
            </div>
          </div>

          <button
            type="button"
            className="drawer-close-btn"
            onClick={() => setDrawerOpen(false)}
            aria-label={currentLang === 'hi' ? 'मेन्यू बंद करें' : 'Close navigation menu'}
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <nav className="drawer-nav" aria-label="Sidebar Navigation">
          <ul className="drawer-nav-list">
            {navItems.map((item) => {
              const ItemIcon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.path}
                    className={`drawer-nav-link ${isActive ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavItemClick(item.id);
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <div className="drawer-nav-item-left">
                      <span className="drawer-nav-icon" aria-hidden="true">
                        <ItemIcon size={19} />
                      </span>
                      <span className="drawer-nav-text">
                        {currentLang === 'hi' ? item.labelHi : item.labelEn}
                      </span>
                    </div>
                    <ChevronRight size={16} className="drawer-nav-chevron" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Drawer Footer */}
        <div className="drawer-footer">
          <div className="drawer-footer-badge">
            <ShieldCheck size={16} className="text-emerald" />
            <span>Smart India Hackathon</span>
          </div>
          <p className="drawer-footer-text">
            {currentLang === 'hi'
              ? 'ग्रामीण और अर्ध-शहरी सूक्ष्म उद्यमियों का सशक्तिकरण।'
              : 'Empowering grassroots micro-entrepreneurs with AI.'}
          </p>
        </div>
      </aside>

      {/* Main Page Content */}
      <main id="main-content">{children}</main>

      {/* FOOTER */}
      <footer className="site-footer" id="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo">
                VITA<span>ARA</span>
              </div>
              <p className="footer-tagline">
                {currentLang === 'hi'
                  ? 'डेटा और एआई के साथ ग्रामीण और अर्ध-शहरी सूक्ष्म उद्यमियों का सशक्तिकरण।'
                  : 'Empowering grassroots entrepreneurs with data and AI.'}
              </p>
              <div className="footer-badges">
                <span className="footer-badge-item">Smart India Hackathon</span>
                <span className="footer-badge-item">GovTech & FinTech</span>
              </div>
            </div>

            <div className="footer-links-group">
              <div>
                <h4 className="footer-col-title">
                  {currentLang === 'hi' ? 'नेविगेशन' : 'Navigation'}
                </h4>
                <ul className="footer-link-list">
                  <li>
                    <a
                      href="/"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavItemClick('home');
                      }}
                    >
                      {currentLang === 'hi' ? 'मुख्य पृष्ठ (Home)' : 'Home'}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/how-it-works"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavItemClick('how-it-works');
                      }}
                    >
                      {currentLang === 'hi' ? 'यह कैसे काम करता है' : 'How It Works'}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/about"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavItemClick('about');
                      }}
                    >
                      {currentLang === 'hi' ? 'हमारे बारे में' : 'About'}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="footer-col-title">
                  {currentLang === 'hi' ? 'सहयोग एवं संपर्क' : 'Support'}
                </h4>
                <ul className="footer-link-list">
                  <li>
                    <a
                      href="/about"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavItemClick('about');
                      }}
                    >
                      {currentLang === 'hi' ? 'मार्गदर्शन' : 'Guidelines'}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/about"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavItemClick('about');
                      }}
                    >
                      {currentLang === 'hi' ? 'सुरक्षा एवं गोपनीयता' : 'Privacy & Trust'}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              © {new Date().getFullYear()} VITAARA. Smart India Hackathon Initiative.
            </p>
            <p className="text-muted">
              {currentLang === 'hi'
                ? 'स्थानीय आर्थिक सशक्तिकरण हेतु समर्पित'
                : 'Designed for rural & semi-urban economic empowerment'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
