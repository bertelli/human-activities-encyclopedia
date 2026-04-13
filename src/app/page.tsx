import { Suspense } from "react";
import { getCategories } from "@/lib/queries";
import { HomeBrowser } from "./_components/HomeBrowser";

export default function Home() {
  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="atlas-title m-0 mb-8 font-normal text-black">
          The Incomplete Atlas of Doing
        </h1>
        <p className="m-0 text-[#757575]">
          Every hobby, craft, and pursuit — tools, glossary, techniques.
        </p>
      </header>

      <Suspense
        fallback={<p className="text-[#757575] mt-6">Loading…</p>}
      >
        <BrowserShell />
      </Suspense>
    </div>
  );
}

async function BrowserShell() {
  "use cache";
  const categories = await getCategories();
  const total = categories.reduce((sum, c) => sum + c.count, 0);
  return <HomeBrowser categories={categories} total={total} />;
}
