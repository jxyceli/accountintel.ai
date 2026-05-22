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
