import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRightLeft,
  Sparkles,
  Award,
  CheckCircle2,
  AlertTriangle,
  Compass,
  Loader2,
  AlertCircle,
  RefreshCw,
  ArrowRight,
  TrendingUp,
  Download,
} from 'lucide-react';
import FeasibilityReport from '../components/FeasibilityReport/FeasibilityReport';
import { getFeasibilityReport, getComparisonVerdict } from '../lib/api';
import { exportReportToPdf } from '../lib/pdfExport';
import { DISTRICT_CATEGORIES } from '../lib/districtCategories';

export default function Compare({ onNavigate, currentLang = 'en' }) {
  const [district, setDistrict] = useState('Ghaziabad');
  const [categoryA, setCategoryA] = useState('Retail');
  const [categoryB, setCategoryB] = useState('Dairy');

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [error, setError] = useState(null);

  const [reportA, setReportA] = useState(null);
  const [reportB, setReportB] = useState(null);
  const [verdict, setVerdict] = useState(null);

  const [pdfExporting, setPdfExporting] = useState(false);
  const [pdfExportError, setPdfExportError] = useState(null);
  const pdfRef = useRef(null);

  // Synchronize category options when district changes
  const availableCategories = DISTRICT_CATEGORIES[district] || ['Retail', 'Dairy'];

  useEffect(() => {
    if (!availableCategories.includes(categoryA)) {
      setCategoryA(availableCategories[0] || 'Retail');
    }
    if (!availableCategories.includes(categoryB)) {
      setCategoryB(availableCategories[1] || availableCategories[0] || 'Dairy');
    }
  }, [district, availableCategories, categoryA, categoryB]);

  const handleCompareSubmit = async (e) => {
    if (e) e.preventDefault();

    if (categoryA === categoryB) {
      setError(
        currentLang === 'hi'
          ? 'कृपया तुलना के लिए दो अलग-अलग व्यवसाय श्रेणियों का चयन करें।'
          : 'Please select two different business categories for comparison.'
      );
      return;
    }

    setLoading(true);
    setError(null);
    setReportA(null);
    setReportB(null);
    setVerdict(null);

    try {
      // Step 1: Fetch Feasibility Report for Category A
      setLoadingStep(
        currentLang === 'hi'
          ? `${district} में ${categoryA} का विश्लेषण किया जा रहा है...`
          : `Analyzing ${categoryA} feasibility in ${district}...`
      );
      const resA = await getFeasibilityReport(district, categoryA, currentLang);
      setReportA(resA);

      // Step 2: Fetch Feasibility Report for Category B
      setLoadingStep(
        currentLang === 'hi'
          ? `${district} में ${categoryB} का विश्लेषण किया जा रहा है...`
          : `Analyzing ${categoryB} feasibility in ${district}...`
      );
      const resB = await getFeasibilityReport(district, categoryB, currentLang);
      setReportB(resB);

      // Step 3: Fetch Comparison Verdict Synthesis
      setLoadingStep(
        currentLang === 'hi'
          ? 'तुलनात्मक एआई निष्कर्ष तैयार किया जा रहा है...'
          : 'Synthesizing AI comparison verdict...'
      );
      const verdictRes = await getComparisonVerdict(
        district,
        categoryA,
        categoryB,
        resA,
        resB,
        currentLang
      );
      setVerdict(verdictRes);
    } catch (err) {
      console.error('Comparison calculation failed:', err);
      setError(
        err.message ||
          (currentLang === 'hi'
            ? 'तुलना निष्पादित करने में असमर्थ। कृपया पुनः प्रयास करें।'
            : 'Failed to run comparison. Please try again.')
      );
    } finally {
      setLoading(false);
      setLoadingStep('');
    }
  };

  const handleDownloadPdf = async () => {
    if (!pdfRef.current) return;
    setPdfExporting(true);
    setPdfExportError(null);

    try {
      const cleanDist = district.replace(/[^a-zA-Z0-9]/g, '_');
      const cleanCatA = categoryA.replace(/[^a-zA-Z0-9]/g, '_');
      const cleanCatB = categoryB.replace(/[^a-zA-Z0-9]/g, '_');
      const filename = `ArthSetu_Comparison_${cleanDist}_${cleanCatA}_vs_${cleanCatB}.pdf`;

      await exportReportToPdf(pdfRef.current, filename);
    } catch (err) {
      console.error('Comparison PDF export error:', err);
      setPdfExportError(
        err.message ||
          (currentLang === 'hi'
            ? 'तुलना रिपोर्ट पीडीएफ तैयार करने में असमर्थ। कृपया पुनः प्रयास करें।'
            : 'Failed to generate comparison PDF report. Please try again.')
      );
    } finally {
      setPdfExporting(false);
    }
  };

  return (
    <div className="container dashboard-container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      {/* Header Banner */}
      <div className="dashboard-top-bar" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '0.5rem' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: 'rgba(5, 150, 105, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#059669',
            }}
          >
            <ArrowRightLeft size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              {currentLang === 'hi' ? 'व्यावसायिक तुलना एआई' : 'Business Opportunity Comparison'}
            </h1>
            <p style={{ fontSize: '0.875rem', color: '#64748B', margin: 0 }}>
              {currentLang === 'hi'
                ? 'अपने जिले के लिए दो अलग-अलग व्यावसायिक अवसरों की तुलना करें और एआई निष्कर्ष प्राप्त करें'
                : 'Compare two business sectors side-by-side for your district to find the best match'}
            </p>
          </div>
        </div>

        {/* Input Selector Form Card */}
        <form
          onSubmit={handleCompareSubmit}
          style={{
            marginTop: '1.25rem',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            padding: '1.25rem 1.5rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.25rem',
              alignItems: 'end',
            }}
          >
            {/* District Selector */}
            <div>
              <label
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  color: '#334155',
                  display: 'block',
                  marginBottom: '0.375rem',
                }}
              >
                {currentLang === 'hi' ? 'जिला चुनें (District)' : 'Target District'}
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '0.625rem 0.875rem',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.875rem',
                  color: '#0F172A',
                  backgroundColor: '#FFFFFF',
                  outline: 'none',
                }}
              >
                {Object.keys(DISTRICT_CATEGORIES).map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Category A Selector */}
            <div>
              <label
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  color: '#334155',
                  display: 'block',
                  marginBottom: '0.375rem',
                }}
              >
                {currentLang === 'hi' ? 'श्रेणी A (Option A)' : 'Category A'}
              </label>
              <select
                value={categoryA}
                onChange={(e) => setCategoryA(e.target.value)}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '0.625rem 0.875rem',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.875rem',
                  color: '#0F172A',
                  backgroundColor: '#FFFFFF',
                  outline: 'none',
                }}
              >
                {availableCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Category B Selector */}
            <div>
              <label
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  color: '#334155',
                  display: 'block',
                  marginBottom: '0.375rem',
                }}
              >
                {currentLang === 'hi' ? 'श्रेणी B (Option B)' : 'Category B'}
              </label>
              <select
                value={categoryB}
                onChange={(e) => setCategoryB(e.target.value)}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '0.625rem 0.875rem',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.875rem',
                  color: '#0F172A',
                  backgroundColor: '#FFFFFF',
                  outline: 'none',
                }}
              >
                {availableCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Compare Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary-cta"
                style={{
                  width: '100%',
                  height: '42px',
                  fontSize: '0.875rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                {loading ? (
                  <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                ) : (
                  <ArrowRightLeft size={18} />
                )}
                <span>
                  {loading
                    ? currentLang === 'hi' ? 'विश्लेषण जारी...' : 'Comparing...'
                    : currentLang === 'hi' ? 'तुलना करें' : 'Compare Opportunities'}
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Loading Progress State */}
      {loading && (
        <div className="dashboard-card" style={{ padding: '3rem 2rem', textAlign: 'center', marginBottom: '2rem' }}>
          <div className="ai-pulse-spinner" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
            {currentLang === 'hi' ? 'एआई तुलना विश्लेषण जारी है' : 'Running AI Comparison Analysis'}
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#059669', fontWeight: 600 }}>{loadingStep}</p>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: '#FEF2F2',
            border: '1px solid #FCA5A5',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '2rem',
            color: '#991B1B',
            fontSize: '0.875rem',
          }}
        >
          <AlertCircle size={20} style={{ flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      {/* Export Action Bar & Results Container */}
      {reportA && reportB && !loading && (
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              {currentLang === 'hi'
                ? `${district}: ${categoryA} बनाम ${categoryB} तुलना परिणाम`
                : `${district}: ${categoryA} vs ${categoryB} Comparison Results`}
            </h3>
          </div>

          <button
            type="button"
            className="btn-primary-cta"
            onClick={handleDownloadPdf}
            disabled={pdfExporting}
            style={{
              width: 'auto',
              padding: '0 1.25rem',
              height: '40px',
              fontSize: '0.875rem',
              backgroundColor: pdfExporting ? '#94A3B8' : '#059669',
              cursor: pdfExporting ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            {pdfExporting ? (
              <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
            ) : (
              <Download size={18} />
            )}
            <span>
              {pdfExporting
                ? currentLang === 'hi' ? 'तुलना रिपोर्ट पीडीएफ बन रही है...' : 'Generating Comparison PDF...'
                : currentLang === 'hi' ? 'तुलना पीडीएफ डाउनलोड करें' : 'Download PDF Comparison Report'}
            </span>
          </button>
        </div>
      )}

      {/* PDF Export Error Banner */}
      {pdfExportError && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FEF2F2',
            border: '1px solid #FCA5A5',
            borderRadius: '8px',
            padding: '0.75rem 1rem',
            marginBottom: '1.5rem',
            fontSize: '0.875rem',
            color: '#991B1B',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
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

      {/* Container for PDF Export (Captures AI Verdict Card + Side-by-Side Feasibility Reports) */}
      <div ref={pdfRef}>
        {/* Recommendation Verdict Card (Shown when comparison data is ready) */}
        {verdict && !loading && (
          <div
            className="dashboard-card"
            style={{
              marginBottom: '2.5rem',
              padding: '1.75rem',
              borderLeft: '5px solid #059669',
              backgroundColor: '#F0FDF4',
              boxShadow: '0 4px 12px rgba(5, 150, 105, 0.08)',
            }}
          >
            {/* Verdict Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <Award size={24} style={{ color: '#059669' }} />
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#064E3B', margin: 0 }}>
                    {currentLang === 'hi' ? 'एआई सिफारिश निष्कर्ष' : 'AI Recommendation Verdict'}
                  </h2>
                  <p style={{ fontSize: '0.8125rem', color: '#047857', margin: 0 }}>
                    {verdict.confidence_note}
                  </p>
                </div>
              </div>

              <span className="badge badge-emerald" style={{ fontSize: '0.875rem', padding: '6px 14px' }}>
                ★ {currentLang === 'hi' ? 'अनुशंसित विकल्प' : 'Recommended'}: {verdict.recommended_category || categoryA}
              </span>
            </div>

            {/* Reasoning & Tradeoffs Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.25rem',
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid #BBF7D0',
              }}
            >
              {/* Reasoning Box */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '1rem', border: '1px solid #A7F3D0' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#047857', textTransform: 'uppercase', marginBottom: '0.375rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <CheckCircle2 size={16} />
                  <span>{currentLang === 'hi' ? 'सिफारिश का कारण' : 'Why This Option Win'}</span>
                </div>
                <p style={{ fontSize: '0.875rem', color: '#1E293B', lineHeight: 1.55, margin: 0 }}>
                  {verdict.reasoning}
                </p>
              </div>

              {/* Key Tradeoffs Box */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '1rem', border: '1px solid #A7F3D0' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#D97706', textTransform: 'uppercase', marginBottom: '0.375rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <AlertTriangle size={16} />
                  <span>{currentLang === 'hi' ? 'मुख्य ट्रेड-ऑफ (Key Tradeoffs)' : 'Key Tradeoffs & Sacrifices'}</span>
                </div>
                <p style={{ fontSize: '0.875rem', color: '#1E293B', lineHeight: 1.55, margin: 0 }}>
                  {verdict.key_tradeoffs || (currentLang === 'hi' ? 'कोई महत्वपूर्ण जोखिम नहीं।' : 'No major critical tradeoffs identified.')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Side-by-Side Reports Layout */}
        {reportA && reportB && !loading && (
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0F172A', marginBottom: '1.25rem' }}>
              {currentLang === 'hi'
                ? `साइड-बाय-साइड विस्तृत रिपोर्ट तुलना (${categoryA} बनाम ${categoryB})`
                : `Side-by-Side Detailed Feasibility Comparison (${categoryA} vs ${categoryB})`}
            </h3>

            <div className="compare-grid-container">
              {/* Left Column: Category A */}
              <div
                className="compare-report-column"
                style={{
                  borderTop: verdict?.recommended_category === categoryA ? '4px solid #059669' : '1px solid #CBD5E1',
                  borderRadius: '8px',
                  minWidth: 0,
                  width: '100%',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    backgroundColor: verdict?.recommended_category === categoryA ? '#ECFDF5' : '#F8FAFC',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px 8px 0 0',
                    border: '1px solid #CBD5E1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Option A: {categoryA}
                  </h4>
                  {verdict?.recommended_category === categoryA && (
                    <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>
                      Recommended Winner
                    </span>
                  )}
                </div>

                {/* Reused FeasibilityReport Component for Option A */}
                <FeasibilityReport
                  location={district}
                  category={categoryA}
                  currentLang={currentLang}
                  reportData={reportA}
                />
              </div>

              {/* Right Column: Category B */}
              <div
                className="compare-report-column"
                style={{
                  borderTop: verdict?.recommended_category === categoryB ? '4px solid #059669' : '1px solid #CBD5E1',
                  borderRadius: '8px',
                  minWidth: 0,
                  width: '100%',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    backgroundColor: verdict?.recommended_category === categoryB ? '#ECFDF5' : '#F8FAFC',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px 8px 0 0',
                    border: '1px solid #CBD5E1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Option B: {categoryB}
                  </h4>
                  {verdict?.recommended_category === categoryB && (
                    <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>
                      Recommended Winner
                    </span>
                  )}
                </div>

                {/* Reused FeasibilityReport Component for Option B */}
                <FeasibilityReport
                  location={district}
                  category={categoryB}
                  currentLang={currentLang}
                  reportData={reportB}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
