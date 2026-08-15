// Mirrors backend/src/config/defaults.js STATE_MULTIPLIERS + STATE_NAMES so the
// state comparison table and SEO state pages can render instantly without a network round-trip.
export const STATE_MULTIPLIERS = {
  AL: 0.83, AK: 1.55, AZ: 1.04, AR: 0.81, CA: 1.62, CO: 1.18, CT: 1.34,
  DE: 1.14, DC: 1.58, FL: 1.08, GA: 0.93, HI: 1.85, ID: 0.97, IL: 1.16,
  IN: 0.92, IA: 0.89, KS: 0.88, KY: 0.84, LA: 0.87, ME: 1.08, MD: 1.24,
  MA: 1.46, MI: 0.99, MN: 1.11, MS: 0.79, MO: 0.90, MT: 1.02, NE: 0.91,
  NV: 1.12, NH: 1.20, NJ: 1.38, NM: 0.90, NY: 1.52, NC: 0.94, ND: 0.96,
  OH: 0.95, OK: 0.84, OR: 1.22, PA: 1.09, RI: 1.24, SC: 0.89, SD: 0.89,
  TN: 0.89, TX: 1.02, UT: 1.06, VT: 1.15, VA: 1.11, WA: 1.32, WV: 0.81,
  WI: 1.00, WY: 0.99,
};

export const STATE_NAMES = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', DC: 'Washington DC',
  FL: 'Florida', GA: 'Georgia', HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois',
  IN: 'Indiana', IA: 'Iowa', KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana',
  ME: 'Maine', MD: 'Maryland', MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota',
  MS: 'Mississippi', MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada',
  NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York',
  NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma',
  OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
  SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont',
  VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
};

// Standard-tier base range: $145-195/sqft national average before state multiplier
export const STANDARD_TIER_BASE = { low: 145, high: 195 };

export const STATE_LIST = Object.keys(STATE_NAMES).map((code) => ({
  code,
  name: STATE_NAMES[code],
  multiplier: STATE_MULTIPLIERS[code],
  costPerSqftLow: Math.round(STANDARD_TIER_BASE.low * STATE_MULTIPLIERS[code]),
  costPerSqftHigh: Math.round(STANDARD_TIER_BASE.high * STATE_MULTIPLIERS[code]),
})).sort((a, b) => a.name.localeCompare(b.name));

export function slugToStateCode(slug) {
  const target = slug.toLowerCase().replace(/-/g, ' ');
  const entry = STATE_LIST.find((s) => s.name.toLowerCase() === target);
  return entry ? entry.code : null;
}

export function stateNameToSlug(name) {
  return name.toLowerCase().replace(/\s+/g, '-');
}
