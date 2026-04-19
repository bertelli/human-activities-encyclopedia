"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { CategoryIcon } from "./CategoryIcon";

type Result = {
  id: number;
  name: string;
  slug: string;
  category_name: string;
};

type Category = {
  id: number;
  name: string;
  slug: string;
  count: number;
};

export function HomeBrowser({
  categories,
  total,
}: {
  categories: Category[];
  total: number;
}) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [searching, setSearching] = useState(false);
  const seq = useRef(0);

  useEffect(() => {
    const query = q.trim();
    if (query.length < 2) {
      setResults([]);
      setSearching(false);
      return;
    }
    setSearching(true);
    const mySeq = ++seq.current;
    const controller = new AbortController();
    const t = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`,
          { signal: controller.signal }
        );
        if (!res.ok) return;
        const data = (await res.json()) as { results: Result[] };
        if (seq.current === mySeq) {
          setResults(data.results);
          setSearching(false);
        }
      } catch {}
    }, 150);
    return () => {
      controller.abort();
      clearTimeout(t);
    };
  }, [q]);

  const showResults = q.trim().length >= 2;

  return (
    <div>
      <div className="relative">
        <input
          className="w-full border border-black bg-white text-black pl-4 pr-12 py-4 text-lg outline-none box-border"
          placeholder={`Search ${total.toLocaleString()} hobbies, crafts, and human pursuits`}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        {q && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setQ("");
              setResults([]);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-black hover:bg-black hover:text-white border border-black bg-white leading-none"
          >
            ×
          </button>
        )}
      </div>

      {showResults ? (
        <section className="mt-6">
          <h2 className="m-0 mb-2 font-normal text-black">
            Results
            <span className="text-[#757575]"> ({results.length})</span>
          </h2>
          {searching && results.length === 0 ? null : results.length === 0 ? (
            <p className="m-0 text-[#757575] border-t border-black pt-3">
              No activity matches &quot;{q.trim()}&quot;.
            </p>
          ) : (
            <ul className="list-none p-0 m-0">
              {results.map((r) => (
                <li key={r.id} className="border-t border-black">
                  <Link
                    href={`/activity/${r.slug}`}
                    className="flex justify-between items-center py-3 text-black no-underline hover:underline"
                  >
                    <span className="capitalize">{r.name.toLowerCase()}</span>
                    <span className="text-[#757575] capitalize">{r.category_name.toLowerCase()}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : (
        <nav className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/c/${c.slug}`}
                className="group aspect-square relative flex items-center justify-center text-black no-underline rounded-sm hover:bg-[#f5f5f5] transition-colors"
              >
                <span className="w-32 h-32 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.34,2.2,0.64,1)] group-hover:scale-115">
                  <CategoryIcon name={c.name} size="lg-home" />
                </span>
                <span className="absolute bottom-5 left-0 right-0 text-sm text-center leading-tight px-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">{c.name}</span>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}
