import { Suspense } from "react";
import { getCategories, getRandomActivity } from "@/lib/queries";
import { HomeBrowser } from "./_components/HomeBrowser";
import { FeaturedActivity } from "./_components/FeaturedActivity";

export default function Home() {
  return (
    <div className="p-6">
      <Suspense fallback={<p className="m-0 text-[#757575]">Loading…</p>}>
        <HomeShell />
      </Suspense>
    </div>
  );
}

async function HomeShell() {
  const [categories, featured] = await Promise.all([
    getCategories(),
    getRandomActivity(),
  ]);
  const total = categories.reduce((sum, c) => sum + c.count, 0);
  return (
    <>
      <header className="mb-16">
        <h1
          className="atlas-title m-0 mb-8 text-black"
          style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: 700,
          }}
        >
          The Incomplete Atlas of Doing
        </h1>
      </header>

      <HomeBrowser categories={categories} total={total} featured={featured} />
    </>
  );
}
