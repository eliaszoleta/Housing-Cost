// HomeCostCal — Default new-construction pricing data
//
// DATA SOURCES (national averages, informational estimates only — not a quote):
//   - NAHB "Cost of Constructing a Home" survey (National Association of Home Builders)
//   - U.S. Census Bureau Survey of Construction (SOCDS) — average price/sqft of new single-family homes
//   - HomeAdvisor / Angi / Fixr 2025 cost guides — aggregated contractor-reported ranges
//   - RSMeans regional construction cost data (residential)
//   - Bureau of Labor Statistics regional construction wage indices (used to derive state multipliers)
// Updated: 2026. Real project costs vary by contractor, lot conditions, and material choices —
// always get itemized bids from licensed local builders before budgeting a real project.

// ─────────────────────────────────────────────────────────────────────────────
// STATE COST MULTIPLIERS
// National baseline = 1.00 (Midwest states: OH, IN, MO, KS)
// Reflects labor cost (BLS), material freight, permitting, and local cost of living.
// ─────────────────────────────────────────────────────────────────────────────
const STATE_MULTIPLIERS = {
  AL: 0.83, AK: 1.55, AZ: 1.04, AR: 0.81, CA: 1.62, CO: 1.18, CT: 1.34,
  DE: 1.14, DC: 1.58, FL: 1.08, GA: 0.93, HI: 1.85, ID: 0.97, IL: 1.16,
  IN: 0.92, IA: 0.89, KS: 0.88, KY: 0.84, LA: 0.87, ME: 1.08, MD: 1.24,
  MA: 1.46, MI: 0.99, MN: 1.11, MS: 0.79, MO: 0.90, MT: 1.02, NE: 0.91,
  NV: 1.12, NH: 1.20, NJ: 1.38, NM: 0.90, NY: 1.52, NC: 0.94, ND: 0.96,
  OH: 0.95, OK: 0.84, OR: 1.22, PA: 1.09, RI: 1.24, SC: 0.89, SD: 0.89,
  TN: 0.89, TX: 1.02, UT: 1.06, VT: 1.15, VA: 1.11, WA: 1.32, WV: 0.81,
  WI: 1.00, WY: 0.99,
};

const STATE_NAMES = {
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

// A handful of major metros priced meaningfully above/below their state average.
// Matched against the geocoded city name (lowercased) when an address is provided.
// This layers on TOP of the state multiplier (both are averaged, not stacked twice).
const METRO_MULTIPLIERS = {
  'new york': 1.65, 'brooklyn': 1.55, 'manhattan': 1.85, 'san francisco': 1.80,
  'san jose': 1.72, 'oakland': 1.55, 'los angeles': 1.55, 'san diego': 1.45,
  'seattle': 1.40, 'boston': 1.48, 'washington': 1.50, 'honolulu': 1.90,
  'miami': 1.20, 'austin': 1.05, 'denver': 1.22, 'chicago': 1.18,
  'portland': 1.28, 'nashville': 0.98, 'atlanta': 0.98, 'dallas': 1.02,
  'houston': 0.98, 'phoenix': 1.06, 'las vegas': 1.10, 'minneapolis': 1.12,
  'detroit': 0.92, 'philadelphia': 1.12, 'charlotte': 0.95, 'columbus': 0.92,
};

// ─────────────────────────────────────────────────────────────────────────────
// BASE CONSTRUCTION COST — $/sqft by quality tier (national average, before
// state/metro multiplier). Single-family, standard rectangular footprint.
// ─────────────────────────────────────────────────────────────────────────────
const QUALITY_TIER_COST_PER_SQFT = {
  builder_grade: { low: 105, high: 145, label: 'Builder Grade', description: 'Production-builder finishes: laminate counters, builder-grade fixtures, vinyl/carpet flooring.' },
  standard:      { low: 145, high: 195, label: 'Standard', description: 'Mid-range finishes: quartz or granite counters, engineered wood/tile flooring, name-brand fixtures.' },
  premium:       { low: 195, high: 265, label: 'Premium', description: 'Upgraded finishes throughout: solid hardwood, high-end tile, custom cabinetry, premium appliances.' },
  luxury:        { low: 265, high: 385, label: 'Luxury', description: 'High-end custom finishes: designer fixtures, imported stone, smart-home wiring, architectural detailing.' },
  ultra_luxury:  { low: 385, high: 650, label: 'Ultra-Luxury / Custom', description: 'Fully bespoke construction: rare materials, structural custom architecture, top-tier everything.' },
};

// ─────────────────────────────────────────────────────────────────────────────
// HOME TYPE MULTIPLIER — applied to the quality-tier $/sqft
// ─────────────────────────────────────────────────────────────────────────────
const HOME_TYPE_MULTIPLIERS = {
  single_family: { mult: 1.00, label: 'Single-Family Home' },
  townhouse:     { mult: 0.91, label: 'Townhouse' },
  duplex:        { mult: 0.87, label: 'Duplex / Multi-Family (2–4 unit)' },
  modular:       { mult: 0.80, label: 'Modular / Prefab' },
  tiny_home:     { mult: 1.18, label: 'Tiny Home (<600 sqft)' },
};

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN STYLE MULTIPLIER — roofline & architectural complexity
// ─────────────────────────────────────────────────────────────────────────────
const DESIGN_STYLE_MULTIPLIERS = {
  ranch:            { mult: 0.96, label: 'Ranch' },
  cape_cod:         { mult: 1.00, label: 'Cape Cod' },
  colonial:         { mult: 1.05, label: 'Colonial' },
  craftsman:        { mult: 1.06, label: 'Craftsman' },
  farmhouse:        { mult: 1.08, label: 'Modern Farmhouse' },
  contemporary:     { mult: 1.11, label: 'Contemporary' },
  mediterranean:    { mult: 1.16, label: 'Mediterranean' },
  custom_architect: { mult: 1.32, label: 'Custom Architectural' },
};

// ─────────────────────────────────────────────────────────────────────────────
// STORIES MULTIPLIER — a taller footprint shares one foundation & one roof
// across more floor area, so cost per sqft actually drops slightly with height.
// ─────────────────────────────────────────────────────────────────────────────
const STORY_MULTIPLIERS = {
  '1':    1.06,
  '1.5':  1.02,
  '2':    1.00,
  '3+':   0.98,
};

// ─────────────────────────────────────────────────────────────────────────────
// FOUNDATION — flat add-on per sqft of home footprint (footprint ≈ sqft / stories)
// ─────────────────────────────────────────────────────────────────────────────
const FOUNDATION_COST_PER_SQFT = {
  slab:                { low: 0,  high: 0,  label: 'Slab-on-Grade' },
  crawl_space:         { low: 6,  high: 10, label: 'Crawl Space' },
  basement_unfinished: { low: 20, high: 32, label: 'Unfinished Basement' },
  basement_finished:   { low: 38, high: 58, label: 'Finished Basement' },
  walkout_basement:    { low: 48, high: 70, label: 'Walkout Basement' },
};

// ─────────────────────────────────────────────────────────────────────────────
// GARAGE — flat add-on
// ─────────────────────────────────────────────────────────────────────────────
const GARAGE_COSTS = {
  none:            { low: 0,     high: 0,     label: 'No Garage' },
  attached_1car:   { low: 18000, high: 28000, label: 'Attached 1-Car' },
  attached_2car:   { low: 32000, high: 48000, label: 'Attached 2-Car' },
  attached_3car:   { low: 46000, high: 68000, label: 'Attached 3-Car' },
  detached_2car:   { low: 38000, high: 58000, label: 'Detached 2-Car' },
};

// ─────────────────────────────────────────────────────────────────────────────
// BATHROOMS — the first two full baths are considered part of the base sqft
// cost; each additional full/half bath is a discrete plumbing/fixture cost.
// ─────────────────────────────────────────────────────────────────────────────
const BATHROOM_INCLUDED = 2;
const EXTRA_FULL_BATH_COST  = { low: 12000, high: 24000 };
const EXTRA_HALF_BATH_COST  = { low: 6000,  high: 11000 };

// ─────────────────────────────────────────────────────────────────────────────
// FURNISHING PACKAGE
// ─────────────────────────────────────────────────────────────────────────────
const FURNISHING_COST_PER_SQFT = {
  unfurnished:       { low: 0,    high: 0,    label: 'Unfurnished (Move-In Shell)' },
  furnished_basic:   { low: 12,   high: 22,   label: 'Furnished — Essentials Package' },
  furnished_premium: { low: 28,   high: 55,   label: 'Furnished — Designer Turnkey' },
};

// ─────────────────────────────────────────────────────────────────────────────
// SITE WORK / LOT PREP — grading, utility hookups, excavation (not land purchase)
// ─────────────────────────────────────────────────────────────────────────────
const SITE_WORK_COSTS = {
  easy:     { low: 8000,  high: 16000, label: 'Flat, Cleared Lot' },
  moderate: { low: 16000, high: 36000, label: 'Some Grading / Trees / Utility Distance' },
  difficult:{ low: 36000, high: 85000, label: 'Sloped, Wooded, or Remote Lot' },
};

// ─────────────────────────────────────────────────────────────────────────────
// EXTRA FEATURES — flat add-ons, multi-select
// ─────────────────────────────────────────────────────────────────────────────
const EXTRA_FEATURES = {
  pool:               { low: 45000, high: 100000, label: 'In-Ground Pool' },
  deck_patio:         { low: 8000,  high: 25000,  label: 'Deck / Patio' },
  smart_home:         { low: 5000,  high: 15000,  label: 'Smart Home Package' },
  outdoor_kitchen:     { low: 15000, high: 40000,  label: 'Outdoor Kitchen' },
  in_law_suite:        { low: 40000, high: 90000,  label: 'In-Law Suite / ADU' },
  gourmet_kitchen:     { low: 20000, high: 60000,  label: 'Gourmet Kitchen Upgrade' },
  solar_ready:         { low: 2000,  high: 5000,   label: 'Solar-Ready Wiring & Roof Prep' },
  net_zero_efficiency: { low: 25000, high: 60000,  label: 'Net-Zero / High-Efficiency Package' },
};

// ─────────────────────────────────────────────────────────────────────────────
// NEIGHBORHOOD / LAND TIER
// Land is priced as a % of total project value — a standard real-estate rule
// of thumb — since raw land comps require paid MLS data we don't have access
// to for free. Ranges widen for more desirable tiers because land value is the
// most locally variable input in any home budget.
// ─────────────────────────────────────────────────────────────────────────────
const NEIGHBORHOOD_TIERS = {
  developing: { landPctLow: 0.10, landPctHigh: 0.18, label: 'Developing Area', description: 'Growing area, fewer nearby amenities.' },
  established:{ landPctLow: 0.16, landPctHigh: 0.26, label: 'Established Suburb', description: 'Settled neighborhood with everyday conveniences nearby.' },
  desirable:  { landPctLow: 0.22, landPctHigh: 0.35, label: 'Desirable Area', description: 'Sought-after school zone, walkable to amenities.' },
  premium:    { landPctLow: 0.30, landPctHigh: 0.45, label: 'Premium Location', description: 'Top-rated schools, high demand, strong amenity access.' },
  luxury_enclave: { landPctLow: 0.38, landPctHigh: 0.60, label: 'Luxury Enclave', description: 'Exclusive area, waterfront/view lots, minimal buildable land.' },
};

module.exports = {
  STATE_MULTIPLIERS,
  STATE_NAMES,
  METRO_MULTIPLIERS,
  QUALITY_TIER_COST_PER_SQFT,
  HOME_TYPE_MULTIPLIERS,
  DESIGN_STYLE_MULTIPLIERS,
  STORY_MULTIPLIERS,
  FOUNDATION_COST_PER_SQFT,
  GARAGE_COSTS,
  BATHROOM_INCLUDED,
  EXTRA_FULL_BATH_COST,
  EXTRA_HALF_BATH_COST,
  FURNISHING_COST_PER_SQFT,
  SITE_WORK_COSTS,
  EXTRA_FEATURES,
  NEIGHBORHOOD_TIERS,
};
