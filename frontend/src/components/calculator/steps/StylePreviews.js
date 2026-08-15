import React from 'react';

// Small flat-style "elevation sketch" illustrations, one per architectural
// style, used as hover/selected previews in DesignQualityStep. Hand-drawn
// SVG (no stock photos) so the app stays fast, license-free, and visually
// consistent with the rest of the calculator's illustrations.

const GREEN = '#123524';
const GREEN_MID = '#1f5c3d';
const GREEN_LIGHT = '#cfe4d8';
const GOLD = '#c8983f';
const GOLD_DARK = '#a67a2e';
const GOLD_LIGHT = '#f0deb3';
const CREAM = '#f5f8f6';
const INK = '#0f1e17';

function Scene({ children }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 240 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="150" fill={CREAM} />
      <rect x="0" y="122" width="240" height="28" fill={GREEN_LIGHT} opacity="0.55" />
      {children}
    </svg>
  );
}

export function RanchPreview() {
  return (
    <Scene>
      <rect x="35" y="90" width="170" height="34" fill="#ffffff" stroke={INK} strokeWidth="2" />
      <path d="M25 90 120 65 215 90Z" fill={GREEN_MID} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <rect x="55" y="98" width="20" height="16" fill={GREEN_LIGHT} stroke={INK} strokeWidth="1.5" />
      <rect x="110" y="98" width="20" height="26" fill={GOLD} stroke={INK} strokeWidth="1.5" />
      <rect x="165" y="98" width="20" height="16" fill={GREEN_LIGHT} stroke={INK} strokeWidth="1.5" />
    </Scene>
  );
}

export function CapeCodPreview() {
  return (
    <Scene>
      <rect x="70" y="85" width="100" height="39" fill="#ffffff" stroke={INK} strokeWidth="2" />
      <path d="M62 88 120 42 178 88Z" fill={GREEN_MID} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <path d="M104 60 120 48 136 60 130 70 110 70Z" fill={GOLD_LIGHT} stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="112" y="100" width="16" height="24" fill={GOLD_DARK} stroke={INK} strokeWidth="1.5" />
      <rect x="82" y="98" width="16" height="16" fill={GREEN_LIGHT} stroke={INK} strokeWidth="1.5" />
      <rect x="142" y="98" width="16" height="16" fill={GREEN_LIGHT} stroke={INK} strokeWidth="1.5" />
    </Scene>
  );
}

export function ColonialPreview() {
  return (
    <Scene>
      <rect x="55" y="55" width="130" height="69" fill="#ffffff" stroke={INK} strokeWidth="2" />
      <path d="M48 58 120 32 192 58Z" fill={GREEN_MID} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <rect x="181" y="40" width="8" height="22" fill={GREEN} stroke={INK} strokeWidth="1.5" />
      {[70, 96, 144, 170].map((x) => <rect key={x + 'a'} x={x} y="64" width="14" height="14" fill={GREEN_LIGHT} stroke={INK} strokeWidth="1.3" />)}
      {[70, 96, 144, 170].map((x) => <rect key={x + 'b'} x={x} y="88" width="14" height="14" fill={GREEN_LIGHT} stroke={INK} strokeWidth="1.3" />)}
      <rect x="112" y="98" width="16" height="26" fill={GOLD} stroke={INK} strokeWidth="1.5" />
      <path d="M104 98h32v-6a16 16 0 0 0-32 0Z" fill="none" stroke={GOLD_DARK} strokeWidth="2" />
    </Scene>
  );
}

export function CraftsmanPreview() {
  return (
    <Scene>
      <rect x="40" y="88" width="160" height="36" fill="#ffffff" stroke={INK} strokeWidth="2" />
      <path d="M28 90 120 60 212 90Z" fill={GREEN_MID} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      {[35, 44, 53, 187, 196, 205].map((x) => <line key={x} x1={x} y1="88" x2={x} y2="82" stroke={INK} strokeWidth="1.5" />)}
      <rect x="60" y="100" width="60" height="24" fill={GOLD_LIGHT} opacity="0.5" stroke={INK} strokeWidth="1.5" />
      <path d="M66 124v-18l6-6h42l6 6v18" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="square" />
      <rect x="150" y="98" width="30" height="18" fill={GREEN_LIGHT} stroke={INK} strokeWidth="1.5" />
    </Scene>
  );
}

export function FarmhousePreview() {
  return (
    <Scene>
      <rect x="55" y="80" width="130" height="44" fill="#ffffff" stroke={INK} strokeWidth="2" />
      {[65, 78, 91, 104, 117, 130, 143, 156, 169].map((x) => <line key={x} x1={x} y1="82" x2={x} y2="122" stroke={GREEN_LIGHT} strokeWidth="2" />)}
      <path d="M48 82 120 48 192 82Z" fill={INK} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <rect x="100" y="96" width="40" height="28" fill={GOLD_LIGHT} stroke={INK} strokeWidth="1.8" />
      <line x1="120" y1="96" x2="120" y2="124" stroke={INK} strokeWidth="1.5" />
      <line x1="100" y1="110" x2="140" y2="110" stroke={INK} strokeWidth="1.5" />
      <rect x="60" y="98" width="18" height="18" fill={GREEN_LIGHT} stroke={INK} strokeWidth="1.5" />
      <rect x="162" y="98" width="18" height="18" fill={GREEN_LIGHT} stroke={INK} strokeWidth="1.5" />
    </Scene>
  );
}

export function ContemporaryPreview() {
  return (
    <Scene>
      <rect x="45" y="70" width="90" height="54" fill="#ffffff" stroke={INK} strokeWidth="2" />
      <rect x="135" y="94" width="65" height="30" fill={GREEN_LIGHT} stroke={INK} strokeWidth="2" />
      <rect x="40" y="63" width="100" height="8" fill={GREEN} stroke={INK} strokeWidth="1.5" />
      <rect x="130" y="88" width="75" height="7" fill={GOLD_DARK} stroke={INK} strokeWidth="1.5" />
      <rect x="55" y="82" width="70" height="30" fill={GOLD_LIGHT} opacity="0.6" stroke={INK} strokeWidth="1.8" />
      <line x1="90" y1="82" x2="90" y2="112" stroke={INK} strokeWidth="1.2" />
      <rect x="148" y="102" width="40" height="22" fill="#ffffff" opacity="0.7" stroke={INK} strokeWidth="1.5" />
    </Scene>
  );
}

export function MediterraneanPreview() {
  return (
    <Scene>
      <rect x="50" y="78" width="140" height="46" fill={GOLD_LIGHT} opacity="0.55" stroke={INK} strokeWidth="2" />
      <path d="M42 80 120 55 198 80Z" fill={GOLD} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      {[52, 68, 84, 100, 116, 132, 148, 164, 180].map((x) => <line key={x} x1={x} y1="76" x2={x - 4} y2="82" stroke={GOLD_DARK} strokeWidth="2" />)}
      <path d="M104 124v-20a16 16 0 0 1 32 0v20Z" fill={CREAM} stroke={INK} strokeWidth="2" />
      <path d="M64 112v-10a10 10 0 0 1 20 0v10Z" fill={GREEN_LIGHT} stroke={INK} strokeWidth="1.5" />
      <path d="M156 112v-10a10 10 0 0 1 20 0v10Z" fill={GREEN_LIGHT} stroke={INK} strokeWidth="1.5" />
    </Scene>
  );
}

export function CustomArchitecturalPreview() {
  return (
    <Scene>
      <rect x="50" y="92" width="70" height="32" fill="#ffffff" stroke={INK} strokeWidth="2" />
      <rect x="112" y="66" width="85" height="58" fill={GREEN_LIGHT} stroke={INK} strokeWidth="2" />
      <path d="M44 92 88 58 128 92Z" fill={GREEN_MID} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <path d="M112 66 150 40 205 58 197 66Z" fill={GOLD} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <rect x="128" y="80" width="55" height="26" fill={CREAM} opacity="0.85" stroke={INK} strokeWidth="1.6" />
      <rect x="62" y="100" width="18" height="24" fill={GOLD_DARK} stroke={INK} strokeWidth="1.5" />
    </Scene>
  );
}

export const STYLE_PREVIEWS = {
  ranch: RanchPreview,
  cape_cod: CapeCodPreview,
  colonial: ColonialPreview,
  craftsman: CraftsmanPreview,
  farmhouse: FarmhousePreview,
  contemporary: ContemporaryPreview,
  mediterranean: MediterraneanPreview,
  custom_architect: CustomArchitecturalPreview,
};
