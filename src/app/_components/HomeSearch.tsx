"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

type Result = {
  id: number;
  name: string;
  slug: string;
  category_name: string;
};

export function HomeSearch() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const seq = useRef(0);

  useEffect(() => {
    const query = q.trim();
    if (query.length < 2) {
      setResults([]);
      return;
    }
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
        if (seq.current === mySeq) setResults(data.results);
      } catch {}
    }, 150);
    return () => {
      controller.abort();
      clearTimeout(t);
    };
  }, [q]);

  return (
    <div>
      <div className="relative">
        <input
          className="w-full border border-black bg-white text-black pl-3 pr-10 py-2 outline-none box-border"
          placeholder="Search hobby..."
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
            className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 block text-black hover:bg-black hover:text-white border border-black bg-white p-0 overflow-hidden"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="block w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              <line
                x1="7"
                y1="7"
                x2="17"
                y2="17"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
              <line
                x1="17"
                y1="7"
                x2="7"
                y2="17"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </div>

      {q.trim().length >= 2 && (
        <section className="mt-6">
          <h2 className="m-0 mb-2 font-normal text-black">
            Results
            <span className="text-[#757575]"> ({results.length})</span>
          </h2>
          {results.length === 0 ? (
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
      )}
    </div>
  );
}
