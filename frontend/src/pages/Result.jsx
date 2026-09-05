import React, { useState, useEffect, useRef } from 'react';
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
  Download,
  Loader2,
  ArrowRightLeft,
} from 'lucide-react';
import FeasibilityReport from '../components/FeasibilityReport/FeasibilityReport';
import FinancialRoadmap from '../components/FinancialRoadmap/FinancialRoadmap';
import { useCalculateFinancials, useFeasibilityReport } from '../hooks/useApi';
import { exportReportToPdf } from '../lib/pdfExport';

/**
 * Result Page Component
 * Professional dashboard displaying:
 * - Top Parameter summary bar (Location, Margin Capital, Category, Description)
 * - Module 1: Business Feasibility Report (Wired to backend AI endpoint)
 * - Module 2: Financial Roadmap (Wired to backend API)
 * - Navigation actions: Back button, Start New Analysis, Print, & Client-side PDF Export
 */
export default function Result({
  submissionData,
  onBack,
  onStartNew,
  onNavigate,
  currentLang = 'en',
}) {
  const [pdfExporting, setPdfExporting] = useState(false);
  const [pdfExportError, setPdfExportError] = useState(null);
  const pdfExportRef = useRef(null);

  const {
    calculate,
    data: financialData,
    loading: financialLoading,
    error: financialError,
  } = useCalculateFinancials();

  const {
    getReport,
    data: reportData,
    loading: reportLoading,
    error: reportError,
  } = useFeasibilityReport();

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
  const districtName = (data.district || data.location || 'Ghaziabad').split(',')[0].trim();
  const categoryName = data.category || 'Retail';

  // Trigger backend financial calculation on mount or marginCapital change
  useEffect(() => {
    if (marginCap > 0) {
      calculate(marginCap).catch((err) => {
        console.error('Financial calculation API call failed:', err);
      });
    }
  }, [marginCap, calculate]);

  // Trigger backend feasibility report API call on mount or parameters change
  useEffect(() => {
    if (districtName && categoryName) {
      getReport(districtName, categoryName, currentLang).catch((err) => {
        console.error('Feasibility report API call failed:', err);
      });
    }
  }, [districtName, categoryName, currentLang, getReport]);

  const handleRetryFinancials = () => {
    if (marginCap > 0) {
      calculate(marginCap);
    }
  };

  const handleRetryReport = () => {
    if (districtName && categoryName) {
      getReport(districtName, categoryName, currentLang);
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

  const handleDownloadPdf = async () => {
    if (!pdfExportRef.current) return;
    setPdfExporting(true);
    setPdfExportError(null);

    try {
      const cleanDist = districtName.replace(/[^a-zA-Z0-9]/g, '_');
      const cleanCat = categoryName.replace(/[^a-zA-Z0-9]/g, '_');
      const filename = `VITAARA_Report_${cleanDist}_${cleanCat}.pdf`;

      await exportReportToPdf(pdfExportRef.current, filename);
    } catch (err) {
      console.error('PDF export error:', err);
      setPdfExportError(
        err.message ||
          (currentLang === 'hi'
            ? 'पीडीएफ तैयार करने में समस्या आई। कृपया थोड़ी देर बाद पुनः प्रयास करें या प्रिंट विकल्प का उपयोग करें।'
            : 'Failed to generate PDF report. Please try again or use the Print Summary button.')
      );
    } finally {
      setPdfExporting(false);
    }
  };

  return (
    <div className="container dashboard-container">
      {/* Parameter Top Header Bar */}
      <div className="dashboard-top-bar">
        {/* Navigation & Action Buttons */}
        <div className="dashboard-top-nav">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
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

            {onNavigate && (
              <button
                type="button"
                className="btn-nav-action btn-nav-new"
                onClick={() => onNavigate('compare')}
                aria-label="Compare with another business type"
              >
                <ArrowRightLeft size={16} />
                <span>{currentLang === 'hi' ? 'व्यवसाय तुलना करें' : 'Compare Business Types'}</span>
              </button>
            )}
          </div>

          {/* Export & Print Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn-nav-action btn-nav-back"
              onClick={handlePrint}
              aria-label="Print Summary"
            >
              <Printer size={16} />
              <span>{currentLang === 'hi' ? 'प्रिंट / सेव' : 'Print Summary'}</span>
            </button>

            <button
              type="button"
              className="btn-primary-cta"
              onClick={handleDownloadPdf}
              disabled={pdfExporting}
              aria-label="Download PDF Report"
              style={{
                width: 'auto',
                padding: '0 1rem',
                height: '36px',
                fontSize: '0.8125rem',
                backgroundColor: pdfExporting ? '#94A3B8' : '#059669',
                cursor: pdfExporting ? 'not-allowed' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
              }}
            >
              {pdfExporting ? (
                <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
              ) : (
                <Download size={16} />
              )}
              <span>
                {pdfExporting
                  ? currentLang === 'hi' ? 'पीडीएफ बन रहा है...' : 'Generating PDF...'
                  : currentLang === 'hi' ? 'पीडीएफ डाउनलोड करें' : 'Download PDF Report'}
              </span>
            </button>
          </div>
        </div>

        {/* PDF Export Error Banner if capture fails */}
        {pdfExportError && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#FEF2F2',
              border: '1px solid #FCA5A5',
              borderRadius: '6px',
              padding: '0.625rem 0.875rem',
              marginTop: '0.75rem',
              fontSize: '0.8125rem',
              color: '#991B1B',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{pdfExportError}</span>
            </div>
            <button
              type="button"
              onClick={() => setPdfExportError(null)}
              style={{ background: 'none', border: 'none', color: '#991B1B', cursor: 'pointer', fontWeight: 700 }}
            >
              ✕
            </button>
          </div>
        )}

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

      {/* Container for PDF Export (Captures Module 1 Feasibility Report & Module 2 Financial Roadmap) */}
      <div ref={pdfExportRef}>
        {/* MODULE 1: BUSINESS FEASIBILITY REPORT */}
        <FeasibilityReport
          location={data.location}
          category={data.category}
          capital={data.marginCapital}
          currentLang={currentLang}
          reportData={reportData}
          loading={reportLoading}
          error={reportError}
          onRetry={handleRetryReport}
        />

        {/* MODULE 2: FINANCIAL ROADMAP */}
        {financialLoading ? (
          <section className="dashboard-module" id="module-financial">
            <div className="dashboard-card" style={{ padding: '2.5rem 2rem', textAlign: 'center' }}>
              <div className="ai-pulse-spinner" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
                {currentLang === 'hi'
                  ? 'वित्तीय योजना तैयार की जा रही है...'
                  : 'Calculating Project Financials & Amortization...'}
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#64748B' }}>
                {currentLang === 'hi'
                  ? `₹${marginCap.toLocaleString('en-IN')} मार्जिन पूंजी पर ऋण पात्रता एवं किस्त अनुसूची गणना जारी है।`
                  : `Computing loan eligibility, scheme routing, and EMI schedules for ₹${marginCap.toLocaleString('en-IN')} margin capital.`}
              </p>
            </div>
          </section>
        ) : financialError ? (
          <section className="dashboard-module" id="module-financial">
            <div
              className="dashboard-card"
              style={{
                padding: '2rem',
                textAlign: 'center',
                borderLeft: '4px solid #EF4444',
              }}
            >
              <AlertCircle size={40} style={{ color: '#EF4444', margin: '0 auto 0.75rem' }} />
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
                {currentLang === 'hi'
                  ? 'वित्तीय योजना लोड करने में असमर्थ'
                  : "Couldn't calculate your financial plan right now."}
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '1.25rem' }}>
                {financialError.message ||
                  (currentLang === 'hi'
                    ? 'कृपया सर्वर कनेक्शन जांचें और पुनः प्रयास करें।'
                    : 'Please check your connection and try again.')}
              </p>
              <button
                type="button"
                className="btn-primary-cta"
                style={{ width: 'auto', padding: '0 1.25rem', height: '38px', fontSize: '0.875rem', margin: '0 auto' }}
                onClick={handleRetryFinancials}
              >
                <RefreshCw size={16} />
                <span>{currentLang === 'hi' ? 'पुनः प्रयास करें' : 'Try Again'}</span>
              </button>
            </div>
          </section>
        ) : (
          <FinancialRoadmap
            marginCapital={data.marginCapital}
            financialData={financialData}
            currentLang={currentLang}
          />
        )}
      </div>

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
              ? 'VITAARA का उपयोग असीमित संख्या में मुफ्त विश्लेषण के लिए किया जा सकता है।'
              : 'VITAARA provides unlimited hyper-local evaluations for micro-enterprises.'}
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

