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
          className="w-full border border-black bg-white text-black pl-3 pr-10 py-2 outline-none box-border"
          placeholder={`Search ${total.toLocaleString()} hobbies...`}
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
                    <span>{r.name}</span>
                    <span className="text-[#757575]">{r.category_name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : (
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
      )}
    </div>
  );
}
