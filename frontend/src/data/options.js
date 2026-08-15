// Client-side mirror of backend/src/config/defaults.js option labels/descriptions,
// used to render the calculator steps. Pricing itself always comes from the API.

export const HOME_TYPES = [
  { value: 'single_family', label: 'Single-Family Home', description: 'A standalone home on its own lot.' },
  { value: 'townhouse', label: 'Townhouse', description: 'Multi-level, shares one or more walls.' },
  { value: 'duplex', label: 'Duplex / Multi-Family', description: '2–4 unit building.' },
  { value: 'modular', label: 'Modular / Prefab', description: 'Factory-built sections assembled on-site.' },
  { value: 'tiny_home', label: 'Tiny Home', description: 'Under 600 sqft, efficiency-focused.' },
];

export const STORY_OPTIONS = [
  { value: '1', label: '1 Story' },
  { value: '1.5', label: '1.5 Stories' },
  { value: '2', label: '2 Stories' },
  { value: '3+', label: '3+ Stories' },
];

export const DESIGN_STYLES = [
  { value: 'ranch', label: 'Ranch', description: 'Single-level, simple roofline.' },
  { value: 'cape_cod', label: 'Cape Cod', description: 'Steep roof, symmetrical, cozy.' },
  { value: 'colonial', label: 'Colonial', description: 'Classic symmetrical, two-story.' },
  { value: 'craftsman', label: 'Craftsman', description: 'Exposed beams, covered porch.' },
  { value: 'farmhouse', label: 'Modern Farmhouse', description: 'Board-and-batten, metal roof accents.' },
  { value: 'contemporary', label: 'Contemporary', description: 'Clean lines, large windows.' },
  { value: 'mediterranean', label: 'Mediterranean', description: 'Stucco, tile roof, archways.' },
  { value: 'custom_architect', label: 'Custom Architectural', description: 'Fully bespoke design.' },
];

export const QUALITY_TIERS = [
  { value: 'builder_grade', label: 'Builder Grade', description: 'Laminate counters, vinyl/carpet flooring, standard fixtures.' },
  { value: 'standard', label: 'Standard', description: 'Quartz/granite counters, engineered wood or tile, name-brand fixtures.' },
  { value: 'premium', label: 'Premium', description: 'Solid hardwood, upgraded tile, custom cabinetry.' },
  { value: 'luxury', label: 'Luxury', description: 'Designer fixtures, imported stone, smart-home wiring.' },
  { value: 'ultra_luxury', label: 'Ultra-Luxury / Custom', description: 'Fully bespoke materials and craftsmanship.' },
];

export const FOUNDATION_TYPES = [
  { value: 'slab', label: 'Slab-on-Grade' },
  { value: 'crawl_space', label: 'Crawl Space' },
  { value: 'basement_unfinished', label: 'Unfinished Basement' },
  { value: 'basement_finished', label: 'Finished Basement' },
  { value: 'walkout_basement', label: 'Walkout Basement' },
];

export const GARAGE_OPTIONS = [
  { value: 'none', label: 'No Garage' },
  { value: 'attached_1car', label: 'Attached 1-Car' },
  { value: 'attached_2car', label: 'Attached 2-Car' },
  { value: 'attached_3car', label: 'Attached 3-Car' },
  { value: 'detached_2car', label: 'Detached 2-Car' },
];

export const FURNISHING_OPTIONS = [
  { value: 'unfurnished', label: 'Unfurnished', description: 'Move-in-ready shell with standard fixtures.' },
  { value: 'furnished_basic', label: 'Furnished — Essentials', description: 'Functional furniture package included.' },
  { value: 'furnished_premium', label: 'Furnished — Designer Turnkey', description: 'Fully furnished, designer-selected.' },
];

export const SITE_WORK_OPTIONS = [
  { value: 'easy', label: 'Flat, Cleared Lot' },
  { value: 'moderate', label: 'Some Grading / Trees' },
  { value: 'difficult', label: 'Sloped, Wooded, or Remote' },
];

export const EXTRA_FEATURES = [
  { value: 'pool', label: 'In-Ground Pool' },
  { value: 'deck_patio', label: 'Deck / Patio' },
  { value: 'smart_home', label: 'Smart Home Package' },
  { value: 'outdoor_kitchen', label: 'Outdoor Kitchen' },
  { value: 'in_law_suite', label: 'In-Law Suite / ADU' },
  { value: 'gourmet_kitchen', label: 'Gourmet Kitchen Upgrade' },
  { value: 'solar_ready', label: 'Solar-Ready Wiring' },
  { value: 'net_zero_efficiency', label: 'Net-Zero / High-Efficiency Package' },
];

export const NEIGHBORHOOD_TIERS = [
  { value: 'developing', label: 'Developing Area', description: 'Growing area, fewer nearby amenities.' },
  { value: 'established', label: 'Established Suburb', description: 'Settled neighborhood, everyday conveniences nearby.' },
  { value: 'desirable', label: 'Desirable Area', description: 'Sought-after schools, walkable to amenities.' },
  { value: 'premium', label: 'Premium Location', description: 'Top-rated schools, high demand.' },
  { value: 'luxury_enclave', label: 'Luxury Enclave', description: 'Exclusive area, waterfront/view lots.' },
];
