import { Suspense } from "react";
import { getCategories } from "@/lib/queries";
import { HomeBrowser } from "./_components/HomeBrowser";
import { VoxelTitle } from "./_components/VoxelTitle";

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
  "use cache";
  const categories = await getCategories();
  const total = categories.reduce((sum, c) => sum + c.count, 0);
  return (
    <>
      <header className="mb-6">
        <h1
          className="atlas-title m-0 mb-8 text-black"
          style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: 700,
          }}
        >
          The Incomplete Atlas of Doing
        </h1>
        <p className="m-0 text-[#757575]">
          Every hobby, craft, and pursuit — tools, glossary, techniques.
        </p>
      </header>

      <HomeBrowser categories={categories} total={total} />
    </>
  );
}
