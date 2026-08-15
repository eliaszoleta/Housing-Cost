export const FAQS = [
  {
    q: 'How accurate is this home cost calculator?',
    a: 'It gives you a realistic planning range, not a contractor quote. Estimates are built from published national construction-cost data (NAHB, Census Bureau, HomeAdvisor/Angi, RSMeans) adjusted for your state, and — when you enter an address — real-time proximity data from OpenStreetMap. Actual costs depend on your specific lot, local permitting, contractor bids, and material choices, so always get itemized quotes from licensed local builders before finalizing a budget.',
  },
  {
    q: 'Does this estimate include the cost of the land?',
    a: "Yes, as a separate line. Because land prices vary enormously and precise comps require paid MLS data, we estimate land/lot cost as a percentage of total project value based on your chosen neighborhood tier — a standard real-estate budgeting approach. We show it separately from construction cost so you can see exactly what's driving your number.",
  },
  {
    q: 'What is included in the "core construction" cost?',
    a: 'Core construction covers the structural shell, framing, roofing, exterior finishes, standard electrical/plumbing/HVAC, and interior finishes matching your selected quality tier. Foundation type, garage, extra bathrooms, furnishing, site work, and add-on features are priced separately so you can see the full breakdown.',
  },
  {
    q: 'How do you calculate the neighborhood / location data?',
    a: "When you enter an address, we geocode it with OpenStreetMap and query nearby schools, grocery stores, hospitals, parks, and restaurants within about 2 miles using the OpenStreetMap Overpass API — real, live public map data. We turn that into a transparent 0-100 convenience score and suggest a neighborhood tier, which you can always override.",
  },
  {
    q: 'Why does the same house cost more in one state than another?',
    a: "Construction labor rates, material freight costs, permitting fees, and general cost of living all vary by state — sometimes by 60% or more between the cheapest and most expensive states. We apply a state cost multiplier (and a metro-area adjustment for major cities) derived from regional labor and cost-of-living data.",
  },
  {
    q: 'Is furnished pricing for buying furniture, or something else?',
    a: 'It\'s a turnkey furnishing package some new-construction buyers add — furniture, window treatments, and basic decor delivered before move-in. Selecting "Unfurnished" gives you the shell home with standard fixtures and appliances only.',
  },
];
