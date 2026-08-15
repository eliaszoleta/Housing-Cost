// Generates public/sitemap.xml before every build.
// Plain CommonJS (no ESM imports) so it can run directly via `node` in the
// prebuild step, before Babel/webpack are involved — so the lists below are
// intentionally small, hand-maintained mirrors of the site's real routes.

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://homecostcal.com';

const STATE_SLUGS = [
  'alabama', 'alaska', 'arizona', 'arkansas', 'california', 'colorado', 'connecticut',
  'delaware', 'washington-dc', 'florida', 'georgia', 'hawaii', 'idaho', 'illinois',
  'indiana', 'iowa', 'kansas', 'kentucky', 'louisiana', 'maine', 'maryland',
  'massachusetts', 'michigan', 'minnesota', 'mississippi', 'missouri', 'montana',
  'nebraska', 'nevada', 'new-hampshire', 'new-jersey', 'new-mexico', 'new-york',
  'north-carolina', 'north-dakota', 'ohio', 'oklahoma', 'oregon', 'pennsylvania',
  'rhode-island', 'south-carolina', 'south-dakota', 'tennessee', 'texas', 'utah',
  'vermont', 'virginia', 'washington', 'west-virginia', 'wisconsin', 'wyoming',
];

const BLOG_CATEGORY_SLUGS = [
  'building-costs', 'home-types', 'planning-budgeting',
  'design-quality', 'location-market', 'building-basics',
];

const BLOG_POST_SLUGS = [
  'cost-to-build-a-house-2026-price-guide',
  'cost-to-build-a-house-per-square-foot',
  'cost-to-build-a-2000-sq-ft-house',
  'cost-to-build-a-3-bedroom-house',
  'building-vs-buying-a-house-cost-comparison',
  'hidden-costs-of-building-a-house',
  'cost-to-build-a-barndominium',
  'cost-to-build-a-tiny-house',
  'modular-home-vs-site-built-cost-comparison',
  'cost-to-build-an-adu-in-law-suite',
  'cost-to-build-a-duplex',
  'how-to-budget-for-a-custom-home-build',
  'construction-loans-explained',
  'cheapest-way-to-build-a-house',
  'how-much-contingency-to-budget-building-a-house',
  'land-cost-vs-construction-cost',
  'builder-grade-vs-premium-vs-luxury-finishes',
  'cost-to-build-a-house-with-a-basement',
  'cost-to-build-a-detached-garage',
  'net-zero-energy-efficient-home-cost',
  'why-home-building-costs-vary-by-state',
  'cheapest-states-to-build-a-house',
  'how-long-does-it-take-to-build-a-house',
  'questions-to-ask-a-home-builder',
];

const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/blog', priority: '0.9', changefreq: 'weekly' },
  { path: '/about', priority: '0.4', changefreq: 'monthly' },
  { path: '/contact', priority: '0.4', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.2', changefreq: 'yearly' },
  { path: '/terms-of-service', priority: '0.2', changefreq: 'yearly' },
];

const today = new Date().toISOString().split('T')[0];

const urls = [
  ...STATIC_ROUTES.map((r) => ({ loc: r.path, priority: r.priority, changefreq: r.changefreq })),
  ...STATE_SLUGS.map((slug) => ({ loc: `/housing-cost/${slug}`, priority: '0.7', changefreq: 'monthly' })),
  ...BLOG_CATEGORY_SLUGS.map((slug) => ({ loc: `/blog/category/${slug}`, priority: '0.6', changefreq: 'weekly' })),
  ...BLOG_POST_SLUGS.map((slug) => ({ loc: `/blog/${slug}`, priority: '0.6', changefreq: 'monthly' })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

const outPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(outPath, xml);
console.log(`Sitemap written to ${outPath} (${urls.length} URLs)`);
