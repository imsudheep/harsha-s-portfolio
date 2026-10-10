import React from 'react';

/**
 * Official FLOV Brand Logo & Icon Component
 * Based on the minimalist "flov" wordmark & flowing wave 'f' logo mark.
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
      {/* Flowing 'f' wave mark icon */}
      <path
        d="M 20 78 C 20 62 30 52 46 42 C 60 32 66 22 66 14 C 66 8 72 4 78 4 H 92 C 96 4 100 8 100 12 C 100 16 96 20 92 20 H 78 C 76 20 74 22 74 24 C 74 34 66 46 50 56 C 36 66 30 74 30 84 V 88 C 30 93 26 96 20 96 C 15 96 10 93 10 88 V 84 C 10 81 14 78 20 78 Z"
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
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
        flexShrink: 0,
        ...style
      }}
    >
      <FlovLogoIcon size={Math.round(size * 0.6)} color={iconColor} />
    </div>
  );
};

export const FlovWordmark = ({ height = 28, color = 'currentColor', style = {} }) => {
  // Proportional width for flov wordmark (approx 3.2x height)
  const width = Math.round(height * 3.2);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 220 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', ...style }}
    >
      {/* 1. Stylized Flowing 'f' */}
      <path
        d="M 12 56 C 12 44 20 36 32 28 C 42 20 48 14 48 8 C 48 4 52 1 56 1 H 72 C 75 1 78 4 78 7 C 78 10 75 13 72 13 H 60 C 58 13 57 14 57 16 C 57 23 51 31 39 39 C 28 47 23 53 23 60 V 62 C 23 66 20 68 16 68 C 12 68 8 66 8 62 V 60 C 8 58 10 56 12 56 Z"
        fill={color}
      />

      {/* 2. Geometric 'l' */}
      <rect x="90" y="2" width="10" height="66" rx="4" fill={color} />

      {/* 3. Geometric 'o' */}
      <circle cx="138" cy="46" r="21" stroke={color} strokeWidth="9.5" fill="none" />

      {/* 4. Geometric 'v' */}
      <path
        d="M 172 26 L 191 65 C 192 67 195 67 196 65 L 215 26 C 217 22 214 18 209 18 C 206 18 204 20 203 22 L 193 47 L 184 22 C 183 20 181 18 178 18 C 173 18 170 22 172 26 Z"
        fill={color}
      />
    </svg>
  );
};
