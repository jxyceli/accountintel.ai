import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const companies = sqliteTable("companies", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  domain: text("domain").notNull().unique(),
  companyName: text("company_name").notNull(),
  companyDescription: text("company_description"),
  industry: text("industry"),
  websiteUrl: text("website_url"),
  employees: text("employees"),
  revenue: text("revenue"),
  hq: text("hq"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const competitors = sqliteTable("competitors", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  companyId: integer("company_id").notNull().references(() => companies.id, { onDelete: "cascade" }),
  competitorName: text("competitor_name").notNull(),
  geographies: text("geographies"),
  marketCap: text("market_cap"),
  mainProducts: text("main_products"),
  targetDemographics: text("target_demographics"),
  monitoringStatus: text("monitoring_status").default("Active"),
  owner: text("owner"),
  notes: text("notes"),
  websiteUrl: text("website_url"),
  pricingUrl: text("pricing_url"),
  lastHashed: text("last_hashed"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const competitorMarketMoves = sqliteTable("competitor_market_moves", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  competitorId: integer("competitor_id").notNull().references(() => competitors.id, { onDelete: "cascade" }),
  moveType: text("move_type").notNull(),
  severity: text("severity").default("info"),
  title: text("title").notNull(),
  description: text("description"),
  sourceUrl: text("source_url"),
  detectedAt: integer("detected_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});
