import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function TermsOfService() {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '56px 20px 64px', color: 'var(--text-muted)', fontSize: 14.5, lineHeight: 1.8 }}>
      <Helmet><title>Terms of Service | HomeCostCal</title></Helmet>
      <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text)', marginBottom: 18 }}>Terms of Service</h1>
      <p style={{ marginBottom: 16 }}>
        HomeCostCal provides cost estimates for informational and planning purposes only. Estimates are generated from
        published industry averages and general market data — they are <strong>not</strong> a bid, quote, appraisal, or
        guarantee of actual construction cost.
      </p>
      <p style={{ marginBottom: 16 }}>
        Actual project costs depend on your specific lot, local permitting, contractor pricing, material availability, and
        market conditions at the time of construction. Always obtain itemized quotes from licensed, insured local builders
        before making financial decisions.
      </p>
      <p>
        By using this site you agree that HomeCostCal is not liable for decisions made based on the estimates provided.
      </p>
    </div>
  );
}
