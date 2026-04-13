import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategoryBySlug } from "@/lib/queries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = await getCategoryBySlug(slug);
  if (!cat) return { title: "Not found" };
  return {
    title: `${cat.name} — Human Activity Atlas`,
    description: `Activities in ${cat.name}.`,
  };
}

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <div className="max-w-[720px] mx-auto px-4 py-6">
      <Link href="/" className="text-black no-underline hover:underline">
        ← Atlas
      </Link>
      <Suspense fallback={<p className="text-[#757575] mt-6">Loading…</p>}>
        <CategoryContent params={params} />
      </Suspense>
    </div>
  );
}

async function CategoryContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <CategoryBody slug={slug} />;
}

async function CategoryBody({ slug }: { slug: string }) {
  "use cache";
  const cat = await getCategoryBySlug(slug);
  if (!cat) notFound();

  const activitiesBySlug = new Map(cat.activities.map((a) => [a.slug, a]));
  const parents = cat.activities
    .filter((a) => !a.parentSlug || !activitiesBySlug.has(a.parentSlug))
    .sort((a, b) => a.name.localeCompare(b.name));

  const childrenByParent = new Map<
    string,
    Array<(typeof cat.activities)[number]>
  >();
  for (const a of cat.activities) {
    if (a.parentSlug && activitiesBySlug.has(a.parentSlug)) {
      const arr = childrenByParent.get(a.parentSlug) ?? [];
      arr.push(a);
      childrenByParent.set(a.parentSlug, arr);
    }
  }

  const letters = Array.from(
    new Set(
      parents.map((a) => a.name[0].toUpperCase()).filter((c) => /[A-Z]/.test(c))
    )
  ).sort();

  return (
    <>
      <header className="mt-6 mb-4 pb-4 border-b border-black">
        <h1 className="m-0 font-normal text-black">{cat.name}</h1>
        <p className="m-0 mt-1 text-[#757575]">
          {cat.activities.length} activities
        </p>
      </header>

      <nav className="mb-4 flex flex-wrap gap-2">
        {letters.map((l) => (
          <a
            key={l}
            href={`#${l}`}
            className="text-black no-underline border border-black px-2 py-1 hover:bg-black hover:text-white"
          >
            {l}
          </a>
        ))}
      </nav>

      <ul className="list-none p-0 m-0">
        {parents.map((p) => {
          const children = childrenByParent.get(p.slug) ?? [];
          const letter = p.name[0].toUpperCase();
          return (
            <li
              key={p.id}
              id={/[A-Z]/.test(letter) ? letter : undefined}
              className="border-t border-black"
            >
              <Link
                href={`/activity/${p.slug}`}
                className="block py-3 text-black no-underline hover:underline"
              >
                {p.name}
                {children.length > 0 && (
                  <span className="text-[#757575]">
                    {" "}
                    ({children.length} sub)
                  </span>
                )}
              </Link>
              {children.length > 0 && (
                <ul className="list-none p-0 m-0 pb-2">
                  {children
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((c) => (
                      <li key={c.id}>
                        <Link
                          href={`/activity/${c.slug}`}
                          className="block pl-6 py-1 text-[#757575] no-underline hover:text-black hover:underline"
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
