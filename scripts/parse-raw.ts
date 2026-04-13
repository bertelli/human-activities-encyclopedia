import { readFileSync, writeFileSync } from "node:fs";
import { DATA } from "../src/data/activities";
import { slugify } from "../src/lib/slug";

const raw = readFileSync(
  new URL("./_raw_activities.txt", import.meta.url),
  "utf8"
);

type Entry = { name: string; category: string };

const lines = raw.split("\n").map((l) => l.trim()).filter(Boolean);
const entries: Entry[] = [];
let currentCategory = "";

for (const line of lines) {
  if (/^[A-Z &/()\-–]+$/.test(line) && !line.includes(",")) {
    currentCategory = toTitleCase(line);
    continue;
  }
  for (const part of line.split(",")) {
    const name = part.trim();
    if (!name) continue;
    entries.push({ name, category: currentCategory });
  }
}

function toTitleCase(s: string) {
  return s
    .toLowerCase()
    .split(" ")
    .map((w) =>
      w === "&"
        ? "&"
        : w.charAt(0).toUpperCase() + w.slice(1)
    )
    .join(" ");
}

const existingSlugs = new Set(DATA.map((d) => slugify(d.name)));
const existingNames = new Map(DATA.map((d) => [d.name.toLowerCase(), d.name]));

const added: Entry[] = [];
const seen = new Set<string>();
for (const e of entries) {
  const slug = slugify(e.name);
  if (existingSlugs.has(slug) || seen.has(slug)) continue;
  seen.add(slug);
  added.push(e);
}

console.log(`Existing: ${DATA.length}`);
console.log(`Parsed new: ${entries.length}`);
console.log(`Unique new (deduped): ${added.length}`);

const output = added.map((e) => ({
  name: e.name,
  category: e.category,
  icon: "",
  tools: [] as string[],
  glossary: {} as Record<string, string>,
}));

writeFileSync(
  new URL("../src/data/new-activities.json", import.meta.url),
  JSON.stringify(output, null, 2)
);
console.log(`Wrote ${output.length} entries to src/data/new-activities.json`);
