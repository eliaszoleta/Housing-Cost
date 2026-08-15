import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function About() {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '56px 20px 64px', color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.8 }}>
      <Helmet><title>About | HomeCostCal</title></Helmet>
      <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text)', marginBottom: 18 }}>About HomeCostCal</h1>
      <p style={{ marginBottom: 16 }}>
        HomeCostCal is a free calculator built to answer one question honestly: <em>what would it actually cost to build
        this home, here?</em> We built it because most home cost estimates online are either national averages that ignore
        location, or lead-generation forms that need your email before they'll show a number.
      </p>
      <p style={{ marginBottom: 16 }}>
        Our estimates combine published national construction-cost data — from the National Association of Home Builders,
        the U.S. Census Bureau, HomeAdvisor/Angi, and RSMeans — with state-level cost multipliers and, when you give us an
        address, live public location data from OpenStreetMap to gauge neighborhood convenience.
      </p>
      <p>
        We're upfront about the limits: this is a planning tool, not a bid. Every real project needs itemized quotes from
        licensed local builders. Our job is to get you into that conversation with realistic expectations.
      </p>
    </div>
  );
}
