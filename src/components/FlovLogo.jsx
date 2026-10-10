import React from 'react';

/**
 * Official FLOV Brand Logo & Icon Component
 * Based on FLOV brand guidelines: Organic flowing "f" wave mark representing uninterrupted workflow + geometric lowercase "lov".
 */
export const FlovLogoIcon = ({ size = 32, color = 'currentColor', style = {} }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', ...style }}
    >
      {/* Flowing 'f' wave mark stroke */}
      <path
        d="M 14 72 C 22 72 32 38 48 38 C 62 38 68 58 78 58 L 78 24 C 78 18 84 14 90 14 H 96"
        stroke={color}
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const FlovAppIcon = ({ size = 40, bg = '#FFFFFF', iconColor = '#0F172A', style = {} }) => {
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
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        flexShrink: 0,
        ...style
      }}
    >
      <FlovLogoIcon size={Math.round(size * 0.58)} color={iconColor} />
    </div>
  );
};

export const FlovWordmark = ({ height = 28, color = 'currentColor', style = {} }) => {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', height: `${height}px`, ...style }}>
      {/* Flowing 'f' icon */}
      <svg 
        height={height} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', height: '100%', width: 'auto' }}
      >
        <path
          d="M 14 72 C 22 72 32 38 48 38 C 62 38 68 58 78 58 L 78 24 C 78 18 84 14 90 14 H 96"
          stroke={color}
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {/* Geometric 'lov' text */}
      <span style={{ 
        fontFamily: "'Inter', sans-serif", 
        fontWeight: 700, 
        fontSize: `${height * 0.95}px`, 
        letterSpacing: '-0.05em',
        lineHeight: 1,
        color: color,
        marginLeft: '-2px'
      }}>
        lov
      </span>
    </div>
  );
};
