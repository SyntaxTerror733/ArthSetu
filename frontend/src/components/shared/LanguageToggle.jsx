import React from 'react';
import { Globe } from 'lucide-react';

/**
 * Language Selector Component
 * Allows rural and semi-urban entrepreneurs to easily toggle between English and Hindi.
 */
export default function LanguageToggle({ currentLang = 'en', onToggle }) {
  return (
    <div
      className="language-toggle"
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        className={`lang-btn ${currentLang === 'en' ? 'active' : ''}`}
        onClick={() => onToggle && onToggle('en')}
        aria-pressed={currentLang === 'en'}
      >
        English
      </button>
      <button
        type="button"
        className={`lang-btn ${currentLang === 'hi' ? 'active' : ''}`}
        onClick={() => onToggle && onToggle('hi')}
        aria-pressed={currentLang === 'hi'}
      >
        हिंदी
      </button>
    </div>
  );
}
