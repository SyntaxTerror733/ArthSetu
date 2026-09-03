import React, { useState } from 'react';
import {
  Landmark,
  ArrowRight,
  Percent,
  Calendar,
  Clock,
  ShieldCheck,
  CreditCard,
  FileCheck2,
  TrendingDown,
  Info,
  CheckCircle,
  Table,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

/**
 * Module 2: Financial Roadmap
 * Displays REAL backend API financial calculation data when financialData prop is provided:
 * - Available Margin Capital (10% contribution)
 * - Total Feasible Project Cost (Margin Capital / 0.10)
 * - Maximum Loan Amount (Project Cost * 0.90)
 * - Matched Government Scheme & terms (Interest rate, tenure, moratorium)
 * - Fixed Quarterly Installment & Repayment Schedule
 */
export default function FinancialRoadmap({
  financialData = null,
  marginCapital = 100000,
  currentLang = 'en',
}) {
  const [showFullSchedule, setShowFullSchedule] = useState(false);

  // Extract values from financialData (real API response) or fallback to calculated defaults
  const capital = financialData?.margin_capital ?? (parseFloat(marginCapital) || 100000);
  const totalProjectCost = financialData?.project_cost ?? (capital / 0.10);
  const rawMaxLoan = financialData?.loan_amount ?? (totalProjectCost * 0.90);

  // Scheme Details from API or fallback
  const schemeData = financialData?.scheme;
  const schemeName =
    schemeData?.type ||
    (totalProjectCost <= 140000 ? 'Micro Finance Scheme' : 'Term Loan Scheme');
  const interestRate = schemeData?.interest_rate_percent ?? (totalProjectCost <= 140000 ? 6.5 : 8.0);
  const tenureYears = schemeData?.tenure_years ?? (totalProjectCost <= 140000 ? 3 : 7);
  const moratoriumMonths = schemeData?.moratorium_months ?? (totalProjectCost <= 140000 ? 3 : 6);
  const maxCap = schemeData?.max_project_cost ?? (totalProjectCost <= 140000 ? 140000 : 5000000);

  // Repayment Details from API
  const quarterlyInstallment = financialData?.quarterly_installment;
  const repaymentQuarters =
    financialData?.repayment_quarters ?? (tenureYears * 4 - Math.round(moratoriumMonths / 3));
  const totalInterestPayable = financialData?.total_interest_payable;
  const schedule = financialData?.schedule || [];

  // Description depending on matched scheme
  const schemeBadge =
    schemeName.includes('Micro') ? 'Micro Credit Tier' : 'MSME Enterprise Tier';
  const descriptionEn =
    schemeName.includes('Micro')
      ? 'Tailored for grassroots micro-enterprises and rural artisan units requiring fast collateral-free capital.'
      : 'Structured for viable medium-scale projects, capital asset investments, machinery, and commercial vehicles.';
  const descriptionHi =
    schemeName.includes('Micro')
      ? 'ग्रामीण कारीगरों और छोटे गृह व्यवसायों के लिए बिना किसी जटिल गारंटी के त्वरित ऋण।'
      : 'मध्यम पैमाने की व्यावसायिक परियोजनाओं, संयंत्र, मशीनरी और वाणिज्यिक विस्तार हेतु विशेष ऋण।';

  // Currency Formatter helper
  const formatCurrency = (val) => {
    if (val === undefined || val === null || isNaN(val)) return '₹0';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(val);
  };

  const visibleSchedule = showFullSchedule ? schedule : schedule.slice(0, 4);

  return (
    <section className="dashboard-module" id="module-financial">
      {/* Module Title */}
      <div className="module-header">
        <div className="module-title-area">
          <div className="module-icon-wrap teal">
            <Landmark size={24} />
          </div>
          <div>
            <h2 className="module-title">
              {currentLang === 'hi'
                ? 'मॉड्यूल 2: वित्तीय रोडमैप एवं ऋण संरचना'
                : 'Module 2: Financial Roadmap & Structuring'}
            </h2>
            <p className="module-subtitle">
              {currentLang === 'hi'
                ? 'उपलब्ध पूंजी के आधार पर कुल परियोजना लागत, ऋण पात्रता और सरकारी योजना आवंटन'
                : 'Dynamic capitalization, 10% margin structuring, and government scheme routing'}
            </p>
          </div>
        </div>

        <span className="badge badge-teal">
          <CheckCircle size={14} />
          {currentLang === 'hi' ? 'वित्तीय संरचना सत्यापित' : 'Capital Structuring Verified'}
        </span>
      </div>

      {/* Visual Financial Flowchart: 3 Cards */}
      <div className="financial-flowchart">
        {/* Step 1: Available Margin Capital */}
        <div className="flow-step-card">
          <div className="flow-step-number">Step 01</div>
          <h3 className="flow-step-title">
            {currentLang === 'hi' ? 'उपलब्ध स्वयं की पूंजी' : 'Available Margin Capital'}
          </h3>
          <div className="flow-step-amount text-navy">{formatCurrency(capital)}</div>
          <p className="flow-step-subtext">
            {currentLang === 'hi' ? 'उद्यमी का 10% योगदान' : "Entrepreneur's 10% Equity Contribution"}
          </p>
        </div>

        {/* Arrow 1 */}
        <div className="flow-connector-icon" aria-hidden="true">
          <ArrowRight size={28} strokeWidth={2.5} />
        </div>

        {/* Step 2: 10% Contribution -> Total Feasible Project Cost */}
        <div className="flow-step-card highlight-emerald">
          <div className="flow-step-number text-emerald">Step 02 · (Capital / 0.10)</div>
          <h3 className="flow-step-title">
            {currentLang === 'hi' ? 'कुल व्यवहार्य परियोजना लागत' : 'Total Feasible Project Cost'}
          </h3>
          <div className="flow-step-amount text-emerald">{formatCurrency(totalProjectCost)}</div>
          <p className="flow-step-subtext" style={{ color: '#047857', fontWeight: 600 }}>
            {currentLang === 'hi'
              ? '10% मार्जिन पूंजी के आधार पर 100% क्षमता'
              : '100% Capitalization (10% Margin Base)'}
          </p>
        </div>

        {/* Arrow 2 */}
        <div className="flow-connector-icon" aria-hidden="true">
          <ArrowRight size={28} strokeWidth={2.5} />
        </div>

        {/* Step 3: 90% Maximum Loan Amount */}
        <div className="flow-step-card highlight-teal">
          <div className="flow-step-number" style={{ color: '#0D9488' }}>Step 03 · (Cost × 0.90)</div>
          <h3 className="flow-step-title">
            {currentLang === 'hi' ? '90% अधिकतम ऋण राशि' : '90% Maximum Loan Amount'}
          </h3>
          <div className="flow-step-amount" style={{ color: '#0F766E' }}>{formatCurrency(rawMaxLoan)}</div>
          <p className="flow-step-subtext">
            {currentLang === 'hi' ? 'पात्र बैंक वित्तपोषण' : 'Eligible Debt Component'}
          </p>
        </div>
      </div>

      {/* Recommended Scheme Routing Card */}
      <div className="scheme-card-featured">
        <div className="scheme-badge-row">
          <div>
            <span style={{ fontSize: '0.8125rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              {currentLang === 'hi' ? 'स्वचालित अनुशंसित ऋण योजना' : 'Automated Recommended Scheme'}
            </span>
            <h3 className="scheme-name">{schemeName}</h3>
          </div>
          <span className="badge badge-emerald" style={{ fontSize: '0.875rem', padding: '0.4rem 1rem' }}>
            {schemeBadge}
          </span>
        </div>

        <p style={{ fontSize: '0.9375rem', color: '#CBD5E1', maxWidth: '780px', lineHeight: 1.6 }}>
          {currentLang === 'hi' ? descriptionHi : descriptionEn}
        </p>

        {/* Scheme Specifications Grid */}
        <div className="scheme-specs-grid">
          <div className="spec-item">
            <span className="spec-label">
              {currentLang === 'hi' ? 'अधिकतम ऋण सीमा' : 'Maximum Scheme Limit'}
            </span>
            <span className="spec-val highlight">{formatCurrency(maxCap)}</span>
          </div>

          <div className="spec-item">
            <span className="spec-label">
              {currentLang === 'hi' ? 'ब्याज दर (प्रति वर्ष)' : 'Interest Rate (p.a.)'}
            </span>
            <span className="spec-val">{interestRate}% p.a.</span>
          </div>

          <div className="spec-item">
            <span className="spec-label">
              {currentLang === 'hi' ? 'ऋण अवधि (Tenure)' : 'Repayment Tenure'}
            </span>
            <span className="spec-val">
              {tenureYears} {currentLang === 'hi' ? 'वर्ष' : 'Years'}
            </span>
          </div>

          <div className="spec-item">
            <span className="spec-label">
              {currentLang === 'hi' ? 'मोराटोरियम (छूट अवधि)' : 'Moratorium Period'}
            </span>
            <span className="spec-val highlight">
              {moratoriumMonths} {currentLang === 'hi' ? 'महीने' : 'Months'}
            </span>
          </div>
        </div>

        {/* EMI & Moratorium Detail Box */}
        {quarterlyInstallment !== undefined && (
          <div className="emi-summary-box">
            <div className="emi-amount-display">
              <span className="emi-label">
                {currentLang === 'hi'
                  ? `मोराटोरियम (${moratoriumMonths} महीने) के बाद त्रैमासिक किस्त (Fixed Quarterly Installment):`
                  : `Fixed Quarterly Installment (after ${moratoriumMonths}-month moratorium):`}
              </span>
              <span className="emi-value">{formatCurrency(quarterlyInstallment)} / quarter</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#CBD5E1', fontSize: '0.8125rem' }}>
                <ShieldCheck size={18} style={{ color: '#34D399', flexShrink: 0 }} />
                <span>
                  {currentLang === 'hi'
                    ? 'मोराटोरियम अवधि में कोई किस्त देय नहीं है।'
                    : 'Zero principal repayment during initial moratorium period.'}
                </span>
              </div>
              {totalInterestPayable !== undefined && (
                <div style={{ fontSize: '0.875rem', color: '#F8FAFC', fontWeight: 600 }}>
                  {currentLang === 'hi' ? 'कुल देय ब्याज:' : 'Total Payable Interest:'}{' '}
                  <span style={{ color: '#34D399' }}>{formatCurrency(totalInterestPayable)}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Financial Roadmap Timeline / Actionable Table */}
      <div className="dashboard-card">
        <div className="card-title-row">
          <h3 className="card-heading">
            <CreditCard size={20} className="text-teal" />
            <span>{currentLang === 'hi' ? 'ऋण पुनर्भुगतान अनुसूची (Amortization Schedule)' : 'Amortization & Repayment Schedule'}</span>
          </h3>
          <span className="badge badge-teal">{repaymentQuarters} Repayment Quarters</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1rem', marginBottom: '1.5rem' }}>
          {/* Phase 1: Moratorium */}
          <div className="roadmap-phase-card phase-teal">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Clock size={18} className="phase-icon" />
              <h4 className="phase-title">
                {currentLang === 'hi'
                  ? `चरण 1: मोराटोरियम अवधि (${moratoriumMonths} महीने)`
                  : `Phase 1: Moratorium Period (${moratoriumMonths} Months)`}
              </h4>
            </div>
            <p className="phase-desc">
              {currentLang === 'hi'
                ? 'व्यवसाय की स्थापना, उपकरण खरीद और शुरुआती बिक्री स्थिरीकरण के लिए 0 किस्त।'
                : 'Zero principal installment required. Utilize this period to acquire assets and build cash flows.'}
            </p>
          </div>

          {/* Phase 2: Amortization */}
          <div className="roadmap-phase-card phase-emerald">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Calendar size={18} className="phase-icon" />
              <h4 className="phase-title">
                {currentLang === 'hi'
                  ? `चरण 2: त्रैमासिक पुनर्भुगतान (${repaymentQuarters} तिमाहियां)`
                  : `Phase 2: Repayment Phase (${repaymentQuarters} Quarters)`}
              </h4>
            </div>
            <p className="phase-desc">
              {currentLang === 'hi'
                ? `नियमित त्रैमासिक किस्त ${formatCurrency(quarterlyInstallment || 0)}।`
                : `Fixed quarterly installments of ${formatCurrency(quarterlyInstallment || 0)}. Total interest: ${formatCurrency(totalInterestPayable || 0)}.`}
            </p>
          </div>
        </div>

        {/* Repayment Schedule Table */}
        {schedule.length > 0 && (
          <div style={{ marginTop: '1.5rem', overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '0.875rem',
                textAlign: 'left',
              }}
            >
              <thead>
                <tr style={{ backgroundColor: 'var(--color-bg, #F8FAFC)', borderBottom: '2px solid var(--color-border, #E2E8F0)' }}>
                  <th style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--color-navy, #0F172A)' }}>Quarter</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--color-navy, #0F172A)' }}>Opening Balance</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700, color: '#059669' }}>Principal Paid</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700, color: '#D97706' }}>Interest Paid</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700, color: '#0D9488' }}>Quarterly Installment</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--color-navy, #0F172A)' }}>Closing Balance</th>
                </tr>
              </thead>
              <tbody>
                {visibleSchedule.map((row) => (
                  <tr
                    key={row.quarter}
                    style={{ borderBottom: '1px solid var(--color-border, #E2E8F0)' }}
                  >
                    <td style={{ padding: '10px 14px', fontWeight: 600 }}>Q{row.quarter}</td>
                    <td style={{ padding: '10px 14px' }}>{formatCurrency(row.opening_balance)}</td>
                    <td style={{ padding: '10px 14px', color: '#059669', fontWeight: 600 }}>{formatCurrency(row.principal)}</td>
                    <td style={{ padding: '10px 14px', color: '#D97706' }}>{formatCurrency(row.interest)}</td>
                    <td style={{ padding: '10px 14px', color: '#0D9488', fontWeight: 600 }}>{formatCurrency(row.installment)}</td>
                    <td style={{ padding: '10px 14px', fontWeight: 600 }}>{formatCurrency(row.closing_balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {schedule.length > 4 && (
              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setShowFullSchedule(!showFullSchedule)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '8px 16px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#059669',
                    backgroundColor: 'rgba(5, 150, 105, 0.1)',
                    border: '1px solid rgba(5, 150, 105, 0.2)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  {showFullSchedule ? (
                    <>
                      <span>{currentLang === 'hi' ? 'कम दिखाएं' : 'Show First 4 Quarters'}</span>
                      <ChevronUp size={16} />
                    </>
                  ) : (
                    <>
                      <span>
                        {currentLang === 'hi'
                          ? `सभी ${schedule.length} तिमाहियों का पूरा शेड्यूल देखें`
                          : `View Full Schedule (${schedule.length} Quarters)`}
                      </span>
                      <ChevronDown size={16} />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
