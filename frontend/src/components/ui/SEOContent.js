import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEOContent() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'HomeCostCal',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    description: 'Free home construction cost calculator with state-specific pricing and real neighborhood proximity data.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <section style={{ maxWidth: 760, margin: '64px auto', padding: '0 20px', color: 'var(--text-muted)', fontSize: 14.5, lineHeight: 1.8 }}>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)', marginBottom: 14 }}>
        How Much Does It Cost To Build A House?
      </h2>
      <p style={{ marginBottom: 16 }}>
        The average cost to build a new single-family home in the U.S. runs roughly <strong>$145–$195 per square foot</strong> for
        a standard-quality finish, though builder-grade projects can come in near $105/sqft and fully custom luxury homes can
        exceed $400/sqft. The single biggest factors are square footage, finish quality, and location — a 2,400 sqft home built
        to the same spec can cost 60% more in California than in Mississippi purely because of regional labor rates, material
        freight, and permitting costs.
      </p>

      <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 10, marginTop: 24 }}>What drives the price?</h3>
      <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
        <li><strong>Square footage</strong> — the largest single driver; cost scales roughly linearly with size.</li>
        <li><strong>Finish quality</strong> — builder-grade, standard, premium, luxury, and ultra-luxury tiers can differ by 3–4x per square foot.</li>
        <li><strong>Design complexity</strong> — a simple ranch roofline is cheaper to build than a Mediterranean home with archways and a tile roof.</li>
        <li><strong>Foundation type</strong> — a finished walkout basement can add $50,000+ over a slab foundation.</li>
        <li><strong>Location</strong> — state-level labor and material costs, plus metro-area premiums in cities like San Francisco or New York.</li>
        <li><strong>Land & neighborhood</strong> — in many markets the lot itself is 20–40% of total project cost, and varies more than any construction line item.</li>
      </ul>

      <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 10, marginTop: 24 }}>How we calculate your estimate</h3>
      <p style={{ marginBottom: 16 }}>
        We start from published national construction-cost benchmarks (NAHB's Cost of Constructing a Home survey, U.S. Census
        Bureau Survey of Construction data, and HomeAdvisor/Angi/RSMeans cost guides), then apply a state cost multiplier
        derived from regional labor and cost-of-living data. When you enter an address, we geocode it with OpenStreetMap and
        query the OpenStreetMap Overpass API for real nearby schools, grocery stores, hospitals, and parks — live public map
        data, not a guess — to suggest a neighborhood tier for the land estimate.
      </p>
      <p>
        This tool gives you a realistic planning range in seconds, completely free and without an email signup. It is not a
        substitute for itemized bids from licensed local builders, who can price your actual lot, permits, and material choices.
      </p>
    </section>
  );
}
