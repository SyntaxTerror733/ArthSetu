import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Info, ChevronDown, ChevronUp, Database } from 'lucide-react';

/**
 * DataSourceBadge Component
 * Credibility and trust indicator displaying confidence levels and citation sources for district data.
 * 
 * Props expected:
 * @param {Object} [dataConfidence] - Object mapping field names to confidence level ("verified" | "estimated")
 * @param {Object} [data_confidence] - Snake-case alias for dataConfidence
 * @param {Array<string>} [sources] - Citation strings list
 * @param {string} [currentLang='en'] - Active language ('en' | 'hi')
 */
export default function DataSourceBadge({
  dataConfidence,
  data_confidence,
  sources = [],
  currentLang = 'en',
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const confidence = dataConfidence || data_confidence;

  // Don't render if neither confidence nor sources are available
  if (!confidence && (!sources || sources.length === 0)) {
    return null;
  }

  const isBusinessVerified = confidence?.business_density === 'verified';

  return (
    <div
      style={{
        backgroundColor: '#F8FAFC',
        border: '1px solid #E2E8F0',
        borderRadius: '8px',
        padding: '0.75rem 1rem',
        marginBottom: '1.25rem',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
        transition: 'all 0.2s ease',
      }}
    >
      {/* Top Header Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.625rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {/* Trust Header Label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#334155', fontWeight: 600, fontSize: '0.8125rem' }}>
            <ShieldCheck size={16} style={{ color: '#059669' }} />
            <span>{currentLang === 'hi' ? 'डेटा विश्वसनीयता' : 'Data Credibility'}:</span>
          </div>

          {/* Chip 1: Business Data Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              backgroundColor: isBusinessVerified ? 'rgba(5, 150, 105, 0.1)' : '#F1F5F9',
              color: isBusinessVerified ? '#047857' : '#475569',
              border: isBusinessVerified ? '1px solid rgba(5, 150, 105, 0.3)' : '1px solid #CBD5E1',
              borderRadius: '16px',
              padding: '2px 10px',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            <CheckCircle2 size={13} style={{ color: isBusinessVerified ? '#059669' : '#64748B' }} />
            <span>
              {currentLang === 'hi'
                ? `व्यावसायिक डेटा: ${isBusinessVerified ? 'सत्यापित' : 'अनुमानित'}`
                : `Business Data: ${isBusinessVerified ? 'Verified' : 'Estimated'}`}
            </span>
          </div>

          {/* Chip 2: Demographics Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              backgroundColor: '#FEF3C7',
              color: '#92400E',
              border: '1px solid #FCD34D',
              borderRadius: '16px',
              padding: '2px 10px',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            <Info size={13} style={{ color: '#D97706' }} />
            <span>
              {currentLang === 'hi' ? 'जनसांख्यिकी: अनुमानित' : 'Demographics: Estimated'}
            </span>
          </div>
        </div>

        {/* Collapsible Toggle Button */}
        {sources && sources.length > 0 && (
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              background: 'none',
              border: 'none',
              color: '#059669',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              padding: '2px 6px',
              borderRadius: '4px',
              transition: 'background-color 0.15s ease',
            }}
          >
            <Database size={13} />
            <span>
              {isExpanded
                ? currentLang === 'hi' ? 'डेटा स्रोत छिपाएं' : 'Hide Data Sources'
                : currentLang === 'hi' ? 'डेटा स्रोत देखें' : 'View Data Sources'}
            </span>
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        )}
      </div>

      {/* Expanded Citations Section */}
      {isExpanded && sources && sources.length > 0 && (
        <div
          style={{
            marginTop: '0.75rem',
            paddingTop: '0.625rem',
            borderTop: '1px dashed #CBD5E1',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.375rem',
          }}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.025em' }}>
            {currentLang === 'hi' ? 'डेटा स्रोत और उद्धरण:' : 'Data Sources & Citations:'}
          </span>
          {sources.map((sourceText, idx) => (
            <div
              key={idx}
              style={{
                fontSize: '0.75rem',
                color: '#475569',
                lineHeight: 1.4,
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.375rem',
              }}
            >
              <span style={{ color: '#059669', fontWeight: 700 }}>•</span>
              <span>{sourceText}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
