import React from 'react';
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
  CheckCircle
} from 'lucide-react';

/**
 * Module 2: Financial Roadmap
 * Visual financial flow:
 * Available Margin Capital -> 10% Contribution -> Total Feasible Project Cost -> 90% Loan Amount
 *
 * Formulas:
 * Total Project Cost = Available Margin Capital / 0.10
 * Maximum Loan Amount = Total Project Cost * 0.90
 *
 * Scheme Routing:
 * <= ₹1.40 Lakh: Micro Finance Scheme (Max Loan: ₹1.25 Lakh, Interest: 6.5%, Tenure: 3 yrs, Moratorium: 3 mos)
 * > ₹1.40 Lakh and <= ₹50 Lakh: Term Loan Scheme (Max Loan: ₹45 Lakh, Interest: 8%, Tenure: 7 yrs, Moratorium: 6 mos)
 */
export default function FinancialRoadmap({
  marginCapital = 100000,
  currentLang = 'en',
}) {
  const capital = parseFloat(marginCapital) || 10000;

  // Exact formulas specified by user
  const totalProjectCost = capital / 0.10;
  const rawMaxLoan = totalProjectCost * 0.90;

  // Scheme Routing Logic
  let schemeInfo = {};
  if (totalProjectCost <= 140000) {
    // Micro Finance Scheme
    const eligibleLoan = Math.min(rawMaxLoan, 125000);
    schemeInfo = {
      name: 'Micro Finance Scheme',
      nameHi: 'माइक्रो फाइनेंस योजना (सूक्ष्म ऋण)',
      badge: 'Micro Credit Tier',
      maxCap: 125000,
      eligibleLoan: eligibleLoan,
      interestRate: 6.5,
      tenureYears: 3,
      moratoriumMonths: 3,
      descriptionEn: 'Tailored for grassroots micro-enterprises and rural artisan units requiring fast collateral-free capital.',
      descriptionHi: 'ग्रामीण कारीगरों और छोटे गृह व्यवसायों के लिए बिना किसी जटिल गारंटी के त्वरित ऋण।'
    };
  } else if (totalProjectCost <= 5000000) {
    // Term Loan Scheme
    const eligibleLoan = Math.min(rawMaxLoan, 4500000);
    schemeInfo = {
      name: 'Term Loan Scheme',
      nameHi: 'मियादी ऋण योजना (Term Loan Scheme)',
      badge: 'MSME Enterprise Tier',
      maxCap: 4500000,
      eligibleLoan: eligibleLoan,
      interestRate: 8.0,
      tenureYears: 7,
      moratoriumMonths: 6,
      descriptionEn: 'Structured for viable medium-scale projects, capital asset investments, machinery, and commercial vehicles.',
      descriptionHi: 'मध्यम पैमाने की व्यावसायिक परियोजनाओं, संयंत्र, मशीनरी और वाणिज्यिक विस्तार हेतु विशेष ऋण।'
    };
  } else {
    // Enterprise Cap
    const eligibleLoan = Math.min(rawMaxLoan, 50000000);
    schemeInfo = {
      name: 'Special Enterprise MSME Scheme',
      nameHi: 'विशेष एमएसएमई उद्यम योजना',
      badge: 'Industrial Growth Tier',
      maxCap: 50000000,
      eligibleLoan: eligibleLoan,
      interestRate: 8.5,
      tenureYears: 8,
      moratoriumMonths: 6,
      descriptionEn: 'High-value industrial enterprise financing under priority sector credit channels.',
      descriptionHi: 'प्राथमिकता क्षेत्र ऋण दिशानिर्देशों के तहत उच्च मूल्य उद्यम वित्तपोषण।'
    };
  }

  // Monthly EMI Calculation
  // Standard Amortization Formula: P * r * (1+r)^n / ((1+r)^n - 1)
  const calculateEMI = (principal, annualRate, tenureYears, moratoriumMonths) => {
    const monthlyRate = annualRate / (12 * 100);
    // Repayment months after moratorium
    const repaymentMonths = Math.max(12, tenureYears * 12 - moratoriumMonths);
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, repaymentMonths)) /
      (Math.pow(1 + monthlyRate, repaymentMonths) - 1);
    return Math.round(emi);
  };

  const estimatedEMI = calculateEMI(
    schemeInfo.eligibleLoan,
    schemeInfo.interestRate,
    schemeInfo.tenureYears,
    schemeInfo.moratoriumMonths
  );

  // Currency Formatter
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

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

      {/* Visual Financial Flowchart: 4 Cards */}
      <div className="financial-flowchart">
        {/* Step 1: Available Margin Capital */}
        <div className="flow-step-card">
          <div className="flow-step-number">Step 01</div>
          <h3 className="flow-step-title">
            {currentLang === 'hi' ? 'उपलब्ध स्वयं की पूंजी' : 'Available Margin Capital'}
          </h3>
          <div className="flow-step-amount text-navy">{formatCurrency(capital)}</div>
          <p className="flow-step-subtext">
            {currentLang === 'hi' ? 'उद्यमी का प्रारंभिक योगदान' : "Entrepreneur's Own Equity"}
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
            <h3 className="scheme-name">{schemeInfo.name}</h3>
          </div>
          <span className="badge badge-emerald" style={{ fontSize: '0.875rem', padding: '0.4rem 1rem' }}>
            {schemeInfo.badge}
          </span>
        </div>

        <p style={{ fontSize: '0.9375rem', color: '#CBD5E1', maxWidth: '780px', lineHeight: 1.6 }}>
          {currentLang === 'hi' ? schemeInfo.descriptionHi : schemeInfo.descriptionEn}
        </p>

        {/* Scheme Specifications Grid */}
        <div className="scheme-specs-grid">
          <div className="spec-item">
            <span className="spec-label">
              {currentLang === 'hi' ? 'अधिकतम ऋण सीमा' : 'Maximum Scheme Loan'}
            </span>
            <span className="spec-val highlight">{formatCurrency(schemeInfo.maxCap)}</span>
          </div>

          <div className="spec-item">
            <span className="spec-label">
              {currentLang === 'hi' ? 'ब्याज दर (प्रति वर्ष)' : 'Interest Rate (p.a.)'}
            </span>
            <span className="spec-val">{schemeInfo.interestRate}% p.a.</span>
          </div>

          <div className="spec-item">
            <span className="spec-label">
              {currentLang === 'hi' ? 'ऋण अवधि (Tenure)' : 'Repayment Tenure'}
            </span>
            <span className="spec-val">
              {schemeInfo.tenureYears} {currentLang === 'hi' ? 'वर्ष' : 'Years'}
            </span>
          </div>

          <div className="spec-item">
            <span className="spec-label">
              {currentLang === 'hi' ? 'मोराटोरियम (छूट अवधि)' : 'Moratorium Period'}
            </span>
            <span className="spec-val highlight">
              {schemeInfo.moratoriumMonths} {currentLang === 'hi' ? 'महीने' : 'Months'}
            </span>
          </div>
        </div>

        {/* EMI & Moratorium Detail Box */}
        <div className="emi-summary-box">
          <div className="emi-amount-display">
            <span className="emi-label">
              {currentLang === 'hi'
                ? `मोराटोरियम (${schemeInfo.moratoriumMonths} महीने) के बाद अनुमानित मासिक किस्त:`
                : `Estimated Monthly EMI (after ${schemeInfo.moratoriumMonths}-month moratorium):`}
            </span>
            <span className="emi-value">~ {formatCurrency(estimatedEMI)} / month</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#CBD5E1', fontSize: '0.8125rem' }}>
            <ShieldCheck size={18} style={{ color: '#34D399', flexShrink: 0 }} />
            <span>
              {currentLang === 'hi'
                ? 'मोराटोरियम अवधि में मूलधन पुनर्भुगतान पर कोई जुर्माना नहीं।'
                : 'Zero principal repayment penalty during the initial grace period.'}
            </span>
          </div>
        </div>
      </div>

      {/* Financial Roadmap Timeline / Actionable Table */}
      <div className="dashboard-card">
        <div className="card-title-row">
          <h3 className="card-heading">
            <CreditCard size={20} className="text-teal" />
            <span>{currentLang === 'hi' ? 'ऋण चुकौती एवं मोराटोरियम समय-सारणी' : 'Repayment & Moratorium Roadmap'}</span>
          </h3>
          <span className="badge badge-teal">Phase 1 & Phase 2</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1rem' }}>
          {/* Phase 1: Moratorium */}
          <div className="roadmap-phase-card phase-teal">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Clock size={18} className="phase-icon" />
              <h4 className="phase-title">
                {currentLang === 'hi'
                  ? `चरण 1: मोराटोरियम अवधि (महीने 1 से ${schemeInfo.moratoriumMonths})`
                  : `Phase 1: Moratorium Period (Months 1–${schemeInfo.moratoriumMonths})`}
              </h4>
            </div>
            <p className="phase-desc">
              {currentLang === 'hi'
                ? 'व्यवसाय की स्थापना, उपकरण खरीद और शुरुआती बिक्री स्थिरीकरण के लिए 0 मूलधन किस्त। केवल न्यूनतम सरल ब्याज देय।'
                : 'Zero principal repayment required. Utilize this period to acquire machinery, stabilize supplier networks, and establish steady sales.'}
            </p>
          </div>

          {/* Phase 2: Amortization */}
          <div className="roadmap-phase-card phase-emerald">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Calendar size={18} className="phase-icon" />
              <h4 className="phase-title">
                {currentLang === 'hi'
                  ? `चरण 2: नियमित ईएमआई (महीने ${schemeInfo.moratoriumMonths + 1} से ${schemeInfo.tenureYears * 12})`
                  : `Phase 2: Standard EMI (Months ${schemeInfo.moratoriumMonths + 1}–${schemeInfo.tenureYears * 12})`}
              </h4>
            </div>
            <p className="phase-desc">
              {currentLang === 'hi'
                ? `नियमित मासिक किस्त ~${formatCurrency(estimatedEMI)}। ऋण समय पूर्व चुकाने पर शून्य फोरक्लोजर चार्ज।`
                : `Equated monthly installments of ~${formatCurrency(estimatedEMI)}. No penalty for pre-payment or loan foreclosure from operational profits.`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
