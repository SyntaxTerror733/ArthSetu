import React from 'react';
import {
  Compass,
  TrendingUp,
  AlertTriangle,
  FileCheck2,
  Calculator,
  Building,
  CalendarCheck,
  ArrowRight,
  ShieldCheck,
  Target
} from 'lucide-react';
import Button from '../components/shared/Button';

/**
 * About Page
 * Clearly outlines the mission, vision, and core capabilities of ArthSetu.
 */
export default function About({ onNavigate, currentLang = 'en' }) {
  const capabilities = [
    {
      icon: TrendingUp,
      titleEn: 'Understand Local Market Opportunities',
      titleHi: 'स्थानीय बाज़ार अवसरों को समझें',
      descEn: 'Pinpoints latent village and block-level consumer demand patterns and underserved product categories.',
      descHi: 'गांव और ब्लॉक स्तर पर अव्यक्त उपभोक्ता मांग और बिना सेवा वाली उत्पाद श्रेणियों की पहचान करता है।',
    },
    {
      icon: AlertTriangle,
      titleEn: 'Identify Local Business Risks',
      titleHi: 'स्थानीय व्यापारिक जोखिमों की पहचान',
      descEn: 'Detects seasonal yield drops, power grid interruptions, and local buyer dependency before capital commitment.',
      descHi: 'पूंजी निवेश से पहले मौसमी मांग में गिरावट, बिजली व्यवधान और बिचौलियों पर निर्भरता का आकलन।',
    },
    {
      icon: Compass,
      titleEn: 'Analyze Business Feasibility',
      titleHi: 'व्यापार व्यवहार्यता का समग्र विश्लेषण',
      descEn: 'Delivers a comprehensive 2x2 SWOT matrix and competitor density mapping within 5–10 km trade radius.',
      descHi: '5-10 किमी के दायरे में 2x2 स्वॉट विश्लेषण और प्रतिस्पर्धी घनत्व मैपिंग प्रस्तुत करता है।',
    },
    {
      icon: Calculator,
      titleEn: 'Calculate Feasible Project Cost',
      titleHi: 'व्यवहार्य परियोजना लागत की गणना',
      descEn: 'Uses a verified 10% margin capital formula to determine the total viable project size an entrepreneur can sustain.',
      descHi: 'उद्यमी की स्वयं की पूंजी के आधार पर 10% मार्जिन नियम से कुल परियोजना लागत निर्धारित करता है।',
    },
    {
      icon: FileCheck2,
      titleEn: 'Calculate Maximum Loan Eligibility',
      titleHi: 'अधिकतम ऋण पात्रता का निर्धारण',
      descEn: 'Computes realistic 90% debt coverage compliant with regional commercial bank underwriting rules.',
      descHi: 'बैंक ऋण मानकों के अनुसार 90% तक की ऋण पात्रता की सटीक गणना करता है।',
    },
    {
      icon: Building,
      titleEn: 'Understand Scheme Eligibility',
      titleHi: 'सरकारी ऋण योजना पात्रता की समझ',
      descEn: 'Instantly matches projects with Micro Finance or Term Loan schemes (including PMEGP and MUDRA tiers).',
      descHi: 'माइक्रो फाइनेंस और टर्म लोन योजनाओं (PMEGP, मुद्रा) के साथ स्वतः मिलान करता है।',
    },
    {
      icon: CalendarCheck,
      titleEn: 'Plan a Financial Roadmap',
      titleHi: 'वित्तीय रोडमैप एवं ईएमआई योजना',
      descEn: 'Structures interest-free moratorium grace periods and calculates predictable monthly EMI schedules.',
      descHi: 'मोराटोरियम (छूट अवधि) और नियमित मासिक किस्त (EMI) की स्पष्ट समय-सारणी तैयार करता है।',
    },
  ];

  return (
    <div className="about-page">
      <div className="container" style={{ padding: '3.5rem 1.5rem 5rem', minHeight: '75vh' }}>
        {/* About Header */}
        <div style={{ maxWidth: '800px', margin: '0 auto 3rem', textAlign: 'center' }}>
          <span className="section-tag">
            {currentLang === 'hi' ? 'अर्थसेतु परिचय' : 'About ArthSetu'}
          </span>
          <h1 className="section-title">
            {currentLang === 'hi' ? 'उद्देश्य एवं मिशन' : 'Bridging Grassroots Ambition to Viable Enterprise'}
          </h1>
          <p className="section-subtitle" style={{ fontSize: '1.125rem' }}>
            {currentLang === 'hi'
              ? 'अर्थसेतु ग्रामीण और अर्ध-शहरी सूक्ष्म उद्यमियों के लिए एक एआई-संचालित अति-स्थानीय व्यापार सलाहकार और वित्तीय संरचना मंच है।'
              : 'ArthSetu is an AI-driven hyper-local business advisory and financial structuring platform designed specifically for rural and semi-urban micro-entrepreneurs.'}
          </p>
        </div>

        {/* Mission Card */}
        <div
          className="dashboard-card"
          style={{
            maxWidth: '860px',
            margin: '0 auto 3rem',
            padding: '2.25rem',
            background: 'linear-gradient(135deg, var(--color-white) 0%, var(--color-bg) 100%)',
            borderLeft: '5px solid var(--color-emerald)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'var(--color-emerald-soft)',
                color: 'var(--color-emerald)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-hidden="true"
            >
              <Target size={20} />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-navy)' }}>
              {currentLang === 'hi' ? 'हमारा दृष्टिकोण' : 'Our Core Focus'}
            </h2>
          </div>

          <p style={{ fontSize: '0.9375rem', color: 'var(--color-navy-subtle)', lineHeight: 1.65 }}>
            {currentLang === 'hi'
              ? 'भारत के ग्रामीण और अर्ध-शहरी क्षेत्रों में लाखों महत्वाकांक्षी उद्यमी पर्याप्त बाज़ार जानकारी और वित्तीय योजना के अभाव में असफल हो जाते हैं। अर्थसेतु स्थानीय डेटा, जिला सांख्यिकी और सरल वित्तीय मॉडलिंग को मिलाकर हर उद्यमी को व्यवसाय शुरू करने से पहले आत्मविश्वास और स्पष्टता प्रदान करता है।'
              : 'Millions of grassroots micro-entrepreneurs start businesses each year without access to structured feasibility reports or financial advisory. ArthSetu eliminates this gap by combining census intelligence, local supply chain analysis, and automated government credit routing into a clean, accessible tool.'}
          </p>
        </div>

        {/* Core Capabilities Grid */}
        <div style={{ maxWidth: '960px', margin: '0 auto 3.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-navy)', textAlign: 'center', marginBottom: '2rem' }}>
            {currentLang === 'hi'
              ? 'अर्थसेतु उद्यमियों की किस प्रकार सहायता करता है?'
              : 'How ArthSetu Helps Entrepreneurs'}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {capabilities.map((cap, idx) => {
              const CapIcon = cap.icon;
              return (
                <div key={idx} className="dashboard-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--color-emerald-soft)',
                      color: 'var(--color-emerald)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1rem',
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    <CapIcon size={18} />
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '0.5rem' }}>
                    {currentLang === 'hi' ? cap.titleHi : cap.titleEn}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-navy-muted)', lineHeight: 1.5, marginTop: 'auto' }}>
                    {currentLang === 'hi' ? cap.descHi : cap.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Card */}
        <div
          className="dashboard-card"
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            textAlign: 'center',
            padding: '2.5rem 2rem',
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-emerald)', marginBottom: '0.75rem', fontWeight: 700, fontSize: '0.875rem' }}>
            <ShieldCheck size={18} />
            <span>Smart India Hackathon Initiative</span>
          </div>
          <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '0.5rem' }}>
            {currentLang === 'hi' ? 'स्थानीय व्यापार मूल्यांकन शुरू करें' : 'Start Your Free Analysis Today'}
          </h3>
          <p style={{ fontSize: '0.9375rem', color: 'var(--color-navy-muted)', marginBottom: '1.75rem' }}>
            {currentLang === 'hi'
              ? 'मुफ्त एआई विश्लेषण के साथ अपने व्यावसायिक विचार की व्यवहार्यता की जांच करें।'
              : 'Assess local viability, calculate capital structure, and discover matched loan schemes in minutes.'}
          </p>

          <Button
            variant="primary"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => onNavigate && onNavigate('home')}
            style={{ maxWidth: '320px', margin: '0 auto' }}
          >
            {currentLang === 'hi' ? 'व्यवसाय का विश्लेषण करें' : 'Analyze My Business'}
          </Button>
        </div>
      </div>
    </div>
  );
}
