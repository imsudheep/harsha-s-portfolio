import React from 'react';

/**
 * Official FLOV Brand Logo & Icon Component
 * Based on exact FLOV geometric brand guidelines & logo grid.
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
      {/* Exact flowing 'f' wave mark matching app icon */}
      <path
        d="M 18 78 V 64 C 18 46 32 36 48 36 C 64 36 68 50 78 50 V 22 C 78 16 84 12 90 12 H 98"
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
        flexShrink: 0,
        ...style
      }}
    >
      <FlovLogoIcon size={Math.round(size * 0.58)} color={iconColor} />
    </div>
  );
};

export const FlovWordmark = ({ height = 28, color = 'currentColor', style = {} }) => {
  const width = Math.round(height * 3.35);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 240 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', ...style }}
    >
      {/* 1. Geometric Flowing 'f' */}
      <path
        d="M 16 58 V 46 C 16 32 28 24 40 24 C 54 24 58 36 68 36 V 16 C 68 12 72 8 78 8 H 86"
        stroke={color}
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 2. Geometric 'l' */}
      <line
        x1="106"
        y1="8"
        x2="106"
        y2="58"
        stroke={color}
        strokeWidth="11"
        strokeLinecap="round"
      />

      {/* 3. Geometric 'o' */}
      <circle
        cx="150"
        cy="33"
        r="20"
        stroke={color}
        strokeWidth="11"
      />

      {/* 4. Geometric 'v' */}
      <path
        d="M 190 10 L 208 56 L 226 10"
        stroke={color}
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
