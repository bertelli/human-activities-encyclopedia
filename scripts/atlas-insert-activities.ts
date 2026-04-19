import { eq, sql as rawSql } from "drizzle-orm";
import { db, schema } from "../src/db";
import { slugify } from "../src/lib/slug";

type Incoming = {
  name: string;
  categorySlug: string;
  parentSlug?: string | null;
};

function readStdin(): Promise<string> {
  return new Promise((resolve, reject) => {
    let buf = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (c) => (buf += c));
    process.stdin.on("end", () => resolve(buf));
    process.stdin.on("error", reject);
  });
}

function extractJson(raw: string): unknown {
  const trimmed = raw.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fence) return JSON.parse(fence[1].trim());
    const first = trimmed.indexOf("{");
    const last = trimmed.lastIndexOf("}");
    if (first !== -1 && last !== -1 && last > first) {
      return JSON.parse(trimmed.slice(first, last + 1));
    }
    throw new Error("input is not valid JSON");
  }
}

async function main() {
  const raw = await readStdin();
  const parsed = extractJson(raw) as { activities?: Incoming[] };
  const list = Array.isArray(parsed?.activities) ? parsed.activities : [];
  if (list.length === 0) {
    process.stderr.write("no activities in payload\n");
    process.exit(1);
  }

  const cats = await db.select().from(schema.categories);
  const catBySlug = new Map(cats.map((c) => [c.slug, c]));

  let inserted = 0;
  let skipped = 0;
  for (const item of list) {
    const name = typeof item.name === "string" ? item.name.trim() : "";
    const categorySlug =
      typeof item.categorySlug === "string" ? item.categorySlug.trim() : "";
    const parentSlug =
      typeof item.parentSlug === "string" && item.parentSlug.trim() !== ""
        ? item.parentSlug.trim()
        : null;
    if (!name || !categorySlug) {
      skipped++;
      continue;
    }
    const cat = catBySlug.get(categorySlug);
    if (!cat) {
      process.stderr.write(`skip "${name}" — unknown category "${categorySlug}"\n`);
      skipped++;
      continue;
    }
    const slug = slugify(name);

    const existing = await db.execute<{ id: number }>(rawSql`
      SELECT id FROM activities WHERE slug = ${slug} LIMIT 1
    `);
    if (existing.length > 0) {
      skipped++;
      continue;
    }

    await db.insert(schema.activities).values({
      name,
      slug,
      icon: "",
      description: "",
      categoryId: cat.id,
      parentSlug,
    });
    inserted++;
  }

  process.stdout.write(
    `inserted=${inserted} skipped=${skipped} total=${list.length}\n`
  );
  process.exit(inserted > 0 ? 0 : 2);
}

main().catch((e) => {
  process.stderr.write(`insert failed: ${(e as Error).message}\n`);
  process.exit(1);
});
