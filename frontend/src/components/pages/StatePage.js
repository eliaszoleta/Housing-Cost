import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { STATE_LIST, slugToStateCode } from '../../data/states';
import { QUALITY_TIERS } from '../../data/options';
import { url } from '../../utils/routes';

// Mirrors backend QUALITY_TIER_COST_PER_SQFT low/high, for display only.
const TIER_RANGES = {
  builder_grade: { low: 105, high: 145 },
  standard: { low: 145, high: 195 },
  premium: { low: 195, high: 265 },
  luxury: { low: 265, high: 385 },
  ultra_luxury: { low: 385, high: 650 },
};

export default function StatePage({ slug }) {
  const code = slugToStateCode(slug);
  const state = STATE_LIST.find((s) => s.code === code);

  if (!state) {
    return (
      <div style={{ maxWidth: 640, margin: '80px auto', textAlign: 'center', padding: '0 20px' }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 10 }}>State not found</h1>
        <a href={url('/')} style={{ color: 'var(--primary)', fontWeight: 600 }}>← Back to the calculator</a>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '48px 20px 64px' }}>
      <Helmet>
        <title>Home Construction Cost in {state.name} (2026) | HomeCostCal</title>
        <meta name="description" content={`See average home construction costs in ${state.name}: $${state.costPerSqftLow}-$${state.costPerSqftHigh}/sqft. Get a free, personalized estimate for your build.`} />
      </Helmet>

      <h1 style={{ fontSize: 'clamp(26px, 4.5vw, 38px)', fontWeight: 800, color: 'var(--text)', marginBottom: 12 }}>
        Home Construction Cost in {state.name}
      </h1>
      <p style={{ fontSize: 16, color: 'var(--text-muted)', marginBottom: 28, lineHeight: 1.7 }}>
        Building a standard-quality single-family home in {state.name} typically costs{' '}
        <strong style={{ color: 'var(--text)' }}>${state.costPerSqftLow}–${state.costPerSqftHigh} per square foot</strong>,
        {' '}{state.multiplier > 1.05 ? `about ${Math.round((state.multiplier - 1) * 100)}% above` : state.multiplier < 0.95 ? `about ${Math.round((1 - state.multiplier) * 100)}% below` : 'close to'} the national average.
        This reflects local labor rates, material costs, and permitting — before land, garage, or custom features.
      </p>

      <div style={{ border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', padding: '11px 20px', background: 'var(--primary)', color: 'white', fontSize: 12.5, fontWeight: 700, textTransform: 'uppercase' }}>
          <span>Quality Tier</span><span>Cost / Sqft in {state.code}</span>
        </div>
        {QUALITY_TIERS.map((t, i) => {
          const base = TIER_RANGES[t.value];
          const low = Math.round(base.low * state.multiplier);
          const high = Math.round(base.high * state.multiplier);
          return (
            <div key={t.value} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', padding: '12px 20px', fontSize: 14, background: i % 2 === 0 ? 'white' : '#fafbfa', borderBottom: '1px solid var(--border-subtle)' }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>{t.label}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.description}</div>
              </div>
              <span style={{ fontWeight: 700, color: 'var(--primary)', alignSelf: 'center' }}>${low}–${high}</span>
            </div>
          );
        })}
      </div>

      <a href={url('/')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--primary)', color: 'white', padding: '13px 26px', borderRadius: 9, fontWeight: 700, fontSize: 15, marginBottom: 40 }}>
        Get My Personalized {state.name} Estimate <ArrowRight size={16} />
      </a>

      <div>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>Other states</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {STATE_LIST.filter((s) => s.code !== state.code).slice(0, 12).map((s) => (
            <a key={s.code} href={url(`/housing-cost/${s.name.toLowerCase().replace(/\s+/g, '-')}`)}
              style={{ fontSize: 13, padding: '6px 12px', border: '1px solid var(--border)', borderRadius: 20, color: 'var(--text-muted)' }}>
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
