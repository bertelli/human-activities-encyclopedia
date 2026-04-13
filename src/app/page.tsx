import { Suspense } from "react";
import Link from "next/link";
import { getCategories } from "@/lib/queries";
import { HomeSearch } from "./_components/HomeSearch";
import { CategoryIcon } from "./_components/CategoryIcon";

export default function Home() {
  return (
    <div className="max-w-[720px] mx-auto px-4 py-6">
      <header className="mb-6">
        <h1 className="m-0 font-normal text-black">Human Activity Atlas</h1>
        <p className="m-0 mt-1 text-[#757575]">
          Every hobby, craft, and pursuit — tools, glossary, techniques.
        </p>
      </header>

      <HomeSearch />

      <Suspense
        fallback={<p className="text-[#757575] mt-6">Loading…</p>}
      >
        <Categories />
      </Suspense>
    </div>
  );
}

async function Categories() {
  "use cache";
  const categories = await getCategories();
  return (
    <nav className="mt-6">
      <h2 className="m-0 mb-2 font-normal text-black">Categories</h2>
      <ul className="list-none p-0 m-0">
        {categories.map((c) => (
          <li key={c.id} className="border-t border-black">
            <Link
              href={`/c/${c.slug}`}
              className="flex justify-between items-center py-3 text-black no-underline hover:underline"
            >
              <span className="flex items-center gap-3">
                <span className="w-14 h-14 flex items-center justify-center shrink-0">
                  <CategoryIcon name={c.name} size="sm" />
                </span>
                <span>{c.name}</span>
              </span>
              <span className="text-[#757575]">{c.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
