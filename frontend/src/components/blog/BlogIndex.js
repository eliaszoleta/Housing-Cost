import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DollarSign, Home, Wallet, Palette, MapPin, BookOpen, ArrowRight } from 'lucide-react';
import { getAllPosts, getCategories } from '../../data/blogPosts';
import { url } from '../../utils/routes';

const CATEGORY_LABELS = {
  'building-costs':      { label: 'Building Costs',       Icon: DollarSign },
  'home-types':           { label: 'Home Types',           Icon: Home       },
  'planning-budgeting':   { label: 'Planning & Budgeting',  Icon: Wallet     },
  'design-quality':       { label: 'Design & Materials',    Icon: Palette    },
  'location-market':      { label: 'Location & Market',     Icon: MapPin     },
  'building-basics':      { label: 'Building Basics',       Icon: BookOpen   },
};

function PostCard({ post, featured = false }) {
  const cat = CATEGORY_LABELS[post.category] || { label: post.category, Icon: BookOpen };
  const CatIcon = cat.Icon;
  return (
    <a href={url(`/blog/${post.slug}`)} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <div style={{
        background: 'white', borderRadius: 14, border: '1px solid var(--border)',
        padding: featured ? '28px 32px' : '22px 26px',
        transition: 'box-shadow 0.2s, transform 0.2s', cursor: 'pointer', height: '100%',
      }}
        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'var(--accent-light)', border: '1px solid var(--accent)', borderRadius: 6, padding: '3px 9px 3px 7px' }}>
            <CatIcon size={11} color="var(--accent-dark)" strokeWidth={2.5} />
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-dark)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{cat.label}</span>
          </div>
          <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-subtle)' }}>{post.readTime}</span>
        </div>
        <h2 style={{ fontSize: featured ? 22 : 17, fontWeight: 800, color: 'var(--text)', lineHeight: 1.35, marginBottom: 10 }}>{post.title}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65, margin: '0 0 14px' }}>{post.metaDescription}</p>
        <span style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          Read article <ArrowRight size={13} />
        </span>
      </div>
    </a>
  );
}

export default function BlogIndex() {
  const posts = getAllPosts();
  const categories = getCategories();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <Helmet>
        <title>Home Building Blog 2026 — Cost Guides & Advice | HomeCostCal</title>
        <meta name="description" content="Free home construction cost guides: budgeting, financing, foundation types, home styles, and state-by-state pricing. 24 in-depth articles for anyone planning a build." />
        <link rel="canonical" href="https://homecostcal.com/blog" />
        <meta property="og:title" content="Home Building Blog 2026 — Cost Guides & Advice | HomeCostCal" />
        <meta property="og:description" content="Free home construction cost guides: budgeting, financing, foundation types, home styles, and state-by-state pricing." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homecostcal.com/blog" />
      </Helmet>
      <div style={{ background: 'var(--bg)', minHeight: '100vh', padding: '48px 24px 64px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, color: 'var(--text)', marginBottom: 10 }}>
              Home Building Resource Center
            </h1>
            <p style={{ fontSize: 16, color: 'var(--text-muted)', maxWidth: 560, margin: '0 auto' }}>
              Cost guides, budgeting frameworks, and building basics for anyone planning a new home.
            </p>
          </div>

          {featured && (
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 12 }}>Featured</div>
              <PostCard post={featured} featured />
            </div>
          )}

          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 16 }}>Browse by Category</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {categories.map((cat) => {
                const info = CATEGORY_LABELS[cat] || { label: cat, Icon: BookOpen };
                const CatIcon = info.Icon;
                return (
                  <a key={cat} href={url(`/blog/category/${cat}`)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 16px', borderRadius: 24, background: 'white', border: '1.5px solid var(--border)', textDecoration: 'none', fontSize: 13.5, fontWeight: 600, color: '#374151' }}>
                    <CatIcon size={14} strokeWidth={2} style={{ flexShrink: 0 }} /> {info.label}
                  </a>
                );
              })}
            </div>
          </div>

          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 16 }}>All Articles</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {rest.map((post) => <PostCard key={post.slug} post={post} />)}
          </div>
        </div>
      </div>
    </>
  );
}
