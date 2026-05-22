"use server";

import { db } from "@/db";
import { companies, competitors, competitorMarketMoves } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { createHash } from "crypto";

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
  monitoringStatus?: string;
  owner?: string | null;
  notes?: string | null;
  websiteUrl?: string | null;
  pricingUrl?: string | null;
}

export interface MarketMoveData {
  id?: number;
  competitorId: number;
  competitorName?: string;
  moveType: string;
  severity: string;
  title: string;
  description?: string | null;
  sourceUrl?: string | null;
  detectedAt?: Date;
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
      monitoringStatus: c.monitoringStatus ?? "Active",
      owner: c.owner,
      notes: c.notes,
      websiteUrl: c.websiteUrl,
      pricingUrl: c.pricingUrl,
    }));
  } catch {
    return [];
  }
}

export async function updateCompetitorCRM(id: number, updates: { monitoringStatus?: string; owner?: string; notes?: string }): Promise<CompetitorData | { error: string }> {
  try {
    const result = await db
      .update(competitors)
      .set({
        monitoringStatus: updates.monitoringStatus,
        owner: updates.owner,
        notes: updates.notes,
      })
      .where(eq(competitors.id, id))
      .returning();

    const c = result[0];
    return {
      id: c.id ?? undefined,
      companyId: c.companyId,
      competitorName: c.competitorName,
      geographies: c.geographies ? JSON.parse(c.geographies) : [],
      marketCap: c.marketCap ?? "Private",
      mainProducts: c.mainProducts ? JSON.parse(c.mainProducts) : [],
      targetDemographics: c.targetDemographics ? JSON.parse(c.targetDemographics) : [],
      monitoringStatus: c.monitoringStatus ?? "Active",
      owner: c.owner,
      notes: c.notes,
      websiteUrl: c.websiteUrl,
      pricingUrl: c.pricingUrl,
    };
  } catch {
    return { error: "Failed to update competitor" };
  }
}

export async function fetchMarketMoves(companyId: number, limit = 50): Promise<MarketMoveData[]> {
  try {
    const results = await db
      .select()
      .from(competitorMarketMoves)
      .innerJoin(competitors, eq(competitorMarketMoves.competitorId, competitors.id))
      .where(eq(competitors.companyId, companyId))
      .orderBy(desc(competitorMarketMoves.detectedAt))
      .limit(limit);

    return results.map((r) => ({
      id: r.competitor_market_moves.id ?? undefined,
      competitorId: r.competitor_market_moves.competitorId,
      competitorName: r.competitors.competitorName,
      moveType: r.competitor_market_moves.moveType,
      severity: r.competitor_market_moves.severity ?? "info",
      title: r.competitor_market_moves.title,
      description: r.competitor_market_moves.description,
      sourceUrl: r.competitor_market_moves.sourceUrl,
      detectedAt: r.competitor_market_moves.detectedAt ?? undefined,
    }));
  } catch {
    return [];
  }
}

export async function detectMarketMove(competitorId: number): Promise<{ detected: boolean; move?: MarketMoveData; error?: string }> {
  try {
    const result = await db.select().from(competitors).where(eq(competitors.id, competitorId));
    if (result.length === 0) return { detected: false, error: "Competitor not found" };

    const competitor = result[0];
    const urlsToCheck = [competitor.websiteUrl, competitor.pricingUrl].filter(Boolean) as string[];

    if (urlsToCheck.length === 0) return { detected: false };

    for (const url of urlsToCheck) {
      try {
        const response = await fetch(url, { headers: { "User-Agent": "MarketMonitor/1.0" } });
        const html = await response.text();

        const contentBlocks = html
          .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
          .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
          .replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, 5000);

        const currentHash = createHash("sha256").update(contentBlocks).digest("hex");

        if (competitor.lastHashed && competitor.lastHashed !== currentHash) {
          const isPricing = url === competitor.pricingUrl;
          const moveType = isPricing ? "Pricing Adjustment" : "Content Update";
          const severity = isPricing ? "high" : "medium";

          await db.insert(competitorMarketMoves).values({
            competitorId,
            moveType,
            severity,
            title: `${competitor.competitorName}: ${moveType} Detected`,
            description: `Change detected on ${isPricing ? "pricing" : "landing"} page. Content hash updated.`,
            sourceUrl: url,
          });

          return {
            detected: true,
            move: {
              competitorId,
              competitorName: competitor.competitorName,
              moveType,
              severity,
              title: `${competitor.competitorName}: ${moveType} Detected`,
              description: `Change detected on ${isPricing ? "pricing" : "landing"} page.`,
              sourceUrl: url,
              detectedAt: new Date(),
            },
          };
        }

        await db.update(competitors).set({ lastHashed: currentHash }).where(eq(competitors.id, competitorId));
      } catch {
        continue;
      }
    }

    return { detected: false };
  } catch {
    return { detected: false, error: "Detection failed" };
  }
}

export async function detectAllMarketMoves(companyId: number): Promise<{ total: number; changes: number }> {
  try {
    const competitorList = await db.select().from(competitors).where(eq(competitors.companyId, companyId));
    let changes = 0;

    for (const competitor of competitorList) {
      const result = await detectMarketMove(competitor.id);
      if (result.detected) changes++;
    }

    return { total: competitorList.length, changes };
  } catch {
    return { total: 0, changes: 0 };
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
