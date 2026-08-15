import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { STATE_LIST } from '../../data/states';
import { url } from '../../utils/routes';
import { stateNameToSlug } from '../../data/states';

export default function StateCostTable() {
  const [query, setQuery] = useState('');
  const filtered = STATE_LIST.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <section id="state-costs" style={{ maxWidth: 1000, margin: '64px auto', padding: '0 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <h2 style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 800, color: 'var(--text)', marginBottom: 10 }}>
          Average Home Construction Cost by State
        </h2>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', maxWidth: 560, margin: '0 auto' }}>
          Standard-quality, single-family construction cost per square foot — before land, garage, or add-ons.
        </p>
      </div>

      <div style={{ position: 'relative', maxWidth: 320, margin: '0 auto 20px' }}>
        <Search size={15} style={{ position: 'absolute', left: 13, top: 12, color: 'var(--text-subtle)' }} />
        <input
          placeholder="Search your state…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: '100%', padding: '10px 14px 10px 36px', border: '1.5px solid var(--border)', borderRadius: 9, fontSize: 14 }}
        />
      </div>

      <div style={{ border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', padding: '11px 20px', background: 'var(--primary)', color: 'white', fontSize: 12.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          <span>State</span><span>Cost / Sqft</span><span>vs. National Avg</span>
        </div>
        <div style={{ maxHeight: 460, overflowY: 'auto' }}>
          {filtered.map((s, i) => (
            <a key={s.code} href={url(`/housing-cost/${stateNameToSlug(s.name)}`)}
              style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', padding: '11px 20px', fontSize: 13.5, background: i % 2 === 0 ? 'white' : '#fafbfa', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text)' }}>
              <span style={{ fontWeight: 600 }}>{s.name}</span>
              <span>${s.costPerSqftLow}–${s.costPerSqftHigh}</span>
              <span style={{ color: s.multiplier > 1.05 ? '#b45309' : s.multiplier < 0.95 ? 'var(--success)' : 'var(--text-muted)', fontWeight: 600 }}>
                {s.multiplier > 1 ? '+' : ''}{Math.round((s.multiplier - 1) * 100)}%
              </span>
            </a>
          ))}
          {filtered.length === 0 && <div style={{ padding: 20, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13.5 }}>No states match "{query}"</div>}
        </div>
      </div>
    </section>
  );
}
