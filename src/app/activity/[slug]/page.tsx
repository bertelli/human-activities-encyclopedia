import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getActivityBySlug } from "@/lib/queries";
import { CategoryIcon } from "@/app/_components/CategoryIcon";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const activity = await getActivityBySlug(slug);
  if (!activity) return { title: "Not found" };
  return {
    title: `${activity.name} — Human Activity Atlas`,
    description: `Tools, glossary, and techniques for ${activity.name}.`,
  };
}

export default function ActivityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <div className="p-6">
      <Suspense
        fallback={<p className="m-0 text-[#757575]">Loading…</p>}
      >
        <ActivityContent params={params} />
      </Suspense>
    </div>
  );
}

async function ActivityContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ActivityBody slug={slug} />;
}

async function ActivityBody({ slug }: { slug: string }) {
  "use cache";
  const activity = await getActivityBySlug(slug);
  if (!activity) notFound();

  return (
    <>
      <nav className="text-black">
        <Link href="/" className="text-black no-underline hover:underline">
          Home
        </Link>
        {" / "}
        <Link
          href={`/c/${activity.categorySlug}`}
          className="text-black no-underline hover:underline"
        >
          {activity.categoryName}
        </Link>
        {activity.parent &&
          activity.parent.name.toLowerCase() !==
            activity.categoryName.toLowerCase() && (
            <>
              {" / "}
              <Link
                href={`/activity/${activity.parent.slug}`}
                className="text-black no-underline hover:underline"
              >
                {activity.parent.name}
              </Link>
            </>
          )}
      </nav>

      <header className="mt-2 mb-6 pb-4 border-b border-black">
        <div className="flex justify-center mb-3">
          <CategoryIcon
            name={activity.name}
            categoryName={activity.categoryName}
            iconVoxels={
              activity.iconVoxels as
                | import("@/lib/voxelDSL").VoxelSpec
                | null
            }
            size="lg"
          />
        </div>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="m-0 font-bold text-black text-5xl leading-[0.9] capitalize">{activity.name}</h1>
            <p className="m-0 mt-1 text-[#757575]">
              {activity.glossary.length} terms · {activity.tools.length} tools
              {activity.children.length > 0 &&
                ` · ${activity.children.length} sub-activities`}
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            {activity.prev ? (
              <Link
                href={`/activity/${activity.prev.slug}`}
                title={activity.prev.name}
                aria-label={`Previous: ${activity.prev.name}`}
                className="border border-black w-10 h-10 flex items-center justify-center text-black no-underline hover:bg-black hover:text-white"
              >
                ←
              </Link>
            ) : (
              <span
                aria-hidden
                className="border border-[#757575] w-10 h-10 flex items-center justify-center text-[#757575]"
              >
                ←
              </span>
            )}
            {activity.next ? (
              <Link
                href={`/activity/${activity.next.slug}`}
                title={activity.next.name}
                aria-label={`Next: ${activity.next.name}`}
                className="border border-black w-10 h-10 flex items-center justify-center text-black no-underline hover:bg-black hover:text-white"
              >
                →
              </Link>
            ) : (
              <span
                aria-hidden
                className="border border-[#757575] w-10 h-10 flex items-center justify-center text-[#757575]"
              >
                →
              </span>
            )}
          </div>
        </div>
      </header>

      {activity.description && (
        <section className="mb-8 md:grid md:grid-cols-2 md:gap-8">
          <div>
            {activity.description
              .split(/\n{2,}/)
              .filter((p) => p.trim().length > 0)
              .map((para, i) => (
                <p key={i} className="m-0 mb-3 last:mb-0 text-black">
                  {para}
                </p>
              ))}
          </div>
        </section>
      )}

      {activity.children.length > 0 && (
        <section className="mb-8">
          <h2 className="m-0 mb-2 font-normal text-black">Sub-activities</h2>
          <ul
            className={`list-none p-0 m-0 ${
              activity.children.length > 8 ? "md:columns-2 md:gap-8" : ""
            }`}
          >
            {activity.children.map((c) => (
              <li
                key={c.id}
                className="border-t border-black break-inside-avoid"
              >
                <Link
                  href={`/activity/${c.slug}`}
                  className="block py-2 text-[#757575] no-underline hover:underline capitalize"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {activity.tools.length > 0 && (
        <section className="mb-8">
          <h2 className="m-0 mb-2 font-bold text-black">Tools</h2>
          <ul
            className={`list-none p-0 m-0 ${
              activity.tools.length > 8 ? "md:columns-2 md:gap-8" : ""
            }`}
          >
            {activity.tools.map((t) => (
              <li
                key={t.id}
                className="text-black border-t border-black py-2 break-inside-avoid"
              >
                {t.name}
              </li>
            ))}
          </ul>
        </section>
      )}

      {activity.techniques.length > 0 && (
        <section className="mb-8">
          <h2 className="m-0 mb-2 font-bold text-black">Techniques</h2>
          <ul
            className={`list-none p-0 m-0 ${
              activity.techniques.length > 8 ? "md:columns-2 md:gap-8" : ""
            }`}
          >
            {activity.techniques.map((t) => (
              <li
                key={t.id}
                className="border-t border-black py-2 break-inside-avoid"
              >
                <span className="text-black">{t.name}</span>
                {t.description && (
                  <>
                    {" "}
                    <span className="text-[#757575]">— {t.description}</span>
                  </>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {activity.brands.length > 0 && (
        <section className="mb-8">
          <h2 className="m-0 mb-2 font-bold text-black">Brands</h2>
          <ul
            className={`list-none p-0 m-0 ${
              activity.brands.length > 8 ? "md:columns-2 md:gap-8" : ""
            }`}
          >
            {activity.brands.map((b) => (
              <li
                key={b.id}
                className="border-t border-black py-2 break-inside-avoid"
              >
                <span className="text-black">{b.name}</span>
                {b.note && (
                  <>
                    {" "}
                    <span className="text-[#757575]">— {b.note}</span>
                  </>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {activity.masters.length > 0 && (
        <section className="mb-8">
          <h2 className="m-0 mb-2 font-bold text-black">Masters</h2>
          <ul
            className={`list-none p-0 m-0 ${
              activity.masters.length > 8 ? "md:columns-2 md:gap-8" : ""
            }`}
          >
            {activity.masters.map((m) => (
              <li
                key={m.id}
                className="border-t border-black py-2 break-inside-avoid"
              >
                <span className="text-black">{m.name}</span>
                {m.note && (
                  <>
                    {" "}
                    <span className="text-[#757575]">— {m.note}</span>
                  </>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {activity.glossary.length > 0 && (
        <section>
          <h2 className="m-0 mb-2 font-bold text-black">Glossary</h2>
          <ul
            className={`list-none p-0 m-0 ${
              activity.glossary.length > 8 ? "md:columns-2 md:gap-8" : ""
            }`}
          >
            {activity.glossary.map((g) => (
              <li
                key={g.id}
                className="border-t border-black py-2 break-inside-avoid"
              >
                <span className="text-black">{g.term}</span>{" "}
                <span className="text-[#757575]">— {g.definition}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
