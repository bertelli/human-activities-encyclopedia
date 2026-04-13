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

  const [tools, glossary, children] = await Promise.all([
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

  return { ...activity, tools, glossary, children, parent };
}

export async function searchActivities(q: string) {
  const like = `%${q.toLowerCase()}%`;
  return db.execute<{
    id: number;
    name: string;
    slug: string;
    category_name: string;
  }>(sql`
    SELECT a.id, a.name, a.slug, c.name AS category_name
    FROM activities a
    JOIN categories c ON c.id = a.category_id
    WHERE LOWER(a.name) LIKE ${like}
    ORDER BY a.name ASC
    LIMIT 50
  `);
}
