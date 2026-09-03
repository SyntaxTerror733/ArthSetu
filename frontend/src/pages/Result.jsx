import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  RotateCcw,
  MapPin,
  Tag,
  IndianRupee,
  FileText,
  Printer,
  Sparkles,
  CheckCircle2,
  Share2
} from 'lucide-react';
import FeasibilityReport from '../components/FeasibilityReport/FeasibilityReport';
import FinancialRoadmap from '../components/FinancialRoadmap/FinancialRoadmap';

/**
 * Result Page Component
 * Professional dashboard displaying:
 * - Top Parameter summary bar (Location, Margin Capital, Category, Description)
 * - AI Loading state
 * - Module 1: Business Feasibility Report
 * - Module 2: Financial Roadmap
 * - Navigation actions: Back button & Start New Analysis button
 */
export default function Result({
  submissionData,
  onBack,
  onStartNew,
  currentLang = 'en',
}) {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'feasibility' | 'financial'

  // Default fallback data if page is accessed directly
  const data = submissionData || {
    location: 'Anand, Gujarat',
    marginCapital: 150000,
    category: 'Dairy',
    description: 'Setting up a modern village milk collection, testing, and chilling unit with cold chain delivery.',
    estimatedProjectCost: 1500000,
    submittedAt: new Date().toISOString(),
  };

  // Simulate AI computation and scheme synthesis
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1100);
    return () => clearTimeout(timer);
  }, []);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  const handlePrint = () => {
    window.print();
  };

  // 1. AI Loading State View
  if (loading) {
    return (
      <div className="container" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="ai-loading-panel">
          <div className="ai-pulse-spinner" />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
            {currentLang === 'hi'
              ? 'एआई विश्लेषण तैयार किया जा रहा है...'
              : 'Synthesizing Hyper-Local Advisory...'}
          </h2>
          <p style={{ fontSize: '0.9375rem', color: '#64748B', maxWidth: '480px', margin: '0 auto' }}>
            {currentLang === 'hi'
              ? `${data.location} के जिला सांख्यिकी डेटा, आपूर्ति श्रृंखला और ऋण योजनाओं का मूल्यांकन किया जा रहा है।`
              : `Evaluating district census, local competition, and central/state credit schemes for ${data.location}.`}
          </p>

          <div className="loading-progress-track">
            <div className="loading-progress-bar" />
          </div>

          <span style={{ fontSize: '0.8125rem', color: '#059669', fontWeight: 600 }}>
            {currentLang === 'hi'
              ? 'व्यवहार्यता रिपोर्ट और वित्तीय रोडमैप संकलित हो रहा है...'
              : 'Compiling Feasibility Matrix & Financial Flow...'}
          </span>
        </div>
      </div>
    );
  }

  // 2. Full Dashboard View
  return (
    <div className="container dashboard-container">
      {/* Parameter Top Header Bar */}
      <div className="dashboard-top-bar">
        {/* Navigation & Action Buttons */}
        <div className="dashboard-top-nav">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              type="button"
              className="btn-nav-action btn-nav-back"
              onClick={onBack}
              aria-label="Back to Business Form"
            >
              <ArrowLeft size={16} />
              <span>{currentLang === 'hi' ? 'फॉर्म पर वापस जाएं' : 'Back to Edit Form'}</span>
            </button>

            <button
              type="button"
              className="btn-nav-action btn-nav-new"
              onClick={onStartNew || onBack}
              aria-label="Start New Analysis"
            >
              <RotateCcw size={16} />
              <span>{currentLang === 'hi' ? 'नया विश्लेषण शुरू करें' : 'Start New Analysis'}</span>
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              type="button"
              className="btn-nav-action btn-nav-back"
              onClick={handlePrint}
              aria-label="Print or Download PDF"
            >
              <Printer size={16} />
              <span>{currentLang === 'hi' ? 'प्रिंट / सेव' : 'Print Summary'}</span>
            </button>
          </div>
        </div>

        {/* Parameter Summary Chips */}
        <div className="dashboard-parameters-summary">
          <div className="param-chips-group">
            {/* Location */}
            <div className="param-chip">
              <MapPin size={16} className="param-chip-icon" />
              <span>{data.location}</span>
            </div>

            {/* Category */}
            <div className="param-chip">
              <Tag size={16} className="param-chip-icon" />
              <span>{data.category}</span>
            </div>

            {/* Available Capital */}
            <div className="param-chip">
              <IndianRupee size={16} className="param-chip-icon" />
              <span>
                {currentLang === 'hi' ? 'पूंजी:' : 'Capital:'}{' '}
                <strong style={{ color: '#059669' }}>{formatCurrency(data.marginCapital)}</strong>
              </span>
            </div>
          </div>

          {/* Feasibility Score Badge */}
          <div className="feasibility-score-badge">
            <Sparkles size={18} />
            <span>
              {currentLang === 'hi' ? 'व्यवहार्यता स्कोर: 86% उच्च' : 'Feasibility: 86% High'}
            </span>
          </div>
        </div>

        {/* Business Description Banner (if provided) */}
        {data.description && (
          <div
            style={{
              backgroundColor: 'var(--color-bg)',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              border: '1px solid var(--color-border)',
              fontSize: '0.875rem',
              color: 'var(--color-navy-subtle)',
            }}
          >
            <strong style={{ color: 'var(--color-navy)', marginRight: '0.5rem' }}>
              {currentLang === 'hi' ? 'प्रस्तावित विचार:' : 'Proposed Idea:'}
            </strong>
            {data.description}
          </div>
        )}
      </div>

      {/* MODULE 1: BUSINESS FEASIBILITY REPORT */}
      <FeasibilityReport
        location={data.location}
        category={data.category}
        capital={data.marginCapital}
        currentLang={currentLang}
      />

      {/* MODULE 2: FINANCIAL ROADMAP */}
      <FinancialRoadmap
        marginCapital={data.marginCapital}
        currentLang={currentLang}
      />

      {/* Bottom Sticky Action Footer */}
      <div
        className="dashboard-card"
        style={{
          marginTop: '3rem',
          padding: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-navy)' }}>
            {currentLang === 'hi'
              ? 'क्या आप किसी अन्य व्यवसाय का विश्लेषण करना चाहते हैं?'
              : 'Ready to analyze another local business opportunity?'}
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-navy-muted)' }}>
            {currentLang === 'hi'
              ? 'अर्थसेतु का उपयोग असीमित संख्या में मुफ्त विश्लेषण के लिए किया जा सकता है।'
              : 'ArthSetu provides unlimited hyper-local evaluations for micro-enterprises.'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn-nav-action btn-nav-back"
            onClick={onBack}
          >
            <ArrowLeft size={16} />
            <span>{currentLang === 'hi' ? 'फॉर्म संपादित करें' : 'Edit Current Form'}</span>
          </button>

          <button
            type="button"
            className="btn-primary-cta"
            style={{ width: 'auto', padding: '0 1.5rem', height: '44px', fontSize: '0.9375rem' }}
            onClick={onStartNew || onBack}
          >
            <RotateCcw size={16} />
            <span>{currentLang === 'hi' ? 'नया व्यवसाय जांचें' : 'Start New Analysis'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
