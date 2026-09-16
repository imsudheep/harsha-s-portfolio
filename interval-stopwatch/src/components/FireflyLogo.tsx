import React from 'react';

interface FireflyLogoProps {
  className?: string;
  size?: number;
}

export const FireflyLogo: React.FC<FireflyLogoProps> = ({ className = '', size = 38 }) => {
  return (
    <div
      className={`firefly-logo-wrapper ${className}`}
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        filter: 'drop-shadow(0 0 10px rgba(232, 233, 66, 0.7))',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Main Gold Ambient Glow (#E8E942) */}
          <radialGradient id="gold-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E8E942" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#ca8a04" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Liquid Droplets Electric Gold Gradient */}
          <linearGradient id="gold-blob-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#E8E942" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>

          {/* Glass Body Gradient */}
          <linearGradient id="glass-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="30%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="70%" stopColor="#E8E942" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
          </linearGradient>

          {/* Top & Base Dark Metal Cap Gradient */}
          <linearGradient id="cap-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
        </defs>

        {/* Ambient Gold Glow Aura */}
        <ellipse cx="50" cy="50" rx="36" ry="40" fill="url(#gold-glow)" />

        {/* Outer Glass Lava Capsule Contour */}
        <path
          d="M 38 22 C 44 20, 56 20, 62 22 C 65 35, 57 45, 59 55 C 62 65, 66 76, 62 80 C 54 82, 46 82, 38 80 C 34 76, 38 65, 41 55 C 43 45, 35 35, 38 22 Z"
          fill="url(#glass-grad)"
          stroke="#E8E942"
          strokeWidth="1.5"
          strokeOpacity="0.7"
        />

        {/* Floating Lava Liquid Droplets in #E8E942 Electric Gold */}
        <circle cx="50" cy="30" r="3.5" fill="url(#gold-blob-grad)" />
        <circle cx="51" cy="42" r="6" fill="url(#gold-blob-grad)" />

        {/* Merged Fluid Blob */}
        <path
          d="M 46 54 C 43 50, 55 50, 53 55 C 51 60, 56 64, 49 65 C 44 66, 48 57, 46 54 Z"
          fill="url(#gold-blob-grad)"
        />

        <circle cx="49" cy="74" r="4.5" fill="url(#gold-blob-grad)" />

        {/* Top Metallic Cap */}
        <path d="M 40 16 L 60 16 L 63 22 L 37 22 Z" fill="url(#cap-grad)" stroke="#E8E942" strokeWidth="0.8" strokeOpacity="0.5" />

        {/* Bottom Metallic Stand */}
        <path d="M 37 80 L 63 80 L 59 90 L 41 90 Z" fill="url(#cap-grad)" stroke="#E8E942" strokeWidth="0.8" strokeOpacity="0.5" />

        {/* Base Gold Light Reflection Rings */}
        <ellipse cx="50" cy="92" rx="20" ry="3" fill="#E8E942" opacity="0.7" />
        <ellipse cx="50" cy="95" rx="28" ry="4" fill="#ca8a04" opacity="0.4" />
      </svg>
    </div>
  );
};
