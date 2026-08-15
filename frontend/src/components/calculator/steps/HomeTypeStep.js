import React, { useState } from 'react';
import StepWrapper from './StepWrapper';
import OptionCard from './OptionCard';
import { HouseTypeIllustration } from './Illustrations';
import { HOME_TYPES, STORY_OPTIONS, FOUNDATION_TYPES, GARAGE_OPTIONS } from '../../../data/options';

const sectionLabel = { fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 10, marginTop: 22, textTransform: 'uppercase', letterSpacing: '0.03em' };

export default function HomeTypeStep({ value, onNext, onBack }) {
  const [homeType, setHomeType] = useState(value.homeType || 'single_family');
  const [stories, setStories] = useState(value.stories || '2');
  const [foundationType, setFoundationType] = useState(value.foundationType || 'slab');
  const [garage, setGarage] = useState(value.garage || 'attached_2car');

  return (
    <StepWrapper
      illustration={<HouseTypeIllustration />}
      title="What kind of home?"
      subtitle="This sets the base structure your estimate is built from."
      onBack={onBack}
      onNext={() => onNext({ homeType, stories, foundationType, garage })}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 10 }}>
        {HOME_TYPES.map((t) => (
          <OptionCard key={t.value} label={t.label} description={t.description} selected={homeType === t.value} onClick={() => setHomeType(t.value)} />
        ))}
      </div>

      <div style={sectionLabel}>Stories</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
        {STORY_OPTIONS.map((s) => (
          <OptionCard key={s.value} label={s.label} selected={stories === s.value} onClick={() => setStories(s.value)} compact />
        ))}
      </div>

      <div style={sectionLabel}>Foundation</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 8 }}>
        {FOUNDATION_TYPES.map((f) => (
          <OptionCard key={f.value} label={f.label} selected={foundationType === f.value} onClick={() => setFoundationType(f.value)} compact />
        ))}
      </div>

      <div style={sectionLabel}>Garage</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 8 }}>
        {GARAGE_OPTIONS.map((g) => (
          <OptionCard key={g.value} label={g.label} selected={garage === g.value} onClick={() => setGarage(g.value)} compact />
        ))}
      </div>
    </StepWrapper>
  );
}
