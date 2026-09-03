import React from 'react';
import { Check, TrendingUp, ShieldCheck, FileCheck, Building2, MapPin, Sparkles } from 'lucide-react';
import InputForm from '../components/InputForm/InputForm';

/**
 * Home Page: Professional landing page + business input form for ArthSetu
 */
export default function Home({ onFormSubmit, currentLang = 'en', initialData = null }) {
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
      {/* 2. HERO SECTION */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            {/* Left Column: Heading, Subtitle, Trust Points */}
            <div className="hero-content">
              <div className="hero-badge">
                <span className="badge badge-emerald">
                  <Sparkles size={14} />
                  {currentLang === 'hi'
                    ? 'स्मार्ट इंडिया हैकथॉन नवाचार'
                    : 'Smart India Hackathon Initiative'}
                </span>
              </div>

              <h1 className="hero-title">
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

              <p className="hero-subtitle">
                {currentLang === 'hi'
                  ? 'व्यवसाय शुरू करने से पहले एआई-संचालित स्थानीय बाज़ार अंतर्दृष्टि और एक व्यक्तिगत वित्तीय रोडमैप प्राप्त करें।'
                  : 'Get AI-powered local market insights and a personalized financial roadmap before starting your business.'}
              </p>

              {/* 3 Small Trust Points */}
              <ul className="trust-points-list" aria-label="Key Platform Benefits">
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
              <div className="hero-visual-card">
                <div className="hero-visual-header">
                  <div className="hero-visual-title">
                    <span className="pulse-dot" />
                    <span>Live Local Market Intelligence</span>
                  </div>
                  <span className="badge badge-teal">AI Engine Active</span>
                </div>

                <div className="hero-metric-row">
                  <div className="hero-metric-box">
                    <div className="metric-label">Local Feasibility</div>
                    <div className="metric-value text-emerald">88% High</div>
                  </div>
                  <div className="hero-metric-box">
                    <div className="metric-label">Recommended Margin</div>
                    <div className="metric-value">10% - 15%</div>
                  </div>
                </div>

                {/* Scheme Match Snippet */}
                <div className="hero-scheme-match">
                  <div className="scheme-icon-box">
                    <Building2 size={18} />
                  </div>
                  <div className="scheme-match-text">
                    <div>Govt Scheme Auto-Match</div>
                    <div className="scheme-match-name">PMEGP / MUDRA Kishore Eligible</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. & 4. & 5. MAIN BUSINESS ANALYSIS FORM + SMART PREVIEW + PRIMARY CTA */}
      <InputForm onSubmit={onFormSubmit} currentLang={currentLang} initialData={initialData} />
    </div>
  );
}
