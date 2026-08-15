// HomeCostCal — Core new-construction cost calculation engine

const {
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
} = require('../config/defaults');

function round(n) { return Math.round(n); }
function addCosts(a, b) { return { low: a.low + b.low, high: a.high + b.high }; }
function scale(cost, factor) { return { low: cost.low * factor, high: cost.high * factor }; }

function resolveLocationMultiplier(state, city) {
  const stateMult = STATE_MULTIPLIERS[state] || 1.0;
  const cityKey = (city || '').trim().toLowerCase();
  const metroMult = METRO_MULTIPLIERS[cityKey];
  if (!metroMult) return { multiplier: stateMult, source: 'state' };
  // Blend metro and state so one unusual metro entry doesn't overwhelm the state figure
  return { multiplier: (metroMult * 0.7) + (stateMult * 0.3), source: 'metro' };
}

function calculateBuildCost(input) {
  const {
    state,
    city = null,
    homeType = 'single_family',
    squareFootage,
    stories = '2',
    bedrooms = 3,
    fullBathrooms = 2,
    halfBathrooms = 0,
    designStyle = 'craftsman',
    qualityTier = 'standard',
    foundationType = 'slab',
    garage = 'attached_2car',
    furnishing = 'unfurnished',
    siteWork = 'moderate',
    extraFeatures = [],
    neighborhoodTier = 'established',
  } = input;

  if (!state || !STATE_MULTIPLIERS[state]) throw new Error('A valid state is required.');
  const sqft = Number(squareFootage);
  if (!sqft || sqft < 300 || sqft > 25000) throw new Error('Square footage must be between 300 and 25,000.');

  const breakdown = [];

  const { multiplier: locationMult, source: locationSource } = resolveLocationMultiplier(state, city);
  const qualityCost = QUALITY_TIER_COST_PER_SQFT[qualityTier] || QUALITY_TIER_COST_PER_SQFT.standard;
  const homeTypeMult = (HOME_TYPE_MULTIPLIERS[homeType] || HOME_TYPE_MULTIPLIERS.single_family).mult;
  const designMult = (DESIGN_STYLE_MULTIPLIERS[designStyle] || DESIGN_STYLE_MULTIPLIERS.craftsman).mult;
  const storyMult = STORY_MULTIPLIERS[String(stories)] || STORY_MULTIPLIERS['2'];

  const combinedMult = homeTypeMult * designMult * storyMult * locationMult;
  let core = scale(qualityCost, sqft * combinedMult);
  breakdown.push({
    label: `Core construction — ${sqft.toLocaleString()} sqft, ${(QUALITY_TIER_COST_PER_SQFT[qualityTier] || QUALITY_TIER_COST_PER_SQFT.standard).label} finish`,
    low: round(core.low), high: round(core.high),
  });
  let total = { ...core };

  // Foundation — priced per sqft of footprint, not total floor area
  const storyDivisor = stories === '1' ? 1 : stories === '1.5' ? 1.4 : stories === '2' ? 2 : 3;
  const footprint = sqft / storyDivisor;
  const foundation = FOUNDATION_COST_PER_SQFT[foundationType] || FOUNDATION_COST_PER_SQFT.slab;
  if (foundation.high > 0) {
    const f = scale(foundation, footprint);
    breakdown.push({ label: `Foundation — ${foundation.label}`, low: round(f.low), high: round(f.high) });
    total = addCosts(total, f);
  }

  // Garage
  const garageCost = GARAGE_COSTS[garage] || GARAGE_COSTS.none;
  if (garageCost.high > 0) {
    const g = scale(garageCost, locationMult);
    breakdown.push({ label: garageCost.label, low: round(g.low), high: round(g.high) });
    total = addCosts(total, g);
  }

  // Extra bathrooms beyond the included baseline
  const fullBaths = Number(fullBathrooms) || 0;
  const halfBaths = Number(halfBathrooms) || 0;
  const extraFull = Math.max(0, fullBaths - BATHROOM_INCLUDED);
  if (extraFull > 0) {
    const b = scale(EXTRA_FULL_BATH_COST, extraFull * locationMult);
    breakdown.push({ label: `${extraFull} Additional Full Bathroom${extraFull > 1 ? 's' : ''}`, low: round(b.low), high: round(b.high) });
    total = addCosts(total, b);
  }
  if (halfBaths > 0) {
    const b = scale(EXTRA_HALF_BATH_COST, halfBaths * locationMult);
    breakdown.push({ label: `${halfBaths} Half Bathroom${halfBaths > 1 ? 's' : ''}`, low: round(b.low), high: round(b.high) });
    total = addCosts(total, b);
  }

  // Furnishing
  const furnish = FURNISHING_COST_PER_SQFT[furnishing] || FURNISHING_COST_PER_SQFT.unfurnished;
  if (furnish.high > 0) {
    const f = scale(furnish, sqft);
    breakdown.push({ label: furnish.label, low: round(f.low), high: round(f.high) });
    total = addCosts(total, f);
  }

  // Site work
  const site = SITE_WORK_COSTS[siteWork] || SITE_WORK_COSTS.moderate;
  const s = scale(site, locationMult);
  breakdown.push({ label: `Site Work — ${site.label}`, low: round(s.low), high: round(s.high) });
  total = addCosts(total, s);

  // Extra features
  const featureList = Array.isArray(extraFeatures) ? extraFeatures : [];
  for (const key of featureList) {
    const feature = EXTRA_FEATURES[key];
    if (!feature) continue;
    const f = scale(feature, locationMult);
    breakdown.push({ label: feature.label, low: round(f.low), high: round(f.high) });
    total = addCosts(total, f);
  }

  const constructionLow = round(total.low);
  const constructionHigh = round(total.high);

  // Land / lot estimate — expressed as a % of total project value (construction + land)
  // solved from: land = pct * (construction + land)  =>  land = construction * pct / (1 - pct)
  const tier = NEIGHBORHOOD_TIERS[neighborhoodTier] || NEIGHBORHOOD_TIERS.established;
  const landLow = round(constructionLow * tier.landPctLow / (1 - tier.landPctLow));
  const landHigh = round(constructionHigh * tier.landPctHigh / (1 - tier.landPctHigh));

  const totalLow = constructionLow + landLow;
  const totalHigh = constructionHigh + landHigh;

  return {
    state,
    stateName: STATE_NAMES[state] || state,
    city,
    locationMultiplier: Math.round(locationMult * 100) / 100,
    locationSource,
    squareFootage: sqft,
    costPerSqftLow: Math.round((constructionLow / sqft) * 100) / 100,
    costPerSqftHigh: Math.round((constructionHigh / sqft) * 100) / 100,
    breakdown,
    constructionLow,
    constructionHigh,
    landLow,
    landHigh,
    neighborhoodTier,
    neighborhoodLabel: tier.label,
    totalLow,
    totalHigh,
    bedrooms: Number(bedrooms) || null,
    fullBathrooms: fullBaths,
    halfBathrooms: halfBaths,
    qualityTierLabel: qualityCost.label,
    designStyleLabel: (DESIGN_STYLE_MULTIPLIERS[designStyle] || {}).label,
    homeTypeLabel: (HOME_TYPE_MULTIPLIERS[homeType] || {}).label,
  };
}

module.exports = { calculateBuildCost, resolveLocationMultiplier };
