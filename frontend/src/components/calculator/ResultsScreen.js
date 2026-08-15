import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, ArrowLeft, Share2, Printer, Check, Info, TrendingUp, Home } from 'lucide-react';
import { formatPrice, formatPriceRange } from '../../utils/formatters';

export default function ResultsScreen({ result, onReset }) {
  const [shared, setShared] = useState(false);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);

  if (!result) return null;

  const {
    stateName, city, squareFootage, costPerSqftLow, costPerSqftHigh,
    breakdown = [], constructionLow, constructionHigh, landLow, landHigh,
    totalLow, totalHigh, neighborhoodLabel, locationMultiplier,
    qualityTierLabel, homeTypeLabel, designStyleLabel, bedrooms, fullBathrooms, halfBathrooms,
  } = result;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    } catch {
      window.prompt('Copy this link:', window.location.href);
    }
  };

  const marketNote = locationMultiplier >= 1.15
    ? `${stateName} runs about ${Math.round((locationMultiplier - 1) * 100)}% above the national average for construction costs.`
    : locationMultiplier <= 0.9
    ? `${stateName} runs about ${Math.round((1 - locationMultiplier) * 100)}% below the national average for construction costs.`
    : `${stateName} is close to the national average for construction costs.`;

  return (
    <>
      <Helmet>
        <title>Your Home Build Cost Estimate — {stateName} | HomeCostCal</title>
        <meta name="description" content={`Estimated cost to build a ${squareFootage.toLocaleString()} sqft home in ${stateName}: ${formatPriceRange(totalLow, totalHigh)}.`} />
      </Helmet>

      <div style={{ padding: '32px 16px 48px', background: 'var(--bg)', minHeight: '100vh' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>

          <div style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)', marginBottom: 20 }}>

            <div style={{ background: `linear-gradient(135deg, var(--primary), var(--primary-mid))`, padding: '30px 32px', color: 'white' }}>
              <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.85, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Estimated Total Project Cost {city ? `· ${city}, ${stateName}` : `· ${stateName}`}
              </div>
              <div style={{ fontSize: 'clamp(32px, 7vw, 46px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 10, letterSpacing: '-1px' }}>
                {formatPrice(totalLow)} – {formatPrice(totalHigh)}
              </div>
              <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', fontSize: 13, opacity: 0.9 }}>
                <span>{squareFootage.toLocaleString()} sqft</span>
                <span>${costPerSqftLow}–${costPerSqftHigh}/sqft construction</span>
                <span>{homeTypeLabel}</span>
              </div>
            </div>

            <div style={{ padding: '26px 28px' }}>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 22 }}>
                {[
                  ['Bedrooms', bedrooms],
                  ['Full Baths', fullBathrooms],
                  ['Half Baths', halfBathrooms],
                  ['Style', designStyleLabel],
                  ['Quality', qualityTierLabel],
                ].filter(([, v]) => v || v === 0).map(([label, v]) => (
                  <div key={label} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '7px 13px', fontSize: 12.5 }}>
                    <span style={{ color: 'var(--text-muted)' }}>{label}: </span>
                    <span style={{ fontWeight: 700, color: 'var(--text)' }}>{v}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 22 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 11, fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
                  <Home size={13} /> Construction Cost Breakdown
                </div>
                <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 10, overflow: 'hidden' }}>
                  {breakdown.map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderBottom: '1px solid var(--border-subtle)', fontSize: 13.5, background: i % 2 === 0 ? 'white' : '#fafbfa' }}>
                      <span style={{ color: '#374151' }}>{item.label}</span>
                      <span style={{ fontWeight: 600, color: 'var(--text)' }}>{formatPriceRange(item.low, item.high)}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px', background: 'var(--bg)', borderTop: '1.5px solid var(--border)', fontWeight: 700, fontSize: 14.5 }}>
                    <span>Construction subtotal</span>
                    <span style={{ color: 'var(--primary)' }}>{formatPriceRange(constructionLow, constructionHigh)}</span>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 22 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 11, fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
                  <TrendingUp size={13} /> Land & Site Estimate
                </div>
                <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 10, padding: '13px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text)' }}>{neighborhoodLabel} tier</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Land priced as a share of total value — highly local, get a comp from a realtor for precision.</div>
                  </div>
                  <span style={{ fontWeight: 700, color: 'var(--accent-dark)', flexShrink: 0, marginLeft: 12 }}>{formatPriceRange(landLow, landHigh)}</span>
                </div>
              </div>

              <div style={{ background: 'var(--primary-light)', borderRadius: 10, padding: '13px 16px', marginBottom: 20, fontSize: 13, color: 'var(--primary-dark)', display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                <MapPin size={14} style={{ marginTop: 2, flexShrink: 0 }} />
                <span>{marketNote}</span>
              </div>

              <div style={{ background: 'var(--accent-light)', border: '1px solid var(--accent)', borderRadius: 10, padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
                  <Info size={14} color="var(--accent-dark)" />
                  <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--accent-dark)' }}>Before you budget against this number</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12.5, color: '#6b5323', lineHeight: 1.7 }}>
                  <li>Get itemized bids from at least 3 licensed local builders — they'll price your actual lot and local permit fees.</li>
                  <li>Ask what's excluded: many quotes exclude landscaping, driveway, or appliances.</li>
                  <li>Budget 10–15% contingency for a custom build — surprises are normal, not a red flag.</li>
                </ul>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={onReset} style={btnStyle}><ArrowLeft size={14} /> New Estimate</button>
            <button onClick={handleShare} style={btnStyle}>{shared ? <><Check size={14} /> Copied!</> : <><Share2 size={14} /> Share</>}</button>
            <button onClick={() => window.print()} style={btnStyle}><Printer size={14} /> Print</button>
          </div>

          <p style={{ textAlign: 'center', fontSize: 11.5, color: 'var(--text-subtle)', marginTop: 16, maxWidth: 540, margin: '16px auto 0' }}>
            This estimate is for informational and planning purposes only and is not a bid or appraisal. Actual costs vary by contractor, lot, and market conditions.
          </p>
        </div>
      </div>
    </>
  );
}

const btnStyle = {
  display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', border: '1.5px solid var(--border)',
  borderRadius: 8, background: 'white', cursor: 'pointer', fontWeight: 600, fontSize: 13.5, color: '#374151',
};
