import React, { useState } from 'react';
import StepWrapper from './StepWrapper';
import OptionCard from './OptionCard';
import { DesignQualityIllustration } from './Illustrations';
import { STYLE_PREVIEWS } from './StylePreviews';
import { DESIGN_STYLES, QUALITY_TIERS, FURNISHING_OPTIONS } from '../../../data/options';

const sectionLabel = { fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 10, marginTop: 22, textTransform: 'uppercase', letterSpacing: '0.03em' };

export default function DesignQualityStep({ value, onNext, onBack }) {
  const [designStyle, setDesignStyle] = useState(value.designStyle || 'craftsman');
  const [qualityTier, setQualityTier] = useState(value.qualityTier || 'standard');
  const [furnishing, setFurnishing] = useState(value.furnishing || 'unfurnished');
  const [hoveredStyle, setHoveredStyle] = useState(null);

  const previewStyle = hoveredStyle || designStyle;
  const previewInfo = DESIGN_STYLES.find((d) => d.value === previewStyle);
  const PreviewImage = STYLE_PREVIEWS[previewStyle];

  return (
    <StepWrapper
      illustration={<DesignQualityIllustration />}
      title="Design & finish quality"
      subtitle="Finish quality is the second-biggest driver of your total cost."
      onBack={onBack}
      onNext={() => onNext({ designStyle, qualityTier, furnishing })}
    >
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.03em' }}>Architectural Style</div>

      {PreviewImage && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14, padding: '12px 16px',
          background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10,
        }}>
          <div style={{ width: 140, height: 88, flexShrink: 0, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)' }}>
            <PreviewImage />
          </div>
          <div>
            <div style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--text)' }}>{previewInfo?.label}</div>
            <div style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 2, lineHeight: 1.4 }}>{previewInfo?.description}</div>
            <div style={{ fontSize: 11, color: 'var(--text-subtle)', marginTop: 4 }}>{hoveredStyle ? 'Previewing' : 'Selected'} · illustrative sketch, not architectural plans</div>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 8 }} onMouseLeave={() => setHoveredStyle(null)}>
        {DESIGN_STYLES.map((d) => (
          <OptionCard
            key={d.value}
            label={d.label}
            description={d.description}
            selected={designStyle === d.value}
            onClick={() => setDesignStyle(d.value)}
            onMouseEnter={() => setHoveredStyle(d.value)}
            compact
          />
        ))}
      </div>

      <div style={sectionLabel}>Finish Quality Tier</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 10 }}>
        {QUALITY_TIERS.map((q) => (
          <OptionCard key={q.value} label={q.label} description={q.description} selected={qualityTier === q.value} onClick={() => setQualityTier(q.value)} />
        ))}
      </div>

      <div style={sectionLabel}>Furnishing</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 10 }}>
        {FURNISHING_OPTIONS.map((f) => (
          <OptionCard key={f.value} label={f.label} description={f.description} selected={furnishing === f.value} onClick={() => setFurnishing(f.value)} />
        ))}
      </div>
    </StepWrapper>
  );
}
