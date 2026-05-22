# Active Context: Account Intelligence Dashboard

## Current State

**Template Status**: ✅ Dashboard with structured company data model

The application is an Account Intelligence Dashboard with SQLite + Drizzle ORM for structured company data persistence. Replaced brittle scraping/mock data approach with verified database fields and manual override UI.

## Recently Completed

- [x] Base Next.js 16 setup with App Router
- [x] TypeScript configuration with strict mode
- [x] Tailwind CSS 4 integration
- [x] ESLint configuration
- [x] Memory bank documentation
- [x] Recipe system for common features
- [x] SQLite + Drizzle ORM database setup (schema, client, migrations)
- [x] Company data table with structured fields (domain, company_name, company_description, industry, website_url, employees, revenue, hq)
- [x] Server actions for company data CRUD (getCompanyByDomain, upsertCompany)
- [x] AccountDashboard updated to fetch from database instead of mock data
- [x] Manual override edit modal for company background data
- [x] suppressHydrationWarning added to RootLayout body tag
- [x] Competitors table with foreign key to companies (geographies, market_cap, main_products, target_demographics stored as JSON)
- [x] fetchCompetitors and upsertCompetitors server actions
- [x] Competitors tab in AccountDashboard with badge-based comparison grid
- [x] force-dynamic export on home page
- [x] CRM pipeline table with monitoring status (Active/High Priority/Archived), owner assignment, inline notes editing
- [x] Market Moves Feed with severity-based categorization (high/medium/info)
- [x] detectMarketMove server action with SHA-256 content hashing for change detection
- [x] detectAllMarketMoves batch detection for all competitors
- [x] Cron API route at /api/cron/detect-moves for automated market monitoring
- [x] competitor_market_moves table for tracking detected competitor changes
- [x] Competitors table extended: monitoring_status, owner, notes, website_url, pricing_url, last_hashed

## Current Structure

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/app/page.tsx` | Home page (force-dynamic) | ✅ Updated |
| `src/app/layout.tsx` | Root layout | ✅ Ready |
| `src/app/globals.css` | Global styles | ✅ Ready |
| `src/app/actions.ts` | Server actions (company CRUD, competitor CRM, market move detection) | ✅ Updated |
| `src/app/api/cron/detect-moves/route.ts` | Cron endpoint for automated market monitoring | ✅ Ready |
| `src/components/AccountDashboard.tsx` | Main dashboard (6 tabs: Brief, Outreach, Tech, Competitors, CRM, Activity Feed) | ✅ Updated |
| `src/db/schema.ts` | Drizzle ORM schema (companies, competitors, competitor_market_moves) | ✅ Updated |
| `src/db/index.ts` | Database client | ✅ Ready |
| `src/db/migrate.ts` | Migration runner | ✅ Ready |
| `src/db/migrations/` | Generated SQL migrations (3 files) | ✅ Ready |
| `drizzle.config.ts` | Drizzle configuration | ✅ Ready |
| `.kilocode/` | AI context & recipes | ✅ Ready |

## Current Focus

The template is ready. Next steps depend on user requirements:

1. What type of application to build
2. What features are needed
3. Design/branding preferences

## Quick Start Guide

### To add a new page:

Create a file at `src/app/[route]/page.tsx`:
```tsx
export default function NewPage() {
  return <div>New page content</div>;
}
```

### To add components:

Create `src/components/` directory and add components:
```tsx
// src/components/ui/Button.tsx
export function Button({ children }: { children: React.ReactNode }) {
  return <button className="px-4 py-2 bg-blue-600 text-white rounded">{children}</button>;
}
```

### To add a database:

Follow `.kilocode/recipes/add-database.md`

### To add API routes:

Create `src/app/api/[route]/route.ts`:
```tsx
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello" });
}
```

## Available Recipes

| Recipe | File | Use Case |
|--------|------|----------|
| Add Database | `.kilocode/recipes/add-database.md` | Data persistence with Drizzle + SQLite |

## Pending Improvements

- [ ] Add more recipes (auth, email, etc.)
- [ ] Add example components
- [ ] Add testing setup recipe

## Session History

| Date | Changes |
|------|---------|
| Initial | Template created with base setup |
| 2026-05-22 | Added SQLite + Drizzle ORM database, structured company data model, server actions, manual override UI |
| 2026-05-22 | Added competitors table, fetchCompetitors/upsertCompetitors server actions, competitor intelligence UI tab with badge comparison grid, force-dynamic page |
| 2026-05-22 | Added CRM pipeline table, Market Moves Feed, content hashing detection, cron API route, competitor_market_moves table |
