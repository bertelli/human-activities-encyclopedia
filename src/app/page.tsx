import { Suspense } from "react";
import { getCategories } from "@/lib/queries";
import { HomeBrowser } from "./_components/HomeBrowser";
import { VoxelTitle } from "./_components/VoxelTitle";

export default function Home() {
  return (
    <div className="p-6">
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

      <Suspense
        fallback={
          <div>
            <div className="w-full border border-black bg-white text-[#757575] pl-3 pr-10 py-2 box-border">
              Loading…
            </div>
          </div>
        }
      >
        <BrowserShell />
      </Suspense>

      <footer aria-hidden className="flex flex-col gap-4 mt-16">
        {["The", "Incomplete", "Atlas", "of", "Doing"].map((word) => (
          <VoxelTitle key={word} text={word} />
        ))}
      </footer>
    </div>
  );
}

async function BrowserShell() {
  "use cache";
  const categories = await getCategories();
  const total = categories.reduce((sum, c) => sum + c.count, 0);
  return <HomeBrowser categories={categories} total={total} />;
}
