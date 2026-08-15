# 🏡 HomeCostCal — Home Construction Cost Calculator

A free, full-stack calculator that estimates what it costs to build a new home — by state, size, home
type, design style, finish quality, and neighborhood — with real proximity data pulled live from
OpenStreetMap.

## What It Does

A step-by-step calculator that estimates:
- Core construction cost (state + metro adjusted, $/sqft by finish quality)
- Foundation, garage, extra bathrooms, furnishing, and site-work add-ons
- Land/lot cost estimate based on neighborhood desirability
- A live "convenience score" from real nearby schools, grocery stores, hospitals, and parks
- A full itemized cost breakdown and total project range

## Project Structure

```
housing-cost/
├── backend/          # Express API server
│   ├── src/
│   │   ├── config/    # State multipliers, quality tiers, all pricing tables (defaults.js)
│   │   ├── routes/    # /api/calculate, /api/location, /api/states
│   │   └── services/  # Cost engine + location/proximity service
│   └── .env.example
└── frontend/         # React app
    └── src/
        ├── components/
        │   ├── calculator/  # Step-by-step wizard + results screen
        │   ├── ui/          # Header, footer, SEO content, state table, FAQ
        │   └── pages/       # About, Contact, Privacy, Terms, per-state SEO pages
        └── data/            # Client-side mirrors of option labels & state list
```

## Getting Started

### 1. Install dependencies
```bash
npm run install:all
```

### 2. Configure backend (optional — works with zero config)
```bash
cd backend
cp .env.example .env
```

### 3. Run development servers
```bash
# Terminal 1 — Backend API on :3001
npm run dev:backend

# Terminal 2 — Frontend on :3000
npm run dev:frontend
```

## Data Sources

| Data | Source | Notes |
|------|--------|-------|
| Base construction cost / sqft | NAHB "Cost of Constructing a Home" survey, U.S. Census Bureau Survey of Construction, HomeAdvisor/Angi/RSMeans cost guides | National averages by quality tier, hardcoded in `backend/src/config/defaults.js`, documented inline |
| State cost multipliers | BLS regional construction wage data, material freight, cost of living | Same methodology as our other cost calculators |
| Metro adjustments | Curated list of ~25 major metros priced above/below their state average | Blended 70/30 with the state multiplier so no single metro entry overwhelms it |
| Geocoding | [OpenStreetMap Nominatim](https://nominatim.openstreetmap.org) | Free, no API key required |
| Nearby amenities (schools, grocery, hospitals, parks, restaurants) | [OpenStreetMap Overpass API](https://overpass-api.de) | Free, no API key, real live map data — not a hardcoded guess |
| Land / lot cost | Estimated as a % of total project value by neighborhood tier (a standard real-estate budgeting heuristic) | We don't have access to paid MLS comps, so this is clearly labeled as a wide, local-market-dependent range |

## Key Calculation Formula

```
core_cost = quality_tier_$/sqft × sqft × home_type_mult × design_mult × story_mult × location_mult
+ foundation_cost(footprint) + garage_cost + extra_bathroom_cost + furnishing_cost
+ site_work_cost + sum(extra_feature_costs)
= construction_cost

land_cost = construction_cost × neighborhood_land_pct / (1 - neighborhood_land_pct)

total_cost = construction_cost + land_cost
```

## Neighborhood Convenience Score

When an address is provided, we geocode it and query the Overpass API for amenities within ~2 miles.
Each category (school, grocery, hospital, park, restaurant) contributes up to 20 points, scaled by
distance to the nearest example (full credit within 0.5mi, zero credit beyond 2.5mi) — a fully
transparent formula, documented in `backend/src/services/locationService.js`.

## Design

Deep forest green + warm gold palette (see `frontend/src/index.css` custom properties), Poppins for
headings / Inter for body text, hand-drawn SVG illustrations per calculator step (no external image
assets), and [lucide-react](https://lucide.dev) icons throughout.

## SEO Strategy

- Semantic HTML5 structure with proper heading hierarchy
- Schema.org WebApplication markup
- Per-state landing pages at `/housing-cost/:state` for "cost to build a house in X" search intent
- State-level cost comparison table and FAQ section targeting long-tail queries
- `react-helmet-async` per-page metadata

## Environment Variables

### Backend (Railway)
```
PORT=3001
FRONTEND_URL=https://your-frontend.vercel.app
```

### Frontend (Vercel)
```
REACT_APP_API_BASE=https://your-backend.railway.app
```

## Roadmap

This ships as a standalone free calculator. A builder/realtor SaaS layer (branded embeddable widget,
lead capture, Stripe billing) matching our other cost calculators can follow once the core tool is validated.
