import React from 'react';
import { ArrowRight, Lightbulb, Cpu, FileText, CheckCircle2 } from 'lucide-react';
import Button from '../components/shared/Button';

/**
 * How It Works Page
 * Dedicated page explaining the 3-step business analysis process for grassroots entrepreneurs.
 */
export default function HowItWorks({ onNavigate, currentLang = 'en' }) {
  const steps = [
    {
      number: '01',
      icon: Lightbulb,
      titleEn: 'Tell Us Your Business Idea',
      titleHi: 'अपना व्यावसायिक विचार साझा करें',
      descEn:
        'Enter your village or district, available margin capital, and the trade or enterprise you wish to start.',
      descHi:
        'अपना गांव या जिला, उपलब्ध पूंजी और वह व्यवसाय चुनें जिसे आप शुरू करना चाहते हैं।',
      highlightsEn: ['Village/Block level entry', 'Own equity (margin capital)', 'Enterprise category'],
      highlightsHi: ['गांव/ब्लॉक स्तर का चयन', 'स्वयं की पूंजी (मार्जिन)', 'व्यवसाय की श्रेणी'],
    },
    {
      number: '02',
      icon: Cpu,
      titleEn: 'AI Analyzes Local Opportunities',
      titleHi: 'एआई स्थानीय अवसरों का विश्लेषण करता है',
      descEn:
        'The AI analyzes local district data, supply chains, demand patterns, and potential market risks.',
      descHi:
        'हमारा एआई इंजन जिला डेटा, आपूर्ति श्रृंखला, मांग और स्थानीय प्रतिस्पर्धा का मूल्यांकन करता है।',
      highlightsEn: ['District census intelligence', 'Competitor density mapping', 'Local threat detection'],
      highlightsHi: ['जिला सांख्यिकी व जनसांख्यिकी', 'प्रतिस्पर्धा घनत्व मैपिंग', 'स्थानीय जोखिम पहचान'],
    },
    {
      number: '03',
      icon: FileText,
      titleEn: 'Get Your Financial Roadmap',
      titleHi: 'अपना वित्तीय रोडमैप प्राप्त करें',
      descEn:
        'Receive your feasible project cost, eligible loan amount, matched government schemes, and EMI roadmap.',
      descHi:
        'सटीक परियोजना लागत, ऋण पात्रता, उपयुक्त सरकारी योजनाएं और मासिक किस्त (EMI) की स्पष्ट योजना प्राप्त करें।',
      highlightsEn: ['10% Margin structuring', 'Auto scheme routing (Micro/Term)', 'Moratorium & EMI calculation'],
      highlightsHi: ['10% मार्जिन पूंजी संरचना', 'योजना आवंटन (माइक्रो/टर्म)', 'मोराटोरियम व ईएमआई रोडमैप'],
    },
  ];

  return (
    <div className="how-it-works-page">
      <section className="how-it-works-section" style={{ borderBottom: 'none', minHeight: '75vh', padding: '4rem 0 5rem' }}>
        <div className="container">
          {/* Section Header */}
          <div className="section-header-center">
            <span className="section-tag">
              {currentLang === 'hi' ? 'सरल 3-चरणीय प्रक्रिया' : 'Simple 3-Step Process'}
            </span>
            <h1 className="section-title">
              {currentLang === 'hi' ? 'यह कैसे काम करता है' : 'How It Works'}
            </h1>
            <p className="section-subtitle">
              {currentLang === 'hi'
                ? 'अर्थसेतु ग्रामीण और अर्ध-शहरी सूक्ष्म उद्यमियों को सशक्त बनाने के लिए स्थानीय डेटा और उन्नत एआई का उपयोग करता है।'
                : 'ArthSetu harnesses hyper-local data and advanced algorithms to simplify your path from idea to viable enterprise.'}
            </p>
          </div>

          {/* 3 Step Cards */}
          <div className="steps-grid" style={{ marginBottom: '3.5rem' }}>
            {steps.map((step) => {
              const StepIcon = step.icon;
              return (
                <div key={step.number} className="step-card">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <div className="step-number-badge">{step.number}</div>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        backgroundColor: 'var(--color-emerald-soft)',
                        color: 'var(--color-emerald)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      aria-hidden="true"
                    >
                      <StepIcon size={20} />
                    </div>
                  </div>

                  <h2 className="step-title">
                    {currentLang === 'hi' ? step.titleHi : step.titleEn}
                  </h2>

                  <p className="step-description" style={{ marginBottom: '1.25rem' }}>
                    {currentLang === 'hi' ? step.descHi : step.descEn}
                  </p>

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
                    {(currentLang === 'hi' ? step.highlightsHi : step.highlightsEn).map((h, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--color-navy-subtle)' }}>
                        <CheckCircle2 size={14} className="text-emerald" style={{ flexShrink: 0 }} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Bottom Action Card */}
          <div
            className="dashboard-card"
            style={{
              textAlign: 'center',
              maxWidth: '680px',
              margin: '0 auto',
              padding: '2.5rem 2rem',
              background: 'linear-gradient(145deg, var(--color-white) 0%, var(--color-bg) 100%)',
            }}
          >
            <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '0.5rem' }}>
              {currentLang === 'hi'
                ? 'क्या आप अपना नया व्यवसाय शुरू करने के लिए तैयार हैं?'
                : 'Ready to Validate Your Business Idea?'}
            </h3>
            <p style={{ fontSize: '0.9375rem', color: 'var(--color-navy-muted)', marginBottom: '1.75rem' }}>
              {currentLang === 'hi'
                ? 'अपने क्षेत्र का चयन करें और तुरंत व्यवहार्यता रिपोर्ट व सरकारी ऋण योजना देखें।'
                : 'Enter your village, budget, and trade category to get instant AI feasibility insights.'}
            </p>

            <Button
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => onNavigate && onNavigate('home')}
              style={{ maxWidth: '320px', margin: '0 auto' }}
            >
              {currentLang === 'hi' ? 'व्यवसाय विश्लेषण शुरू करें' : 'Start Business Analysis'}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
