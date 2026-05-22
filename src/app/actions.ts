"use server";

import { db } from "@/db";
import { companies } from "@/db/schema";
import { eq } from "drizzle-orm";

export interface CompanyData {
  id?: number;
  domain: string;
  companyName: string;
  companyDescription?: string | null;
  industry?: string | null;
  websiteUrl?: string | null;
  employees?: string | null;
  revenue?: string | null;
  hq?: string | null;
}

export async function getCompanyByDomain(domain: string): Promise<CompanyData | null> {
  try {
    const result = await db.select().from(companies).where(eq(companies.domain, domain));
    if (result.length === 0) return null;
    const company = result[0];
    return {
      id: company.id ?? undefined,
      domain: company.domain,
      companyName: company.companyName,
      companyDescription: company.companyDescription,
      industry: company.industry,
      websiteUrl: company.websiteUrl,
      employees: company.employees,
      revenue: company.revenue,
      hq: company.hq,
    };
  } catch {
    return null;
  }
}

export async function upsertCompany(data: CompanyData): Promise<CompanyData | { error: string }> {
  try {
    const existing = await db.select().from(companies).where(eq(companies.domain, data.domain));

    if (existing.length > 0) {
      const updated = await db
        .update(companies)
        .set({
          companyName: data.companyName,
          companyDescription: data.companyDescription,
          industry: data.industry,
          websiteUrl: data.websiteUrl,
          employees: data.employees,
          revenue: data.revenue,
          hq: data.hq,
          updatedAt: new Date(),
        })
        .where(eq(companies.domain, data.domain))
        .returning();

      const company = updated[0];
      return {
        id: company.id ?? undefined,
        domain: company.domain,
        companyName: company.companyName,
        companyDescription: company.companyDescription,
        industry: company.industry,
        websiteUrl: company.websiteUrl,
        employees: company.employees,
        revenue: company.revenue,
        hq: company.hq,
      };
    }

    const inserted = await db
      .insert(companies)
      .values({
        domain: data.domain,
        companyName: data.companyName,
        companyDescription: data.companyDescription,
        industry: data.industry,
        websiteUrl: data.websiteUrl,
        employees: data.employees,
        revenue: data.revenue,
        hq: data.hq,
      })
      .returning();

    const company = inserted[0];
    return {
      id: company.id ?? undefined,
      domain: company.domain,
      companyName: company.companyName,
      companyDescription: company.companyDescription,
      industry: company.industry,
      websiteUrl: company.websiteUrl,
      employees: company.employees,
      revenue: company.revenue,
      hq: company.hq,
    };
  } catch {
    return { error: "Failed to save company data" };
  }
}
