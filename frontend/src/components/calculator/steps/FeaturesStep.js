import React, { useState } from 'react';
import StepWrapper from './StepWrapper';
import OptionCard from './OptionCard';
import { FeaturesIllustration } from './Illustrations';
import { SITE_WORK_OPTIONS, EXTRA_FEATURES } from '../../../data/options';

const sectionLabel = { fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 10, marginTop: 22, textTransform: 'uppercase', letterSpacing: '0.03em' };

export default function FeaturesStep({ value, onNext, onBack }) {
  const [siteWork, setSiteWork] = useState(value.siteWork || 'moderate');
  const [extraFeatures, setExtraFeatures] = useState(value.extraFeatures || []);

  const toggleFeature = (key) => {
    setExtraFeatures((prev) => prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]);
  };

  return (
    <StepWrapper
      illustration={<FeaturesIllustration />}
      title="Lot & extra features"
      subtitle="Optional add-ons — skip anything that doesn't apply."
      onBack={onBack}
      onNext={() => onNext({ siteWork, extraFeatures })}
    >
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.03em' }}>Lot Condition</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 8 }}>
        {SITE_WORK_OPTIONS.map((s) => (
          <OptionCard key={s.value} label={s.label} selected={siteWork === s.value} onClick={() => setSiteWork(s.value)} compact />
        ))}
      </div>

      <div style={sectionLabel}>Extra Features (select any)</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 8 }}>
        {EXTRA_FEATURES.map((f) => (
          <OptionCard key={f.value} label={f.label} selected={extraFeatures.includes(f.value)} onClick={() => toggleFeature(f.value)} compact />
        ))}
      </div>
    </StepWrapper>
  );
}
