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

## Current Structure

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/app/page.tsx` | Home page | ✅ Ready |
| `src/app/layout.tsx` | Root layout | ✅ Ready |
| `src/app/globals.css` | Global styles | ✅ Ready |
| `src/app/actions.ts` | Server actions for company CRUD | ✅ Ready |
| `src/components/AccountDashboard.tsx` | Main dashboard component | ✅ Updated |
| `src/db/schema.ts` | Drizzle ORM schema (companies table) | ✅ Ready |
| `src/db/index.ts` | Database client | ✅ Ready |
| `src/db/migrate.ts` | Migration runner | ✅ Ready |
| `src/db/migrations/` | Generated SQL migrations | ✅ Ready |
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
