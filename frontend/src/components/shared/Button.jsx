import React from 'react';

/**
 * Reusable Button Component for VITAARA
 * Supports primary emerald styling, subtle hover elevations, and accessible states.
 */
export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  id,
  ...props
}) {
  const baseClasses = 'btn-base';
  const variantClass = variant === 'primary' ? 'btn-primary-cta' : `btn-${variant}`;
  const sizeClass = size === 'lg' ? 'btn-lg' : 'btn-md';

  return (
    <button
      id={id}
      type={type}
      className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`.trim()}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="btn-loading-text">Processing...</span>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="btn-icon-left" size={18} />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="btn-icon-right" size={20} />}
        </>
      )}
    </button>
  );
}
