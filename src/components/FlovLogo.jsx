import React from 'react';

/**
 * Official FLOW Brand Logo & Icon Component
 * Based on FLOW brand guidelines: Dual diagonal flowing leaf/workspace marks representing Flow + Workspace + Progress.
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
      {/* Lower-left diagonal flow mark */}
      <path
        d="M 16 76 C 13 60 24 45 48 44 C 49 60 38 75 16 76 Z"
        fill={color}
      />
      {/* Upper-right diagonal flow mark */}
      <path
        d="M 52 40 C 49 24 60 9 84 8 C 85 24 74 39 52 40 Z"
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
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem', height: `${height}px`, ...style }}>
      {/* Dual Flow Marks */}
      <FlovLogoIcon size={height} color={color} />
      {/* Geometric 'FLOW' Uppercase Wordmark */}
      <span style={{ 
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", 
        fontWeight: 700, 
        fontSize: `${height * 0.78}px`, 
        letterSpacing: '0.22em',
        lineHeight: 1,
        color: color,
        textTransform: 'uppercase'
      }}>
        FLOW
      </span>
    </div>
  );
};
