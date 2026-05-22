export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { companies } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  const { db } = await import("@/db");
  const { detectAllMarketMoves } = await import("@/app/actions");

  const CRON_SECRET = process.env.CRON_SECRET;

  if (CRON_SECRET) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const { searchParams } = new URL(request.url);
  const domain = searchParams.get("domain");

  if (!domain) {
    const allCompanies = await db.select().from(companies);
    let totalScanned = 0;
    let totalChanges = 0;

    for (const company of allCompanies) {
      if (company.id) {
        const result = await detectAllMarketMoves(company.id);
        totalScanned += result.total;
        totalChanges += result.changes;
      }
    }

    return NextResponse.json({ scanned: totalScanned, changes: totalChanges });
  }

  const company = await db.select().from(companies).where(eq(companies.domain, domain));
  if (company.length === 0 || !company[0].id) {
    return NextResponse.json({ error: "Company not found" }, { status: 404 });
  }

  const result = await detectAllMarketMoves(company[0].id);
  return NextResponse.json(result);
}
