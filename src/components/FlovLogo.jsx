import React from 'react';

/**
 * Official FLOV Brand Logo & Icon Component
 * Based on the official FLOV brand specification:
 * - Mark: 'f' Initial + Infinity Flow Ribbon ('f' + '∞' = Final Mark).
 * - Wordmark: Geometric lowercase "flov".
 * - Brand Colors: Primary Electric Lime #DFFF3A, Background #0F0F0F, Surface #FAFAF7, Secondary #D9D6CF.
 */
export const FlovLogoIcon = ({ size = 32, color = 'currentColor', style = {} }) => {
  return (
    <svg 
      width={size} 
      height={Math.round(size * 0.67)} 
      viewBox="0 0 102 68" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', flexShrink: 0, ...style }}
    >
      <path
        d="M 85 37 C 71 37 59 34 49 29 C 38 23 25 22 16 27 C 7 32 4 41 6 50 C 8 59 18 64 28 63 C 42 62 55 52 65 37 L 75 20 C 81 13 87 12 94 14"
        stroke={color}
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const FlovAppIcon = ({ size = 40, bg = '#DFFF3A', iconColor = '#0F0F0F', style = {} }) => {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: `${Math.round(size * 0.28)}px`,
        backgroundColor: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        flexShrink: 0,
        ...style
      }}
    >
      <FlovLogoIcon size={Math.round(size * 0.62)} color={iconColor} />
    </div>
  );
};

export const FlovWordmark = ({ height = 26, color = 'currentColor', style = {} }) => {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem', height: `${height}px`, ...style }}>
      {/* Official FLOV Flow Mark */}
      <FlovLogoIcon size={Math.round(height * 1.35)} color={color} />
      {/* Official Geometric Lowercase 'flov' Wordmark */}
      <span style={{ 
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", 
        fontWeight: 700, 
        fontSize: `${Math.round(height * 0.95)}px`, 
        letterSpacing: '-0.04em',
        lineHeight: 1,
        color: color
      }}>
        flov
      </span>
    </div>
  );
};
