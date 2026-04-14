import { eq } from "drizzle-orm";
import { db, schema } from "../src/db";
import { buildFromSpec, type VoxelSpec } from "../src/lib/voxelDSL";

type Payload = {
  id: number;
  description: string;
  tools: string[];
  glossary: Array<{ term: string; definition: string }>;
  brands: Array<{ name: string; note?: string }>;
  techniques: Array<{ name: string; description?: string }>;
  masters: Array<{ name: string; note?: string }>;
  iconVoxels: VoxelSpec;
};

function readStdin(): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => {
      data += chunk;
    });
    process.stdin.on("end", () => resolve(data));
    process.stdin.on("error", reject);
  });
}

function extractJson(raw: string): unknown {
  const trimmed = raw.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    // Strip code fences if present.
    const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fence) return JSON.parse(fence[1].trim());
    // Extract the outermost JSON object.
    const first = trimmed.indexOf("{");
    const last = trimmed.lastIndexOf("}");
    if (first !== -1 && last !== -1 && last > first) {
      return JSON.parse(trimmed.slice(first, last + 1));
    }
    throw new Error("input is not valid JSON");
  }
}

function validate(p: unknown): Payload {
  if (!p || typeof p !== "object") throw new Error("payload must be an object");
  const o = p as Record<string, unknown>;
  const id = Number(o.id);
  if (!Number.isInteger(id) || id <= 0) throw new Error("invalid id");

  const description = String(o.description ?? "").trim();
  if (description.length < 120)
    throw new Error(`description too short (${description.length} chars)`);

  const tools = Array.isArray(o.tools)
    ? o.tools.filter((t): t is string => typeof t === "string" && t.trim() !== "")
    : [];
  if (tools.length < 5) throw new Error(`tools too few (${tools.length})`);

  const glossaryRaw = Array.isArray(o.glossary) ? o.glossary : [];
  const glossary = glossaryRaw
    .map((g) => g as { term?: unknown; definition?: unknown })
    .filter(
      (g): g is { term: string; definition: string } =>
        typeof g.term === "string" &&
        typeof g.definition === "string" &&
        g.term.trim() !== "" &&
        g.definition.trim() !== ""
    );
  if (glossary.length < 8)
    throw new Error(`glossary too few (${glossary.length})`);

  const brandsRaw = Array.isArray(o.brands) ? o.brands : [];
  const brands = brandsRaw
    .map((b) => b as { name?: unknown; note?: unknown })
    .filter((b): b is { name: string; note?: string } => typeof b.name === "string")
    .map((b) => ({ name: b.name.trim(), note: typeof b.note === "string" ? b.note : "" }))
    .filter((b) => b.name !== "");

  const techniquesRaw = Array.isArray(o.techniques) ? o.techniques : [];
  const techniques = techniquesRaw
    .map((t) => t as { name?: unknown; description?: unknown })
    .filter((t): t is { name: string; description?: string } => typeof t.name === "string")
    .map((t) => ({
      name: t.name.trim(),
      description: typeof t.description === "string" ? t.description : "",
    }))
    .filter((t) => t.name !== "");

  const mastersRaw = Array.isArray(o.masters) ? o.masters : [];
  const masters = mastersRaw
    .map((m) => m as { name?: unknown; note?: unknown })
    .filter((m): m is { name: string; note?: string } => typeof m.name === "string")
    .map((m) => ({ name: m.name.trim(), note: typeof m.note === "string" ? m.note : "" }))
    .filter((m) => m.name !== "");

  const iconVoxels = o.iconVoxels as VoxelSpec | undefined;
  if (!iconVoxels || !Array.isArray((iconVoxels as VoxelSpec).primitives))
    throw new Error("iconVoxels.primitives missing");
  const built = buildFromSpec(iconVoxels);
  if (!built || built.length < 30)
    throw new Error(`iconVoxels builds too few voxels (${built ? built.length : 0})`);

  return { id, description, tools, glossary, brands, techniques, masters, iconVoxels };
}

async function main() {
  const raw = await readStdin();
  const data = validate(extractJson(raw));

  const [exists] = await db
    .select({ id: schema.activities.id })
    .from(schema.activities)
    .where(eq(schema.activities.id, data.id))
    .limit(1);
  if (!exists) throw new Error(`activity id ${data.id} not found`);

  await db
    .update(schema.activities)
    .set({ description: data.description, iconVoxels: data.iconVoxels })
    .where(eq(schema.activities.id, data.id));

  await db.delete(schema.tools).where(eq(schema.tools.activityId, data.id));
  if (data.tools.length > 0) {
    await db.insert(schema.tools).values(
      data.tools.map((name, i) => ({
        activityId: data.id,
        name,
        position: i,
      }))
    );
  }

  await db
    .delete(schema.glossaryTerms)
    .where(eq(schema.glossaryTerms.activityId, data.id));
  if (data.glossary.length > 0) {
    await db.insert(schema.glossaryTerms).values(
      data.glossary.map((g, i) => ({
        activityId: data.id,
        term: g.term,
        definition: g.definition,
        position: i,
      }))
    );
  }

  await db.delete(schema.brands).where(eq(schema.brands.activityId, data.id));
  if (data.brands.length > 0) {
    await db.insert(schema.brands).values(
      data.brands.map((b, i) => ({
        activityId: data.id,
        name: b.name,
        note: b.note ?? "",
        position: i,
      }))
    );
  }

  await db
    .delete(schema.techniques)
    .where(eq(schema.techniques.activityId, data.id));
  if (data.techniques.length > 0) {
    await db.insert(schema.techniques).values(
      data.techniques.map((t, i) => ({
        activityId: data.id,
        name: t.name,
        description: t.description ?? "",
        position: i,
      }))
    );
  }

  await db.delete(schema.masters).where(eq(schema.masters.activityId, data.id));
  if (data.masters.length > 0) {
    await db.insert(schema.masters).values(
      data.masters.map((m, i) => ({
        activityId: data.id,
        name: m.name,
        note: m.note ?? "",
        position: i,
      }))
    );
  }

  process.stdout.write(
    `wrote id=${data.id} description=${data.description.length}c tools=${data.tools.length} glossary=${data.glossary.length} brands=${data.brands.length} techniques=${data.techniques.length} masters=${data.masters.length} voxels=${buildFromSpec(data.iconVoxels)?.length ?? 0}\n`
  );
  process.exit(0);
}

main().catch((e) => {
  process.stderr.write(`write-content failed: ${(e as Error).message}\n`);
  process.exit(1);
});
