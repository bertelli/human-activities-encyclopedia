import { cacheLife, cacheTag } from "next/cache";
import { asc, eq, isNull, sql } from "drizzle-orm";
import { db, schema } from "@/db";

export async function getCategories() {
  "use cache";
  cacheLife("hours");
  cacheTag("categories");

  const rows = await db.execute<{
    id: number;
    name: string;
    slug: string;
    cnt: string;
  }>(sql`
    SELECT c.id, c.name, c.slug, COUNT(a.id) AS cnt
    FROM categories c
    LEFT JOIN activities a ON a.category_id = c.id
    GROUP BY c.id, c.name, c.slug
    ORDER BY COUNT(a.id) DESC, c.name ASC
  `);
  return rows.map((r) => ({
    id: Number(r.id),
    name: String(r.name),
    slug: String(r.slug),
    count: Number(r.cnt),
  }));
}

export async function getCategoryBySlug(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("categories", `category-${slug}`);

  const [cat] = await db
    .select()
    .from(schema.categories)
    .where(eq(schema.categories.slug, slug))
    .limit(1);
  if (!cat) return null;

  const activities = await db
    .select({
      id: schema.activities.id,
      name: schema.activities.name,
      slug: schema.activities.slug,
      icon: schema.activities.icon,
      parentSlug: schema.activities.parentSlug,
    })
    .from(schema.activities)
    .where(eq(schema.activities.categoryId, cat.id))
    .orderBy(asc(schema.activities.name));

  return { ...cat, activities };
}

export async function getActivityBySlug(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("activities", `activity-${slug}`);

  const [activity] = await db
    .select({
      id: schema.activities.id,
      name: schema.activities.name,
      slug: schema.activities.slug,
      icon: schema.activities.icon,
      description: schema.activities.description,
      iconVoxels: schema.activities.iconVoxels,
      parentSlug: schema.activities.parentSlug,
      categoryName: schema.categories.name,
      categorySlug: schema.categories.slug,
    })
    .from(schema.activities)
    .innerJoin(
      schema.categories,
      eq(schema.activities.categoryId, schema.categories.id)
    )
    .where(eq(schema.activities.slug, slug))
    .limit(1);

  if (!activity) return null;

  const [tools, glossary, brands, techniques, masters, children] = await Promise.all([
    db
      .select()
      .from(schema.tools)
      .where(eq(schema.tools.activityId, activity.id))
      .orderBy(asc(schema.tools.position)),
    db
      .select()
      .from(schema.glossaryTerms)
      .where(eq(schema.glossaryTerms.activityId, activity.id))
      .orderBy(asc(schema.glossaryTerms.position)),
    db
      .select()
      .from(schema.brands)
      .where(eq(schema.brands.activityId, activity.id))
      .orderBy(asc(schema.brands.position)),
    db
      .select()
      .from(schema.techniques)
      .where(eq(schema.techniques.activityId, activity.id))
      .orderBy(asc(schema.techniques.position)),
    db
      .select()
      .from(schema.masters)
      .where(eq(schema.masters.activityId, activity.id))
      .orderBy(asc(schema.masters.position)),
    db
      .select({
        id: schema.activities.id,
        name: schema.activities.name,
        slug: schema.activities.slug,
      })
      .from(schema.activities)
      .where(eq(schema.activities.parentSlug, activity.slug))
      .orderBy(asc(schema.activities.name)),
  ]);

  let parent: { name: string; slug: string } | null = null;
  if (activity.parentSlug) {
    const [p] = await db
      .select({
        name: schema.activities.name,
        slug: schema.activities.slug,
      })
      .from(schema.activities)
      .where(eq(schema.activities.slug, activity.parentSlug))
      .limit(1);
    parent = p ?? null;
  }

  const siblings = await db.execute<{
    name: string;
    slug: string;
  }>(sql`
    SELECT name, slug FROM activities
    WHERE category_id = (SELECT id FROM categories WHERE slug = ${activity.categorySlug})
    ORDER BY LOWER(name) ASC
  `);
  const idx = siblings.findIndex((s) => s.slug === activity.slug);
  const prev =
    idx > 0
      ? {
          name: String(siblings[idx - 1].name),
          slug: String(siblings[idx - 1].slug),
        }
      : null;
  const next =
    idx >= 0 && idx < siblings.length - 1
      ? {
          name: String(siblings[idx + 1].name),
          slug: String(siblings[idx + 1].slug),
        }
      : null;

  return {
    ...activity,
    tools,
    glossary,
    brands,
    techniques,
    masters,
    children,
    parent,
    prev,
    next,
  };
}

export async function getFillLog(limit = 50) {
  return db.execute<{
    id: number;
    name: string;
    slug: string;
    category_name: string;
    updated_at: string;
    tools: number;
    glossary: number;
    brands: number;
    techniques: number;
    masters: number;
  }>(sql`
    SELECT
      a.id, a.name, a.slug, c.name AS category_name, a.updated_at,
      (SELECT COUNT(*) FROM tools t WHERE t.activity_id = a.id) AS tools,
      (SELECT COUNT(*) FROM glossary_terms g WHERE g.activity_id = a.id) AS glossary,
      (SELECT COUNT(*) FROM brands b WHERE b.activity_id = a.id) AS brands,
      (SELECT COUNT(*) FROM techniques tq WHERE tq.activity_id = a.id) AS techniques,
      (SELECT COUNT(*) FROM masters m WHERE m.activity_id = a.id) AS masters
    FROM activities a
    JOIN categories c ON c.id = a.category_id
    WHERE a.updated_at IS NOT NULL
    ORDER BY a.updated_at DESC
    LIMIT ${limit}
  `);
}

export async function getFillStats() {
  const rows = await db.execute<{
    total: number;
    filled: number;
    last_hour: number;
    last_day: number;
  }>(sql`
    SELECT
      (SELECT COUNT(*) FROM activities) AS total,
      (SELECT COUNT(*) FROM activities
         WHERE COALESCE(TRIM(description),'')!='' AND icon_voxels IS NOT NULL) AS filled,
      (SELECT COUNT(*) FROM activities
         WHERE updated_at > NOW() - INTERVAL '1 hour') AS last_hour,
      (SELECT COUNT(*) FROM activities
         WHERE updated_at > NOW() - INTERVAL '1 day') AS last_day
  `);
  const r = rows[0];
  return {
    total: Number(r.total),
    filled: Number(r.filled),
    lastHour: Number(r.last_hour),
    lastDay: Number(r.last_day),
  };
}

export async function getRandomActivity() {
  const rows = await db.execute<{
    id: number;
    name: string;
    slug: string;
    description: string;
    category_name: string;
    icon_voxels: unknown;
  }>(sql`
    SELECT a.id, a.name, a.slug, a.description, c.name AS category_name, a.icon_voxels
    FROM activities a
    JOIN categories c ON c.id = a.category_id
    WHERE a.description IS NOT NULL AND LENGTH(TRIM(a.description)) > 100
      AND a.icon_voxels IS NOT NULL
    ORDER BY RANDOM()
    LIMIT 1
  `);
  return rows[0] ?? null;
}

export async function searchActivities(q: string) {
  const query = q.trim().toLowerCase();
  if (query.length === 0) return [];

  const like = `%${query}%`;
  const prefix = `${query}%`;
  const maxEdit = query.length <= 4 ? 2 : query.length <= 7 ? 3 : 4;

  return db.execute<{
    id: number;
    name: string;
    slug: string;
    category_name: string;
  }>(sql`
    WITH scored AS (
      SELECT
        a.id,
        a.name,
        a.slug,
        c.name AS category_name,
        LOWER(a.name) AS lname,
        similarity(LOWER(a.name), ${query}) AS trg,
        word_similarity(${query}, LOWER(a.name)) AS wtrg,
        levenshtein_less_equal(LOWER(a.name), ${query}, ${maxEdit}) AS lev_full,
        (
          SELECT MIN(levenshtein_less_equal(w, ${query}, ${maxEdit}))
          FROM regexp_split_to_table(LOWER(a.name), '[^a-z0-9]+') AS w
          WHERE length(w) > 0
        ) AS lev_word
      FROM activities a
      JOIN categories c ON c.id = a.category_id
    )
    SELECT id, name, slug, category_name
    FROM scored
    WHERE lname LIKE ${like}
       OR lname % ${query}
       OR wtrg > 0.35
       OR lev_full <= ${maxEdit}
       OR lev_word <= ${maxEdit}
    ORDER BY
      (lname = ${query})::int DESC,
      (lname LIKE ${prefix})::int DESC,
      (lname ~ ('(^|\\s)' || ${query} || '(\\s|$)'))::int DESC,
      (lname ~ ('(^|\\s)' || ${query}))::int DESC,
      (lname LIKE ${like})::int DESC,
      COALESCE(lev_word, 99) ASC,
      lev_full ASC NULLS LAST,
      GREATEST(trg, wtrg) DESC,
      name ASC
    LIMIT 50
  `);
}
