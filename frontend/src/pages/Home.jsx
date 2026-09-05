import React, { useState, useEffect, useRef } from 'react';
import { Check, TrendingUp, ShieldCheck, FileCheck, Building2, MapPin, Sparkles, ChevronDown, ArrowRight } from 'lucide-react';
import { animate, splitText, stagger } from 'animejs';
import InputForm from '../components/InputForm/InputForm';

/**
 * Home Page: Professional landing page + business input form for ArthSetu
 */
export default function Home({ onFormSubmit, onNavigate, currentLang = 'en', initialData = null }) {
  const formRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadingRef = useRef(null);
  const ctaGroupRef = useRef(null);
  const trustListRef = useRef(null);
  const visualCardRef = useRef(null);
  const hasTextAnimatedRef = useRef(false);

  const [isFormVisible, setIsFormVisible] = useState(false);

  // Sequential entrance animation on component mount for hero elements
  useEffect(() => {
    if (hasTextAnimatedRef.current) return;
    hasTextAnimatedRef.current = true;

    // 1. Headline reveal (Starts t = 0ms)
    if (headlineRef.current) {
      splitText(headlineRef.current, { lines: { wrap: 'clip' } })
        .addEffect(({ lines }) => animate(lines, {
          y: ['100%', '0%'],
          duration: 750,
          ease: 'out(3)',
          delay: stagger(200),
        }));
    }

    // 2. Subheading reveal (Starts t = 450ms)
    if (subheadingRef.current) {
      splitText(subheadingRef.current, { lines: { wrap: 'clip' } })
        .addEffect(({ lines }) => animate(lines, {
          y: ['100%', '0%'],
          duration: 750,
          ease: 'out(3)',
          delay: stagger(200, { start: 450 }),
        }));
    }

    // 3. CTA Buttons reveal (Starts t = 850ms)
    if (ctaGroupRef.current) {
      animate(ctaGroupRef.current, {
        opacity: [0, 1],
        translateY: ['15px', '0px'],
        duration: 550,
        ease: 'out(3)',
        delay: 850,
      });
    }

    // 4. Checklist items staggered reveal (Starts t = 1000ms)
    if (trustListRef.current) {
      const items = trustListRef.current.querySelectorAll('.trust-point-item');
      if (items.length > 0) {
        animate(items, {
          opacity: [0, 1],
          translateY: ['15px', '0px'],
          duration: 550,
          ease: 'out(3)',
          delay: stagger(120, { start: 1000 }),
        });
      }
    }

    // 5. Intelligence panel card single-unit reveal (Starts t = 1050ms)
    if (visualCardRef.current) {
      animate(visualCardRef.current, {
        opacity: [0, 1],
        translateY: ['20px', '0px'],
        duration: 600,
        ease: 'out(3)',
        delay: 1050,
      });
    }
  }, []);

  // Intersection Observer to trigger scroll-reveal animation when form enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFormVisible(true);
          if (formRef.current) {
            observer.unobserve(formRef.current);
          }
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of form section enters viewport
      }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, []);

  const handleScrollToForm = (e) => {
    if (e) e.preventDefault();
    const formElement = document.getElementById('business-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHowItWorksClick = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('how-it-works');
    } else {
      window.location.href = '/how-it-works';
    }
  };

  // Trust points as requested in prompt
  const trustPoints = [
    {
      id: 'market-insights',
      textEn: 'Hyper-local market insights',
      textHi: 'अति-स्थानीय बाज़ार अंतर्दृष्टि (Market Insights)',
    },
    {
      id: 'financial-planning',
      textEn: 'Smart financial planning',
      textHi: 'स्मार्ट वित्तीय योजना (Financial Planning)',
    },
    {
      id: 'scheme-guidance',
      textEn: 'Scheme eligibility guidance',
      textHi: 'सरकारी ऋण योजना पात्रता मार्गदर्शन',
    },
  ];

  return (
    <div className="home-page" id="home">
      {/* 2. FULL-HEIGHT HERO SECTION WITH LOOPING BACKGROUND VIDEO */}
      <section className="hero-section">
        {/* Background Video & Dark Overlay Layer */}
        <div className="hero-video-wrapper" aria-hidden="true">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'><rect width='100%' height='100%' fill='%230F172A'/></svg>"
            className="hero-video-element"
          >
            <source src="/videos/hero-background.mp4" type="video/mp4" />
            <source src="/video/hero-background.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-overlay" />
          <div className="hero-bottom-blend-gradient" />
        </div>

        <div className="container hero-container-content">
          <div className="hero-grid">
            {/* Left Column: Heading, Subtitle, CTA Pair, Trust Points */}
            <div className="hero-content">
              <div className="hero-badge">
                <span className="badge badge-emerald">
                  <Sparkles size={14} />
                  {currentLang === 'hi'
                    ? 'स्मार्ट इंडिया हैकथॉन नवाचार'
                    : 'Smart India Hackathon Initiative'}
                </span>
              </div>

              <h1 className="hero-title" ref={headlineRef}>
                {currentLang === 'hi' ? (
                  <>
                    आत्मविश्वास के साथ अपना व्यवसाय बनाएं{' '}
                    <span className="highlight-emerald">सफलता निश्चित करें।</span>
                  </>
                ) : (
                  <>
                    Build Your Business{' '}
                    <span className="highlight-emerald">with Confidence.</span>
                  </>
                )}
              </h1>

              <p className="hero-subtitle" ref={subheadingRef}>
                {currentLang === 'hi'
                  ? 'व्यवसाय शुरू करने से पहले एआई-संचालित स्थानीय बाज़ार अंतर्दृष्टि और एक व्यक्तिगत वित्तीय रोडमैप प्राप्त करें।'
                  : 'Get AI-powered local market insights and a personalized financial roadmap before starting your business.'}
              </p>

              {/* Dual Hero CTA Buttons */}
              <div className="hero-cta-group" ref={ctaGroupRef}>
                <button
                  type="button"
                  className="btn-hero-primary"
                  onClick={handleScrollToForm}
                >
                  <span>{currentLang === 'hi' ? 'व्यवसाय का विश्लेषण करें' : 'Analyze My Business'}</span>
                  <ArrowRight size={18} />
                </button>
                <a
                  href="/how-it-works"
                  className="btn-hero-secondary"
                  onClick={handleHowItWorksClick}
                >
                  <span>{currentLang === 'hi' ? 'यह कैसे काम करता है' : 'How It Works'}</span>
                </a>
              </div>

              {/* 3 Small Trust Points */}
              <ul className="trust-points-list" ref={trustListRef} aria-label="Key Platform Benefits">
                {trustPoints.map((point) => (
                  <li key={point.id} className="trust-point-item">
                    <span className="trust-check-icon" aria-hidden="true">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    <span>{currentLang === 'hi' ? point.textHi : point.textEn}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Abstract FinTech / Local Market Visual Area */}
            <div className="hero-visual-col" aria-hidden="true">
              <div className="hero-visual-card" ref={visualCardRef}>
                <div className="hero-visual-header">
                  <div className="hero-visual-title">
                    <span className="pulse-dot" />
                    <span>
                      {currentLang === 'hi' ? 'स्थानीय बाज़ार विश्लेषण पूर्वावलोकन' : 'Sample Analysis Preview'}
                    </span>
                  </div>
                  <span className="badge badge-teal">
                    {currentLang === 'hi' ? 'उदा. गाज़ियाबाद • रिटेल' : 'Ex: Ghaziabad • Retail'}
                  </span>
                </div>

                <div className="hero-metric-row">
                  <div className="hero-metric-box">
                    <div className="metric-label">
                      {currentLang === 'hi' ? 'स्थानीय व्यवहार्यता (Feasibility)' : 'Local Feasibility'}
                    </div>
                    <div className="metric-value text-emerald">88% High</div>
                  </div>
                  <div className="hero-metric-box">
                    <div className="metric-label">
                      {currentLang === 'hi' ? 'अनुशंसित मार्जिन' : 'Recommended Margin'}
                    </div>
                    <div className="metric-value">10% - 15%</div>
                  </div>
                </div>

                {/* Scheme Match Snippet */}
                <div className="hero-scheme-match">
                  <div className="scheme-icon-box">
                    <Building2 size={18} />
                  </div>
                  <div className="scheme-match-text">
                    <div>
                      {currentLang === 'hi' ? 'सरकारी योजना स्वतः-मिलान' : 'Govt Scheme Auto-Match'}
                    </div>
                    <div className="scheme-match-name">
                      {currentLang === 'hi'
                        ? 'NSFDC माइक्रो फाइनेंस / टर्म लोन योजना पात्र'
                        : 'NSFDC Micro Finance / Term Loan Scheme Eligible'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Cue Indicator Chevron */}
        <a
          href="#business-form"
          className="hero-scroll-cue"
          onClick={handleScrollToForm}
          aria-label={currentLang === 'hi' ? 'फॉर्म पर नीचे स्क्रॉल करें' : 'Scroll down to business form'}
        >
          <span>
            {currentLang === 'hi' ? 'विश्लेषण शुरू करने के लिए नीचे स्क्रॉल करें' : 'Scroll down to analyze'}
          </span>
          <ChevronDown size={20} className="scroll-cue-icon" />
        </a>
      </section>

      {/* 3. SCROLL-REVEALED MAIN BUSINESS ANALYSIS FORM */}
      <div
        ref={formRef}
        className={`form-scroll-reveal ${isFormVisible ? 'is-revealed' : ''}`}
      >
        <InputForm onSubmit={onFormSubmit} currentLang={currentLang} initialData={initialData} />
      </div>
    </div>
  );
}
