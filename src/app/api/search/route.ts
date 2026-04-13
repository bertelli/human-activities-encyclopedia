import { NextRequest, NextResponse } from "next/server";
import { searchActivities } from "@/lib/queries";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";
  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }
  const rows = await searchActivities(q);
  return NextResponse.json({
    results: rows.map((r) => ({
      id: Number(r.id),
      name: String(r.name),
      slug: String(r.slug),
      category_name: String(r.category_name),
    })),
  });
}
