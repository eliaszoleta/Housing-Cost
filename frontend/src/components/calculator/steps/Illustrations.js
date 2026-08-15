import React from 'react';

// Modern, flat-style SVG illustrations in the app's green/gold palette.
// Kept dependency-free (no image assets) so the app stays fast and self-contained.

const GREEN = '#123524';
const GREEN_MID = '#1f5c3d';
const GREEN_LIGHT = '#cfe4d8';
const GOLD = '#c8983f';
const GOLD_LIGHT = '#f0deb3';
const CREAM = '#f5f8f6';

export function LocationIllustration({ size = 180 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="92" fill={CREAM} />
      <ellipse cx="100" cy="165" rx="55" ry="8" fill={GREEN_LIGHT} />
      <path d="M100 40c-24 0-42 18-42 42 0 32 42 78 42 78s42-46 42-78c0-24-18-42-42-42Z" fill={GREEN_MID} />
      <path d="M100 40c-24 0-42 18-42 42 0 32 42 78 42 78s42-46 42-78c0-24-18-42-42-42Z" stroke={GREEN} strokeWidth="3" />
      <circle cx="100" cy="82" r="20" fill={CREAM} />
      <path d="M100 72l14 10-5 16h-18l-5-16z" fill={GOLD} />
      <circle cx="100" cy="82" r="20" stroke={GREEN} strokeWidth="2.5" fill="none" />
    </svg>
  );
}

export function HouseTypeIllustration({ size = 180 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="92" fill={CREAM} />
      <rect x="40" y="95" width="120" height="65" rx="4" fill="#ffffff" stroke={GREEN} strokeWidth="3" />
      <path d="M32 100 100 50l68 50" stroke={GREEN} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M45 98 100 58l55 40" fill={GREEN_MID} />
      <rect x="90" y="120" width="20" height="40" fill={GOLD} />
      <rect x="55" y="115" width="18" height="18" fill={GREEN_LIGHT} stroke={GREEN} strokeWidth="2" />
      <rect x="127" y="115" width="18" height="18" fill={GREEN_LIGHT} stroke={GREEN} strokeWidth="2" />
      <rect x="94" y="60" width="10" height="18" fill={GREEN} />
    </svg>
  );
}

const GOLD_DARK = '#a67a2e';

export function DesignQualityIllustration({ size = 180 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="92" fill={CREAM} />
      <rect x="55" y="60" width="90" height="90" rx="8" fill="#ffffff" stroke={GREEN} strokeWidth="3" />
      <path d="M55 100h90" stroke={GREEN_LIGHT} strokeWidth="3" />
      <circle cx="75" cy="80" r="8" fill={GOLD_LIGHT} stroke={GOLD} strokeWidth="2.5" />
      <circle cx="100" cy="80" r="8" fill={GREEN_LIGHT} stroke={GREEN_MID} strokeWidth="2.5" />
      <circle cx="125" cy="80" r="8" fill={GOLD} stroke={GOLD_DARK} strokeWidth="2.5" />
      <rect x="68" y="115" width="64" height="10" rx="5" fill={GREEN_LIGHT} />
      <rect x="68" y="132" width="40" height="8" rx="4" fill={GOLD_LIGHT} />
      <path d="M140 55l6 12 13 2-10 9 3 13-12-7-12 7 3-13-10-9 13-2z" fill={GOLD} />
    </svg>
  );
}

export function FeaturesIllustration({ size = 180 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="92" fill={CREAM} />
      <rect x="42" y="70" width="60" height="60" rx="10" fill="#ffffff" stroke={GREEN} strokeWidth="3" />
      <circle cx="72" cy="100" r="16" fill={GREEN_LIGHT} />
      <path d="M64 100l6 6 12-13" stroke={GREEN} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <rect x="112" y="95" width="46" height="46" rx="10" fill={GREEN_MID} />
      <path d="M135 108v20M125 118h20" stroke={CREAM} strokeWidth="4" strokeLinecap="round" />
      <circle cx="150" cy="60" r="18" fill={GOLD_LIGHT} stroke={GOLD} strokeWidth="2.5" />
      <path d="M143 60l5 5 9-10" stroke={GOLD} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function NeighborhoodIllustration({ size = 180 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="92" fill={CREAM} />
      <ellipse cx="100" cy="160" rx="80" ry="8" fill={GREEN_LIGHT} />
      <rect x="30" y="110" width="40" height="50" fill="#ffffff" stroke={GREEN} strokeWidth="2.5" />
      <path d="M25 112 50 90l25 22" fill={GREEN_MID} />
      <rect x="130" y="100" width="45" height="60" fill="#ffffff" stroke={GREEN} strokeWidth="2.5" />
      <path d="M124 102 152 78l28 24" fill={GREEN} />
      <rect x="80" y="85" width="42" height="75" fill={GOLD_LIGHT} stroke={GOLD} strokeWidth="2.5" />
      <path d="M74 87 101 62l28 25" fill={GOLD} />
      <circle cx="101" cy="45" r="6" fill={GOLD} />
      <path d="M101 51v8M96 45h-8M114 45h-8" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function ResultsIllustration({ size = 160 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="92" fill={GREEN} opacity="0.06" />
      <rect x="55" y="50" width="90" height="110" rx="10" fill="#ffffff" stroke={GREEN} strokeWidth="3" />
      <rect x="70" y="70" width="60" height="8" rx="4" fill={GREEN_LIGHT} />
      <rect x="70" y="88" width="40" height="8" rx="4" fill={GREEN_LIGHT} />
      <rect x="70" y="112" width="60" height="30" rx="6" fill={GOLD_LIGHT} stroke={GOLD} strokeWidth="2" />
      <circle cx="150" cy="55" r="24" fill={GOLD} />
      <path d="M141 55l6 6 12-14" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
