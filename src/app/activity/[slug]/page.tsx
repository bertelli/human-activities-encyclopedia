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
            size="lg"
          />
        </div>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="m-0 font-normal text-black text-5xl leading-[0.9]">{activity.name}</h1>
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
        <section className="mb-8">
          <p className="m-0 text-black">{activity.description}</p>
        </section>
      )}

      {activity.children.length > 0 && (
        <section className="mb-8">
          <h2 className="m-0 mb-2 font-normal text-black">Sub-activities</h2>
          <ul className="list-none p-0 m-0">
            {activity.children.map((c) => (
              <li key={c.id} className="border-t border-black">
                <Link
                  href={`/activity/${c.slug}`}
                  className="block py-2 text-black no-underline hover:underline"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mb-8">
        <h2 className="m-0 mb-2 font-normal text-black">Tools</h2>
        {activity.tools.length === 0 ? (
          <p className="m-0 text-[#757575]">Not yet documented.</p>
        ) : (
          <ul className="list-none p-0 m-0">
            {activity.tools.map((t) => (
              <li
                key={t.id}
                className="text-black border-t border-black py-2"
              >
                {t.name}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="m-0 mb-2 font-normal text-black">Glossary</h2>
        {activity.glossary.length === 0 ? (
          <p className="m-0 text-[#757575]">Not yet documented.</p>
        ) : (
          <ul className="list-none p-0 m-0">
            {activity.glossary.map((g) => (
              <li key={g.id} className="border-t border-black py-2">
                <span className="text-black">{g.term}</span>{" "}
                <span className="text-[#757575]">— {g.definition}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
