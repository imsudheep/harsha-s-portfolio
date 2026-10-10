import React from 'react';

/**
 * Official FLOV Geometric Brand Logo & Icon Component
 * Based on FLOV brand guidelines: Left vertical angled pillar + right upper wedge triangle forming the geometric FLOV mark.
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
      {/* Left Pillar with 45-degree angled top */}
      <polygon
        points="18,80 18,46 42,26 42,80"
        fill={color}
      />
      {/* Right Upper Wedge Triangle */}
      <polygon
        points="50,26 76,26 50,52"
        fill={color}
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
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        flexShrink: 0,
        ...style
      }}
    >
      <FlovLogoIcon size={Math.round(size * 0.58)} color={iconColor} />
    </div>
  );
};

export const FlovWordmark = ({ height = 26, color = 'currentColor', style = {} }) => {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', height: `${height}px`, ...style }}>
      {/* Geometric FLOV Monogram */}
      <FlovLogoIcon size={height} color={color} />
      {/* Geometric 'FLOV' Uppercase Wordmark */}
      <span style={{ 
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", 
        fontWeight: 700, 
        fontSize: `${height * 0.78}px`, 
        letterSpacing: '0.22em',
        lineHeight: 1,
        color: color,
        textTransform: 'uppercase'
      }}>
        FLOV
      </span>
    </div>
  );
};
