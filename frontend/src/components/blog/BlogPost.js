import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getPostBySlug, getRelatedPosts } from '../../data/blogPosts';
import { url } from '../../utils/routes';

const CATEGORY_LABELS = {
  'building-costs': 'Building Costs',
  'home-types': 'Home Types',
  'planning-budgeting': 'Planning & Budgeting',
  'design-quality': 'Design & Materials',
  'location-market': 'Location & Market',
  'building-basics': 'Building Basics',
};

function CostTable({ rows }) {
  if (!rows || rows.length === 0) return null;
  return (
    <div style={{ overflowX: 'auto', margin: '20px 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ background: 'var(--bg)' }}>
            {rows[0].map((cell, i) => (
              <th key={i} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: '#374151', borderBottom: '2px solid var(--border)', whiteSpace: 'nowrap' }}>{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.slice(1).map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? 'white' : '#fafbfa' }}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: '10px 14px', color: '#475569', borderBottom: '1px solid var(--border-subtle)' }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function BlogPost({ slug }) {
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ color: 'var(--text)' }}>Article not found</h2>
        <a href={url('/blog')} style={{ color: 'var(--primary)', fontWeight: 600 }}>← Back to blog</a>
      </div>
    );
  }

  const related = getRelatedPosts(post);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedDate,
    author: { '@type': 'Organization', name: 'HomeCostCal' },
    publisher: { '@type': 'Organization', name: 'HomeCostCal', url: 'https://homecostcal.com' },
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://homecostcal.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://homecostcal.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://homecostcal.com/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{post.seoTitle}</title>
        <meta name="description" content={post.metaDescription} />
        <link rel="canonical" href={`https://homecostcal.com/blog/${post.slug}`} />
        <meta property="og:title" content={post.seoTitle} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.publishedDate} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.seoTitle} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      </Helmet>

      <div style={{ background: 'var(--bg)', minHeight: '100vh', padding: '40px 24px 64px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>

          <div style={{ display: 'flex', gap: 6, fontSize: 13, color: 'var(--text-subtle)', marginBottom: 28, flexWrap: 'wrap' }}>
            <a href={url('/')} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</a>
            <span>›</span>
            <a href={url('/blog')} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Blog</a>
            <span>›</span>
            <a href={url(`/blog/category/${post.category}`)} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{CATEGORY_LABELS[post.category] || post.category}</a>
            <span>›</span>
            <span style={{ color: 'var(--text)' }}>{post.title}</span>
          </div>

          <div style={{ background: 'white', borderRadius: 14, border: '1px solid var(--border)', padding: '32px 36px', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-dark)', textTransform: 'uppercase', letterSpacing: '0.05em', background: 'var(--accent-light)', padding: '4px 10px', borderRadius: 20 }}>
                {CATEGORY_LABELS[post.category] || post.category}
              </span>
              <span style={{ fontSize: 12, color: 'var(--text-subtle)' }}>{post.readTime}</span>
              <span style={{ fontSize: 12, color: 'var(--text-subtle)' }}>· {new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <h1 style={{ fontSize: 'clamp(22px, 4vw, 30px)', fontWeight: 800, color: 'var(--text)', lineHeight: 1.3, marginBottom: 14 }}>{post.title}</h1>
            <p style={{ fontSize: 15.5, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>{post.metaDescription}</p>
          </div>

          <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-mid))', borderRadius: 12, padding: '18px 24px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ color: 'white' }}>
              <div style={{ fontWeight: 700, fontSize: 15 }}>Get an instant estimate for your build</div>
              <div style={{ fontSize: 13, opacity: 0.9 }}>Free · No signup · State-specific</div>
            </div>
            <a href={url('/')} style={{ background: 'white', color: 'var(--primary)', padding: '10px 20px', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap' }}>
              Calculate Now →
            </a>
          </div>

          <div style={{ background: 'white', borderRadius: 14, border: '1px solid var(--border)', padding: '32px 36px', marginBottom: 24 }}>
            {post.sections.map((section, i) => (
              <div key={i} style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', marginBottom: 12, lineHeight: 1.35 }}>{section.h2}</h2>
                {section.paragraphs.map((p, j) => (
                  <p key={j} style={{ fontSize: 15, color: '#374151', lineHeight: 1.8, marginBottom: 14 }}>{p}</p>
                ))}
                {section.table && <CostTable rows={section.table} />}
              </div>
            ))}

            {post.tags && post.tags.length > 0 && (
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 20, marginTop: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Tags</div>
                <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                  {post.tags.map((tag) => (
                    <span key={tag} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 20, padding: '4px 12px', fontSize: 12.5, color: 'var(--text-muted)' }}>{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={{ background: 'var(--accent-light)', border: '1px solid var(--accent)', borderRadius: 12, padding: '24px 28px', marginBottom: 32, textAlign: 'center' }}>
            <div style={{ fontWeight: 800, fontSize: 18, color: 'var(--text)', marginBottom: 6 }}>Ready to get a real number?</div>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 16 }}>Use our free calculator for a state-specific home construction estimate in under a minute.</p>
            <a href={url('/')} style={{ background: 'var(--primary)', color: 'white', padding: '12px 28px', borderRadius: 9, textDecoration: 'none', fontWeight: 700, fontSize: 15 }}>
              Get My Free Estimate →
            </a>
          </div>

          {related.length > 0 && (
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 16 }}>Related Articles</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
                {related.map((r) => (
                  <a key={r.slug} href={url(`/blog/${r.slug}`)} style={{ textDecoration: 'none' }}>
                    <div style={{ background: 'white', borderRadius: 10, border: '1px solid var(--border)', padding: '16px 18px' }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', lineHeight: 1.4, marginBottom: 6 }}>{r.title}</div>
                      <span style={{ fontSize: 12.5, color: 'var(--primary)', fontWeight: 600 }}>Read →</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
