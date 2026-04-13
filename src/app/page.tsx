import { Suspense } from "react";
import { getCategories } from "@/lib/queries";
import { HomeBrowser } from "./_components/HomeBrowser";

export default function Home() {
  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="m-0 font-normal text-black">Human Activity Atlas</h1>
        <p className="m-0 mt-1 text-[#757575]">
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
  return <HomeBrowser categories={categories} />;
}
