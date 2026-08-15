import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DollarSign, Home, Wallet, Palette, MapPin, BookOpen, ChevronLeft } from 'lucide-react';
import { getPostsByCategory } from '../../data/blogPosts';
import { url } from '../../utils/routes';

const CATEGORY_META = {
  'building-costs':    { label: 'Building Costs',      Icon: DollarSign, desc: 'Understand what a home actually costs to build, by size, tier, and configuration.' },
  'home-types':          { label: 'Home Types',          Icon: Home,       desc: 'Cost guides for barndominiums, tiny homes, modular builds, ADUs, and multi-family homes.' },
  'planning-budgeting':   { label: 'Planning & Budgeting', Icon: Wallet,     desc: 'Financing, contingency, and how to build a realistic total project budget.' },
  'design-quality':       { label: 'Design & Materials',  Icon: Palette,    desc: 'Finish tiers, foundations, garages, and energy-efficiency upgrades explained.' },
  'location-market':      { label: 'Location & Market',   Icon: MapPin,     desc: 'How and why construction costs vary so much by state and metro.' },
  'building-basics':      { label: 'Building Basics',     Icon: BookOpen,   desc: 'Timelines, contracts, and the questions every first-time builder should ask.' },
};

export default function BlogCategory({ category }) {
  const posts = getPostsByCategory(category);
  const meta = CATEGORY_META[category] || { label: category, Icon: BookOpen, desc: '' };
  const MetaIcon = meta.Icon;

  return (
    <>
      <Helmet>
        <title>{meta.label} Guides 2026 | HomeCostCal</title>
        <meta name="description" content={meta.desc} />
        <link rel="canonical" href={`https://homecostcal.com/blog/category/${category}`} />
        <meta property="og:title" content={`${meta.label} Guides 2026 | HomeCostCal`} />
        <meta property="og:description" content={meta.desc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://homecostcal.com/blog/category/${category}`} />
      </Helmet>
      <div style={{ background: 'var(--bg)', minHeight: '100vh', padding: '48px 24px 64px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <a href={url('/blog')} style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 5, marginBottom: 28 }}>
            <ChevronLeft size={14} /> All Articles
          </a>
          <div style={{ marginBottom: 40 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: 'var(--accent-light)', border: '1.5px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <MetaIcon size={26} color="var(--accent-dark)" strokeWidth={1.75} />
            </div>
            <h1 style={{ fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>{meta.label}</h1>
            <p style={{ fontSize: 16, color: 'var(--text-muted)' }}>{meta.desc}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {posts.map((post) => (
              <a key={post.slug} href={url(`/blog/${post.slug}`)} style={{ textDecoration: 'none' }}>
                <div style={{ background: 'white', borderRadius: 12, border: '1px solid var(--border)', padding: '22px 26px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{post.title}</h2>
                    <p style={{ fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{post.metaDescription}</p>
                  </div>
                  <div style={{ flexShrink: 0, textAlign: 'right' }}>
                    <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginBottom: 4 }}>{post.readTime}</div>
                    <span style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 600 }}>Read →</span>
                  </div>
                </div>
              </a>
            ))}
            {posts.length === 0 && <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>No articles in this category yet.</p>}
          </div>
        </div>
      </div>
    </>
  );
}
