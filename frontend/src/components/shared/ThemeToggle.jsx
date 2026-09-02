import React from 'react';
import { Sun, Moon } from 'lucide-react';

/**
 * ThemeToggle Component
 * Pill-shaped toggle switch for switching between Light and Dark modes.
 * Adheres to the ArthSetu design system and provides accessible controls.
 */
export default function ThemeToggle({ currentTheme = 'light', onToggle }) {
  const isDark = currentTheme === 'dark';

  return (
    <button
      type="button"
      className="theme-toggle-pill"
      onClick={onToggle}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className={`theme-toggle-track ${isDark ? 'is-dark' : 'is-light'}`}>
        <span className="theme-toggle-thumb">
          {isDark ? (
            <Moon size={14} className="theme-icon moon-icon" strokeWidth={2.4} />
          ) : (
            <Sun size={14} className="theme-icon sun-icon" strokeWidth={2.4} />
          )}
        </span>
        <span className="theme-toggle-label">
          {isDark ? 'Dark' : 'Light'}
        </span>
      </div>
    </button>
  );
}
