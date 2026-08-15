import React from 'react';
import { ArrowRight } from 'lucide-react';
import { getAllPosts } from '../../data/blogPosts';
import { url } from '../../utils/routes';

export default function BlogTeaser() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section style={{ maxWidth: 1000, margin: '64px auto', padding: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
        <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 28px)', fontWeight: 800, color: 'var(--text)' }}>From the Blog</h2>
        <a href={url('/blog')} style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
          View all guides <ArrowRight size={14} />
        </a>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
        {posts.map((post) => (
          <a key={post.slug} href={url(`/blog/${post.slug}`)} style={{ textDecoration: 'none' }}>
            <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 22px', height: '100%' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-subtle)', marginBottom: 8 }}>{post.readTime}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', lineHeight: 1.4, marginBottom: 8 }}>{post.title}</div>
              <span style={{ fontSize: 12.5, color: 'var(--primary)', fontWeight: 600 }}>Read guide →</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
