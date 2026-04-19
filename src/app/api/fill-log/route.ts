import { NextResponse } from "next/server";
import { getFillLog, getFillStats } from "@/lib/queries";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const limit = Math.min(
      200,
      Math.max(1, Number(url.searchParams.get("limit") ?? 50))
    );
    const [rows, stats] = await Promise.all([
      getFillLog(limit),
      getFillStats(),
    ]);
    return NextResponse.json({
      stats,
      recent: rows.map((r) => ({
        id: Number(r.id),
        name: String(r.name),
        slug: String(r.slug),
        category: String(r.category_name),
        updatedAt: r.updated_at ? new Date(r.updated_at as unknown as string).toISOString() : null,
        counts: {
          tools: Number(r.tools),
          glossary: Number(r.glossary),
          brands: Number(r.brands),
          techniques: Number(r.techniques),
          masters: Number(r.masters),
        },
      })),
    });
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message },
      { status: 500 }
    );
  }
}
