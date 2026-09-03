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
  Share2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import FeasibilityReport from '../components/FeasibilityReport/FeasibilityReport';
import FinancialRoadmap from '../components/FinancialRoadmap/FinancialRoadmap';
import { useCalculateFinancials } from '../hooks/useApi';

/**
 * Result Page Component
 * Professional dashboard displaying:
 * - Top Parameter summary bar (Location, Margin Capital, Category, Description)
 * - Real API Loading state & Error state handling
 * - Module 1: Business Feasibility Report
 * - Module 2: Financial Roadmap (Wired to backend API)
 * - Navigation actions: Back button & Start New Analysis button
 */
export default function Result({
  submissionData,
  onBack,
  onStartNew,
  currentLang = 'en',
}) {
  const { calculate, data: financialData, loading, error } = useCalculateFinancials();

  // Default fallback data if page is accessed directly
  const data = submissionData || {
    location: 'Anand, Gujarat',
    marginCapital: 150000,
    category: 'Dairy',
    description: 'Setting up a modern village milk collection, testing, and chilling unit with cold chain delivery.',
    estimatedProjectCost: 1500000,
    submittedAt: new Date().toISOString(),
  };

  const marginCap = data.marginCapital || 150000;

  // Trigger backend financial calculation on mount or marginCapital change
  useEffect(() => {
    if (marginCap > 0) {
      calculate(marginCap).catch((err) => {
        console.error('Financial calculation API call failed:', err);
      });
    }
  }, [marginCap, calculate]);

  const handleRetry = () => {
    if (marginCap > 0) {
      calculate(marginCap);
    }
  };

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

  // 1. Real API Loading State View
  if (loading) {
    return (
      <div className="container" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="ai-loading-panel">
          <div className="ai-pulse-spinner" />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
            {currentLang === 'hi'
              ? 'एआई विश्लेषण एवं वित्तीय योजना तैयार की जा रही है...'
              : 'Calculating Project Financials & Structuring...'}
          </h2>
          <p style={{ fontSize: '0.9375rem', color: '#64748B', maxWidth: '480px', margin: '0 auto' }}>
            {currentLang === 'hi'
              ? `${data.location} के लिए ₹${marginCap.toLocaleString('en-IN')} मार्जिन पूंजी पर आधारित वित्तीय योजना संकलित की जा रही है।`
              : `Computing loan eligibility, scheme routing, and EMI schedules for ₹${marginCap.toLocaleString('en-IN')} margin capital in ${data.location}.`}
          </p>

          <div className="loading-progress-track">
            <div className="loading-progress-bar" />
          </div>

          <span style={{ fontSize: '0.8125rem', color: '#059669', fontWeight: 600 }}>
            {currentLang === 'hi'
              ? 'वित्तीय इंजन एवं पुनर्भुगतान अनुसूची गणना जारी है...'
              : 'Running Financial Engine & Repayment Amortization...'}
          </span>
        </div>
      </div>
    );
  }

  // 2. Real API Error State View
  if (error) {
    return (
      <div className="container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div
          className="dashboard-card"
          style={{
            maxWidth: '540px',
            textAlign: 'center',
            padding: '2.5rem 2rem',
            borderLeft: '4px solid #EF4444',
          }}
        >
          <AlertCircle size={48} style={{ color: '#EF4444', margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
            {currentLang === 'hi'
              ? 'वित्तीय गणना लोड करने में असमर्थ'
              : "Couldn't calculate your financial plan right now."}
          </h2>
          <p style={{ fontSize: '0.9375rem', color: '#64748B', marginBottom: '1.5rem', lineHeight: 1.5 }}>
            {error.message ||
              (currentLang === 'hi'
                ? 'कृपया सर्वर कनेक्शन जांचें और पुनः प्रयास करें।'
                : 'Please check your connection and try again.')}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              type="button"
              className="btn-nav-action btn-nav-back"
              onClick={onBack}
            >
              <ArrowLeft size={16} />
              <span>{currentLang === 'hi' ? 'फॉर्म पर वापस जाएं' : 'Back to Edit Form'}</span>
            </button>
            <button
              type="button"
              className="btn-primary-cta"
              style={{ width: 'auto', padding: '0 1.25rem', height: '40px', fontSize: '0.875rem' }}
              onClick={handleRetry}
            >
              <RefreshCw size={16} />
              <span>{currentLang === 'hi' ? 'पुनः प्रयास करें' : 'Try Again'}</span>
            </button>
          </div>
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
        financialData={financialData}
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
