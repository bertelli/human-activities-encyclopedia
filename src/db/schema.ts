import {
  pgTable,
  serial,
  text,
  integer,
  uniqueIndex,
  index,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const categories = pgTable(
  "categories",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
  },
  (t) => [uniqueIndex("categories_slug_idx").on(t.slug)]
);

export const activities = pgTable(
  "activities",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    icon: text("icon").notNull().default(""),
    description: text("description").notNull().default(""),
    iconVoxels: jsonb("icon_voxels"),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
    parentSlug: text("parent_slug"),
  },
  (t) => [
    uniqueIndex("activities_slug_idx").on(t.slug),
    index("activities_name_idx").on(t.name),
    index("activities_category_idx").on(t.categoryId),
    index("activities_parent_idx").on(t.parentSlug),
  ]
);

export const tools = pgTable(
  "tools",
  {
    id: serial("id").primaryKey(),
    activityId: integer("activity_id")
      .notNull()
      .references(() => activities.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    position: integer("position").notNull().default(0),
  },
  (t) => [index("tools_activity_idx").on(t.activityId)]
);

export const glossaryTerms = pgTable(
  "glossary_terms",
  {
    id: serial("id").primaryKey(),
    activityId: integer("activity_id")
      .notNull()
      .references(() => activities.id, { onDelete: "cascade" }),
    term: text("term").notNull(),
    definition: text("definition").notNull(),
    position: integer("position").notNull().default(0),
  },
  (t) => [index("glossary_activity_idx").on(t.activityId)]
);

export const brands = pgTable(
  "brands",
  {
    id: serial("id").primaryKey(),
    activityId: integer("activity_id")
      .notNull()
      .references(() => activities.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    note: text("note").notNull().default(""),
    position: integer("position").notNull().default(0),
  },
  (t) => [index("brands_activity_idx").on(t.activityId)]
);

export const techniques = pgTable(
  "techniques",
  {
    id: serial("id").primaryKey(),
    activityId: integer("activity_id")
      .notNull()
      .references(() => activities.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description").notNull().default(""),
    position: integer("position").notNull().default(0),
  },
  (t) => [index("techniques_activity_idx").on(t.activityId)]
);

export const masters = pgTable(
  "masters",
  {
    id: serial("id").primaryKey(),
    activityId: integer("activity_id")
      .notNull()
      .references(() => activities.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    note: text("note").notNull().default(""),
    position: integer("position").notNull().default(0),
  },
  (t) => [index("masters_activity_idx").on(t.activityId)]
);

export const categoriesRelations = relations(categories, ({ many }) => ({
  activities: many(activities),
}));

export const activitiesRelations = relations(activities, ({ one, many }) => ({
  category: one(categories, {
    fields: [activities.categoryId],
    references: [categories.id],
  }),
  tools: many(tools),
  glossary: many(glossaryTerms),
  brands: many(brands),
  techniques: many(techniques),
  masters: many(masters),
}));

export const toolsRelations = relations(tools, ({ one }) => ({
  activity: one(activities, {
    fields: [tools.activityId],
    references: [activities.id],
  }),
}));

export const glossaryRelations = relations(glossaryTerms, ({ one }) => ({
  activity: one(activities, {
    fields: [glossaryTerms.activityId],
    references: [activities.id],
  }),
}));

export const brandsRelations = relations(brands, ({ one }) => ({
  activity: one(activities, {
    fields: [brands.activityId],
    references: [activities.id],
  }),
}));

export const techniquesRelations = relations(techniques, ({ one }) => ({
  activity: one(activities, {
    fields: [techniques.activityId],
    references: [activities.id],
  }),
}));

export const mastersRelations = relations(masters, ({ one }) => ({
  activity: one(activities, {
    fields: [masters.activityId],
    references: [activities.id],
  }),
}));

export type Activity = typeof activities.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Tool = typeof tools.$inferSelect;
export type GlossaryTerm = typeof glossaryTerms.$inferSelect;
export type Brand = typeof brands.$inferSelect;
export type Technique = typeof techniques.$inferSelect;
export type Master = typeof masters.$inferSelect;
