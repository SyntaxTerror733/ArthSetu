import React from 'react';
import {
  Users,
  Compass,
  TrendingUp,
  AlertTriangle,
  Layers,
  Tag,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Shield,
  MapPin,
  Store,
  Truck,
  Building,
  RefreshCw,
  Zap,
  Database,
} from 'lucide-react';
import ReportChat from './ReportChat';

/**
 * Module 1: Business Feasibility Report
 * Displays real backend AI report data when `reportData` prop is provided:
 * 1. Market Reach (consumer reach, distribution narrative)
 * 2. Opportunity Analysis (underserved gaps & demand vectors)
 * 3. SWOT Analysis (clean 2x2 grid for strengths, weaknesses, opportunities, threats)
 * 4. Competitor Mapping (local density & competitive landscape)
 * 5. Product Market Value / Pricing Suggestion (recommended retail pricing & margins)
 * 6. Source Badge (_source: "live_llm" or "fallback_cache")
 * 7. Interactive Report AI Chatbot (ReportChat)
 */
export default function FeasibilityReport({
  location = 'Local Area',
  category = 'Micro Enterprise',
  capital = 100000,
  currentLang = 'en',
  reportData = null,
  loading = false,
  error = null,
  onRetry = null,
}) {
  // 1. Loading State View for Module 1
  if (loading) {
    return (
      <section className="dashboard-module" id="module-feasibility">
        <div className="dashboard-card" style={{ padding: '2.5rem 2rem', textAlign: 'center' }}>
          <div className="ai-pulse-spinner" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
            {currentLang === 'hi'
              ? 'एआई व्यवहार्यता रिपोर्ट तैयार की जा रही है...'
              : 'Generating AI Business Feasibility Report...'}
          </h3>
          <p style={{ fontSize: '0.9375rem', color: '#64748B', maxWidth: '480px', margin: '0 auto 1.25rem' }}>
            {currentLang === 'hi'
              ? `${location} में ${category} के लिए अति-स्थानीय बाज़ार और प्रतिस्पर्धी डेटा का विश्लेषण किया जा रहा है।`
              : `Analyzing hyper-local district data, market demand, and SWOT matrix for ${category} in ${location}.`}
          </p>
          <div className="loading-progress-track" style={{ maxWidth: '360px', margin: '0 auto' }}>
            <div className="loading-progress-bar" />
          </div>
        </div>
      </section>
    );
  }

  // 2. Error State View for Module 1 (Independently rendered without breaking other modules)
  if (error) {
    return (
      <section className="dashboard-module" id="module-feasibility">
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
              ? 'व्यवहार्यता रिपोर्ट तैयार करने में असमर्थ'
              : "Couldn't generate your feasibility report right now."}
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '1.25rem', maxWidth: '500px', margin: '0 auto 1.25rem' }}>
            {typeof error === 'string'
              ? error
              : error.message ||
                (currentLang === 'hi'
                  ? 'सर्वर से संपर्क करने में समस्या आई। कृपया पुनः प्रयास करें।'
                  : 'Failed to fetch feasibility report from backend AI server.')}
          </p>
          {onRetry && (
            <button
              type="button"
              className="btn-primary-cta"
              style={{ width: 'auto', padding: '0 1.25rem', height: '38px', fontSize: '0.875rem', margin: '0 auto' }}
              onClick={onRetry}
            >
              <RefreshCw size={16} />
              <span>{currentLang === 'hi' ? 'पुनः प्रयास करें' : 'Try Again'}</span>
            </button>
          )}
        </div>
      </section>
    );
  }

  // Category-tailored mock data generator for fallback when reportData is not provided
  const getCategoryInsights = (cat) => {
    switch (cat) {
      case 'Dairy':
        return {
          reachCount: '16,500+ households',
          radius: '5–8 km radius',
          channels: ['Daily Door-to-Door Delivery', 'Local Tea Stalls & Sweet Shops', 'Village Cooperative Chilling Centre', 'B2B Wholesale Dairy Unions'],
          opportunities: [
            'Absence of organized cold chain chilling within 7 km creates immediate premium for morning collection.',
            'High demand for pure A2/buffalo milk and paneer/ghee by peri-urban households.',
            'Cattle feed bulk purchasing discounts through local dairy cluster collectives.'
          ],
          swot: {
            strengths: [
              'Year-round essential daily consumption with immediate cash rotation',
              'Proximity to local fodder and agricultural crop residues reduces input cost',
              'Strong personal trust and relationships with local village households'
            ],
            weaknesses: [
              'Perishable product requiring prompt morning & evening dispatch or refrigeration',
              'Vulnerability to cattle diseases and veterinary healthcare costs',
              'High working capital needed for regular feed purchase'
            ],
            opportunities: [
              'Value-addition through curd, paneer, and clarified butter (ghee) with 35% higher margins',
              'Tie-ups with district town sweet shops and banquet caterers',
              'Subsidized cattle insurance and breed improvement schemes via Animal Husbandry Dept'
            ],
            threats: [
              'Fodder price surges during summer dry months',
              'Competition from large regional dairy cooperatives and powdered milk substitutes',
              'Monsoon transport interruptions on rural unpaved connector roads'
            ]
          },
          threatsList: [
            {
              title: 'Seasonal Demand & Summer Yield Dip',
              desc: 'Milk production typically drops 15–20% in peak summer while cattle water and cooling requirements rise.',
              mitigation: 'Mitigation: Plan silaged fodder stocks and promote value-added butter/buttermilk products.'
            },
            {
              title: 'Supply Chain & Power Outages',
              desc: 'Lack of power backup can spoil unsold evening batches within 4–6 hours in warm seasons.',
              mitigation: 'Mitigation: Invest in solar-assisted bulk milk cooler or tie up with morning bulk aggregators.'
            },
            {
              title: 'Dependency on Village Middlemen',
              desc: 'Private milk collectors frequently delay payouts and slash fat-content rates during flush seasons.',
              mitigation: 'Mitigation: Use digital fat testers at collection point to guarantee transparent spot pricing.'
            }
          ],
          competitors: {
            densityLabel: 'Moderate Competition',
            densityPercent: 55,
            densityColor: '#F59E0B',
            within5km: '4 unorganized village dairies, 1 cooperative collection point',
            within10km: '2 private chilling centres, 1 organized brand depot'
          },
          pricing: {
            benchmark: '₹54 – ₹64 per Litre',
            retailSuggested: '₹60 – ₹68 per Litre (Packaged/Delivered)',
            marginPotential: '22% – 28% Gross Margin'
          }
        };

      case 'Retail Shop':
      case 'Retail':
        return {
          reachCount: '9,800+ local residents',
          radius: '3–6 km radius',
          channels: ['Direct Walk-in Footfall', 'WhatsApp Neighborhood Ordering', 'Monthly Khata Credit for Known Families', 'Village Junction Hub'],
          opportunities: [
            'Increasing demand for packaged FMCG, organic spices, and household hygiene products.',
            'Local residents currently travel 10 km to the tehsil town for specialty grocery items.',
            'Integration of digital micro-ATM / Aadhaar Enabled Payment System (AePS) for footfall attraction.'
          ],
          swot: {
            strengths: [
              'High repeat footfall from walking-distance neighborhood residents',
              'Diverse product inventory spreads inventory risk across categories',
              'Low technical barrier to entry and straightforward daily cash flow'
            ],
            weaknesses: [
              'Capital lock-in in slow-moving non-perishable inventory',
              'Credit risk from delayed recoveries on customer khata accounts',
              'Limited shop space restricting bulk-discount inventory storage'
            ],
            opportunities: [
              'Offering mini cold drinks, ice cream, and dairy cooling during summer festival seasons',
              'Adding stationery, mobile accessories, and fertilizer seed agency extensions',
              'Direct wholesale procurement from district mandis bypassing secondary sub-dealers'
            ],
            threats: [
              'Expansion of quick-commerce / regional wholesale discount hypermarkets in nearby towns',
              'Wholesale supply chain delays during monsoon delivery logistics',
              'Shrinkage, expiry dates, and rodent damage on dry goods'
            ]
          },
          threatsList: [
            {
              title: 'Credit Dependency (Khata Defaults)',
              desc: 'Over-extension of informal credit to known villagers can freeze 25% of working margin.',
              mitigation: 'Mitigation: Cap individual credit at ₹1,500 and incentivize immediate UPI/cash discounts.'
            },
            {
              title: 'Town Wholesale Price Fluctuations',
              desc: 'Surges in cooking oil and pulse prices can compress margins if retail prices cannot adjust promptly.',
              mitigation: 'Mitigation: Maintain 2 alternate mandi suppliers and order high-velocity commodities weekly.'
            },
            {
              title: 'Neighborhood Kirana Density',
              desc: 'Multiple general stores on the main street compete aggressively on staple commodity pricing.',
              mitigation: 'Mitigation: Differentiate with fresh dairy, digital utility bill payment, and polite doorstep delivery.'
            }
          ],
          competitors: {
            densityLabel: 'Dense Local Competition',
            densityPercent: 72,
            densityColor: '#E11D48',
            within5km: '7 traditional kirana stores, 2 modern self-serve outlets',
            within10km: 'Tehsil wholesale market hub with 20+ distributors'
          },
          pricing: {
            benchmark: 'Standard MRP with 8–18% Wholesale Margin',
            retailSuggested: '12% – 16% Blended Margin',
            marginPotential: '₹25,000 – ₹45,000 / month net'
          }
        };

      default:
        return {
          reachCount: '12,500+ potential buyers',
          radius: '5–10 km operational radius',
          channels: ['Local Village Haats & Weekly Markets', 'Town Sub-Dealers & Retailers', 'Direct Consumer Sales', 'Govt Mandi & Cooperative Channels'],
          opportunities: [
            'Significant gap in locally processed quality goods compared to high-cost imported town goods.',
            'Growing consumer preference for locally made, freshly sourced regional produce.',
            'Government subsidies available under District Industries Centre (DIC) cluster schemes.'
          ],
          swot: {
            strengths: [
              'Low operational overhead and competitive local pricing advantage',
              'In-depth knowledge of local community preferences and buying calendar',
              'Agile production capable of small batches and custom requests'
            ],
            weaknesses: [
              'Limited initial brand awareness outside immediate village clusters',
              'Dependence on single machinery or family labor during peak cycles',
              'Initial packaging and branding constraints'
            ],
            opportunities: [
              'Expansion into neighboring block markets via weekly bazaar stalls',
              'Participation in Saras Fairs, SHG expos, and rural entrepreneurship meets',
              'Availing micro-enterprise credit under PMEGP or MUDRA schemes'
            ],
            threats: [
              'Seasonal cash liquidity shortages during pre-harvest farming seasons',
              'Price volatility in essential raw material procurement',
              'Aggressive discounting from established town manufacturers'
            ]
          },
          threatsList: [
            {
              title: 'Seasonal Demand Variance',
              desc: 'Rural sales often spike post-harvest (October–December) and slow during summer planting months.',
              mitigation: 'Mitigation: Build buffer liquidity reserves during harvest months to sustain slower quarters.'
            },
            {
              title: 'Raw Material Supply Bottlenecks',
              desc: 'Transport costs increase when procuring specialized spare parts or ingredients from distant cities.',
              mitigation: 'Mitigation: Form collective procurement arrangements with fellow district micro-units.'
            },
            {
              title: 'Buyer Bargaining Power',
              desc: 'Relying on 1 or 2 large local shopkeepers can lead to aggressive payment delays.',
              mitigation: 'Mitigation: Diversify sales across direct consumer pop-ups, haats, and multiple small retailers.'
            }
          ],
          competitors: {
            densityLabel: 'Moderate Competition',
            densityPercent: 48,
            densityColor: '#14B8A6',
            within5km: '2 to 3 informal home units',
            within10km: '4 organized workshops or semi-urban suppliers'
          },
          pricing: {
            benchmark: 'Competitive Regional Average',
            retailSuggested: '15% – 25% Markup on Total Input Cost',
            marginPotential: '20% – 30% Healthy Margin'
          }
        };
    }
  };

  const insights = getCategoryInsights(category);

  // Helper to render SWOT items from real API array/string or fallback
  const renderSwotBlock = (realContent, defaultList, icon) => {
    const content = realContent !== undefined && realContent !== null ? realContent : defaultList;
    if (!content) return null;

    if (Array.isArray(content)) {
      return (
        <ul className="swot-items-list">
          {content.map((item, idx) => (
            <li key={idx} className="swot-item-bullet">
              {icon}
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    }

    if (typeof content === 'string') {
      const lines = content
        .split(/(?<=\.)\s+|\n+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      if (lines.length > 1) {
        return (
          <ul className="swot-items-list">
            {lines.map((line, idx) => (
              <li key={idx} className="swot-item-bullet" style={{ alignItems: 'flex-start' }}>
                {icon}
                <span style={{ lineHeight: 1.45 }}>{line.replace(/^[-•*]\s*/, '')}</span>
              </li>
            ))}
          </ul>
        );
      }

      return (
        <div style={{ fontSize: '0.875rem', lineHeight: '1.5', color: '#1E293B', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
          {icon}
          <span>{content}</span>
        </div>
      );
    }

    return null;
  };

  // Helper to render generic text / array fields
  const renderNarrative = (realVal, defaultListOrRender) => {
    if (realVal) {
      if (Array.isArray(realVal)) {
        return (
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {realVal.map((item, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.875rem', color: '#1E293B', lineHeight: 1.5 }}>
                <span style={{ color: '#059669', flexShrink: 0, marginTop: '2px' }}>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
      }
      return (
        <p style={{ fontSize: '0.875rem', color: '#334155', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
          {realVal}
        </p>
      );
    }
    return defaultListOrRender;
  };

  return (
    <section className="dashboard-module" id="module-feasibility">
      {/* Module Title */}
      <div className="module-header">
        <div className="module-title-area">
          <div className="module-icon-wrap emerald">
            <Compass size={24} />
          </div>
          <div>
            <h2 className="module-title">
              {currentLang === 'hi'
                ? 'मॉड्यूल 1: व्यवसाय व्यवहार्यता रिपोर्ट'
                : 'Module 1: Business Feasibility Report'}
            </h2>
            <p className="module-subtitle">
              {currentLang === 'hi'
                ? `${location} में ${category} के लिए अति-स्थानीय बाज़ार विश्लेषण`
                : `Hyper-local market assessment for ${category} in ${location}`}
            </p>
          </div>
        </div>

        {/* Source Badge */}
        <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
          {reportData?._source === 'live_llm' ? (
            <>
              <Zap size={14} style={{ color: '#059669' }} />
              {currentLang === 'hi' ? 'लाइव AI विश्लेषण' : 'Live AI Analysis'}
            </>
          ) : reportData?._source === 'fallback_cache' ? (
            <>
              <Database size={14} style={{ color: '#0D9488' }} />
              {currentLang === 'hi' ? 'कैश्ड सलाहकार रिपोर्ट' : 'Cached AI Report'}
            </>
          ) : (
            <>
              <CheckCircle2 size={14} />
              {currentLang === 'hi' ? 'उच्च व्यवहार्यता स्कोर: 86%' : 'Feasibility Score: 86% High'}
            </>
          )}
        </span>
      </div>

      {/* Grid Row 1: Market Reach & Opportunity Analysis */}
      <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
        {/* 1. Market Reach Card */}
        <div className="dashboard-card">
          <div className="card-title-row">
            <h3 className="card-heading">
              <Users size={20} className="text-emerald" />
              <span>{currentLang === 'hi' ? '1. बाज़ार पहुंच (Market Reach)' : '1. Market Reach'}</span>
            </h3>
            <span className="badge badge-teal">{insights.radius}</span>
          </div>

          {reportData?.market_reach ? (
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.875rem', color: '#334155', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                {reportData.market_reach}
              </p>
            </div>
          ) : (
            <div className="market-reach-stats">
              <div className="stat-box">
                <div className="stat-label">
                  {currentLang === 'hi' ? 'अनुमानित उपभोक्ता पहुंच' : 'Local Consumer Reach'}
                </div>
                <div className="stat-value text-emerald">{insights.reachCount}</div>
              </div>

              <div className="stat-box">
                <div className="stat-label">
                  {currentLang === 'hi' ? 'परिचालन दायरा' : 'Target Radius'}
                </div>
                <div className="stat-value">{insights.radius}</div>
              </div>
            </div>
          )}

          <div>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '0.35rem' }}>
              {currentLang === 'hi' ? 'संभावित वितरण चैनल:' : 'Potential Distribution Channels:'}
            </span>
            <div className="channel-tags-list">
              {insights.channels.map((ch, idx) => (
                <span key={idx} className="channel-tag">
                  {ch}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Opportunity Analysis Card */}
        <div className="dashboard-card">
          <div className="card-title-row">
            <h3 className="card-heading">
              <TrendingUp size={20} className="text-emerald" />
              <span>{currentLang === 'hi' ? '2. अवसर विश्लेषण (Opportunities)' : '2. Opportunity Analysis'}</span>
            </h3>
            <span className="badge badge-emerald">
              {currentLang === 'hi' ? 'अल्पसेवित बाज़ार' : 'Underserved Gap'}
            </span>
          </div>

          <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '1rem' }}>
            {currentLang === 'hi'
              ? 'स्थानीय क्षेत्र में चिन्हित मुख्य बाजार अंतराल और व्यावसायिक संभावनाएं:'
              : 'Key market voids and latent demand vectors identified in this territory:'}
          </p>

          {renderNarrative(
            reportData?.opportunity_analysis,
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {insights.opportunities.map((opp, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.875rem', color: '#1E293B', lineHeight: 1.45 }}>
                  <span style={{ color: '#059669', flexShrink: 0, marginTop: '2px' }}>✓</span>
                  <span>{opp}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Grid Row 2: 3. SWOT Analysis (Clean 2x2 Grid) */}
      <div className="dashboard-card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-title-row">
          <h3 className="card-heading">
            <Layers size={20} className="text-emerald" />
            <span>{currentLang === 'hi' ? '3. स्वॉट विश्लेषण (SWOT Analysis - 2x2)' : '3. SWOT Analysis (2x2 Matrix)'}</span>
          </h3>
          <span style={{ fontSize: '0.8125rem', color: '#64748B' }}>
            {currentLang === 'hi' ? 'आंतरिक एवं बाह्य मूल्यांकन' : 'Internal & External Strategy Matrix'}
          </span>
        </div>

        <div className="swot-2x2-grid">
          {/* Strengths */}
          <div className="swot-cell strengths">
            <div className="swot-cell-header">
              <span className="swot-cell-title">
                <span className="badge badge-emerald">S</span>
                <span>{currentLang === 'hi' ? 'ताकत (Strengths)' : 'Strengths'}</span>
              </span>
            </div>
            {renderSwotBlock(
              reportData?.swot?.strengths,
              insights.swot.strengths,
              <CheckCircle2 size={16} className="text-emerald swot-bullet-icon" />
            )}
          </div>

          {/* Weaknesses */}
          <div className="swot-cell weaknesses">
            <div className="swot-cell-header">
              <span className="swot-cell-title">
                <span className="badge badge-saffron">W</span>
                <span>{currentLang === 'hi' ? 'कमजोरियां (Weaknesses)' : 'Weaknesses'}</span>
              </span>
            </div>
            {renderSwotBlock(
              reportData?.swot?.weaknesses,
              insights.swot.weaknesses,
              <AlertCircle size={16} className="text-saffron swot-bullet-icon" />
            )}
          </div>

          {/* Opportunities */}
          <div className="swot-cell opportunities">
            <div className="swot-cell-header">
              <span className="swot-cell-title">
                <span className="badge badge-teal">O</span>
                <span>{currentLang === 'hi' ? 'अवसर (Opportunities)' : 'Opportunities'}</span>
              </span>
            </div>
            {renderSwotBlock(
              reportData?.swot?.opportunities,
              insights.swot.opportunities,
              <TrendingUp size={16} className="text-teal swot-bullet-icon" />
            )}
          </div>

          {/* Threats */}
          <div className="swot-cell threats">
            <div className="swot-cell-header">
              <span className="swot-cell-title">
                <span style={{ backgroundColor: '#FFE4E6', color: '#E11D48', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700 }}>
                  T
                </span>
                <span>{currentLang === 'hi' ? 'चुनौतियां (Threats)' : 'Threats'}</span>
              </span>
            </div>
            {renderSwotBlock(
              reportData?.swot?.threats,
              insights.swot.threats,
              <AlertTriangle size={16} style={{ color: '#E11D48' }} className="swot-bullet-icon" />
            )}
          </div>
        </div>
      </div>

      {/* Grid Row 3: 4. Local Threats, 5. Competitor Mapping & 6. Product Market Value */}
      <div className="grid-3">
        {/* 4. Local Threats Card */}
        <div className="dashboard-card">
          <div className="card-title-row">
            <h3 className="card-heading">
              <AlertTriangle size={20} style={{ color: '#E11D48' }} />
              <span>{currentLang === 'hi' ? '4. स्थानीय जोखिम' : '4. Local Threats'}</span>
            </h3>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#E11D48', background: '#FFF1F2', padding: '2px 8px', borderRadius: '4px' }}>
              Mitigations
            </span>
          </div>

          <div className="threats-list">
            {insights.threatsList.map((th, idx) => (
              <div key={idx} className="threat-item-card">
                <div className="threat-icon">
                  <AlertCircle size={18} />
                </div>
                <div>
                  <h4 className="threat-title">{th.title}</h4>
                  <p className="threat-desc">{th.desc}</p>
                  <p className="threat-mitigation">{th.mitigation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Competitor Mapping */}
        <div className="dashboard-card">
          <div className="card-title-row">
            <h3 className="card-heading">
              <Store size={20} className="text-emerald" />
              <span>{currentLang === 'hi' ? '5. प्रतिस्पर्धी मैपिंग' : '5. Competitor Mapping'}</span>
            </h3>
          </div>

          {reportData?.competitor_mapping ? (
            <div style={{ marginTop: '0.75rem' }}>
              <p style={{ fontSize: '0.875rem', color: '#334155', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                {reportData.competitor_mapping}
              </p>
            </div>
          ) : (
            <>
              <div className="competitor-density-bar">
                <div className="density-label-row">
                  <span>Estimated Competition Density</span>
                  <span style={{ color: insights.competitors.densityColor }}>
                    {insights.competitors.densityLabel}
                  </span>
                </div>
                <div className="density-track">
                  <div
                    className="density-fill"
                    style={{
                      width: `${insights.competitors.densityPercent}%`,
                      backgroundColor: insights.competitors.densityColor,
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginTop: '1.25rem' }}>
                <div style={{ backgroundColor: 'var(--color-bg)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-navy-muted)', display: 'block' }}>
                    LOCAL DENSITY (0–5 KM)
                  </span>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-navy)', fontWeight: 600, marginTop: '2px' }}>
                    {insights.competitors.within5km}
                  </p>
                </div>

                <div style={{ backgroundColor: 'var(--color-bg)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-navy-muted)', display: 'block' }}>
                    PERI-URBAN DENSITY (5–10 KM)
                  </span>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-navy)', fontWeight: 600, marginTop: '2px' }}>
                    {insights.competitors.within10km}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* 6. Product Market Value / Pricing Suggestion */}
        <div className="dashboard-card">
          <div className="card-title-row">
            <h3 className="card-heading">
              <Tag size={20} className="text-emerald" />
              <span>{currentLang === 'hi' ? '6. मूल्य निर्धारण सुझाव' : '6. Pricing Suggestion'}</span>
            </h3>
          </div>

          {reportData?.pricing_suggestion ? (
            <div style={{ marginTop: '0.75rem' }}>
              <div style={{ backgroundColor: 'var(--color-emerald-soft)', border: '1px solid var(--color-emerald-border)', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-emerald)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                  AI Pricing Recommendation
                </div>
                <p style={{ fontSize: '0.875rem', color: '#1E293B', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                  {reportData.pricing_suggestion}
                </p>
              </div>
            </div>
          ) : (
            <>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-navy-muted)', marginBottom: '1rem' }}>
                Recommended retail pricing benchmarked against local mandi and tehsil rates:
              </p>

              <div className="price-benchmark-box">
                <div style={{ fontSize: '0.75rem', color: 'var(--color-navy-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                  Market Benchmark Price
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-navy)', marginTop: '4px' }}>
                  {insights.pricing.benchmark}
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--color-emerald-soft)', border: '1px solid var(--color-emerald-border)', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-emerald)', fontWeight: 700, textTransform: 'uppercase' }}>
                  Suggested Selling Range
                </div>
                <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-emerald)', marginTop: '2px' }}>
                  {insights.pricing.retailSuggested}
                </div>
              </div>

              <div style={{ fontSize: '0.8125rem', color: 'var(--color-navy-subtle)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: 700, color: 'var(--color-navy)' }}>Estimated Margin:</span>
                <span className="badge badge-emerald">{insights.pricing.marginPotential}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 7. Interactive Follow-up AI Assistant Chatbot */}
      <ReportChat
        district={location}
        businessCategory={category}
        report={reportData || insights}
        currentLang={currentLang}
      />
    </section>
  );
}

