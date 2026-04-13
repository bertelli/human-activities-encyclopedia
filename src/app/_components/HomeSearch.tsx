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
      <input
        className="w-full border border-black bg-white text-black px-3 py-2 outline-none box-border"
        placeholder="Search hobby..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      {results.length > 0 && (
        <ul className="list-none p-0 m-0 mt-2 border border-black">
          {results.map((r) => (
            <li key={r.id} className="border-t border-black first:border-t-0">
              <Link
                href={`/activity/${r.slug}`}
                className="flex justify-between px-3 py-2 text-black no-underline hover:bg-black hover:text-white"
              >
                <span>{r.name}</span>
                <span className="text-[#757575]">{r.category_name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
