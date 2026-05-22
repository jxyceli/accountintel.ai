"use server";

import { db } from "@/db";
import { companies, competitors } from "@/db/schema";
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

export interface CompetitorData {
  id?: number;
  companyId: number;
  competitorName: string;
  geographies: string[];
  marketCap: string;
  mainProducts: string[];
  targetDemographics: string[];
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

export async function fetchCompetitors(companyId: number): Promise<CompetitorData[]> {
  try {
    const results = await db.select().from(competitors).where(eq(competitors.companyId, companyId));
    return results.map((c) => ({
      id: c.id ?? undefined,
      companyId: c.companyId,
      competitorName: c.competitorName,
      geographies: c.geographies ? JSON.parse(c.geographies) : [],
      marketCap: c.marketCap ?? "Private",
      mainProducts: c.mainProducts ? JSON.parse(c.mainProducts) : [],
      targetDemographics: c.targetDemographics ? JSON.parse(c.targetDemographics) : [],
    }));
  } catch {
    return [];
  }
}

export async function upsertCompetitors(companyId: number, competitorList: Omit<CompetitorData, "id" | "companyId">[]): Promise<CompetitorData[] | { error: string }> {
  try {
    await db.delete(competitors).where(eq(competitors.companyId, companyId));

    if (competitorList.length === 0) return [];

    const inserted = await db
      .insert(competitors)
      .values(
        competitorList.map((c) => ({
          companyId,
          competitorName: c.competitorName,
          geographies: JSON.stringify(c.geographies),
          marketCap: c.marketCap,
          mainProducts: JSON.stringify(c.mainProducts),
          targetDemographics: JSON.stringify(c.targetDemographics),
        }))
      )
      .returning();

    return inserted.map((c) => ({
      id: c.id ?? undefined,
      companyId: c.companyId,
      competitorName: c.competitorName,
      geographies: c.geographies ? JSON.parse(c.geographies) : [],
      marketCap: c.marketCap ?? "Private",
      mainProducts: c.mainProducts ? JSON.parse(c.mainProducts) : [],
      targetDemographics: c.targetDemographics ? JSON.parse(c.targetDemographics) : [],
    }));
  } catch {
    return { error: "Failed to save competitor data" };
  }
}
