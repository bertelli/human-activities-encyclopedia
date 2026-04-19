import { Suspense } from "react";
import Link from "next/link";
import { cacheLife, cacheTag } from "next/cache";
import type { Metadata } from "next";
import { getFillLog, getFillStats } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Fill Log — Human Activity Atlas",
  description: "Live log of activity pages being filled by the cron agent.",
};

export default function LogPage() {
  return (
    <div className="p-6">
      <nav className="text-black mb-4">
        <Link href="/" className="text-black no-underline hover:underline">
          Home
        </Link>
        {" / "}
        <span>Fill log</span>
      </nav>
      <h1 className="m-0 mb-4 font-bold text-black text-4xl leading-[0.9]">
        Fill log
      </h1>
      <Suspense
        fallback={<p className="m-0 text-[#757575]">Loading…</p>}
      >
        <LogBody />
      </Suspense>
    </div>
  );
}

async function LogBody() {
  "use cache";
  cacheLife("seconds");
  cacheTag("fill-log");

  const [rows, stats] = await Promise.all([getFillLog(100), getFillStats()]);

  const percent =
    stats.total === 0 ? 0 : Math.round((stats.filled / stats.total) * 1000) / 10;

  return (
    <>
      <section className="mb-6 border-b border-black pb-4 text-black">
        <p className="m-0">
          <span className="font-bold">{stats.filled.toLocaleString()}</span> of{" "}
          <span className="font-bold">{stats.total.toLocaleString()}</span>{" "}
          activities filled ({percent}%).{" "}
          <span className="text-[#757575]">
            {stats.lastHour} in the last hour · {stats.lastDay} in the last 24 h
          </span>
        </p>
        <div className="mt-3 border border-black h-2 w-full">
          <div
            className="bg-black h-full"
            style={{
              width: `${Math.min(100, percent)}%`,
            }}
          />
        </div>
      </section>

      {rows.length === 0 ? (
        <p className="m-0 text-[#757575]">No fills recorded yet.</p>
      ) : (
        <ul className="list-none p-0 m-0">
          {rows.map((r) => (
            <li
              key={Number(r.id)}
              className="border-t border-black py-2 flex flex-wrap items-baseline gap-x-4 gap-y-1"
            >
              <span className="text-[#757575] w-[11ch] shrink-0">
                {formatDelta(String(r.updated_at))}
              </span>
              <Link
                href={`/activity/${r.slug}`}
                className="text-black no-underline hover:underline capitalize"
              >
                {r.name}
              </Link>
              <span className="text-[#757575]">{r.category_name}</span>
              <span className="ml-auto text-[#757575] text-sm">
                {Number(r.tools)} tools · {Number(r.glossary)} gloss ·{" "}
                {Number(r.brands)} brands · {Number(r.techniques)} tech ·{" "}
                {Number(r.masters)} masters
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function formatDelta(iso: string): string {
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return "";
  const secs = Math.max(0, Math.floor((Date.now() - t) / 1000));
  if (secs < 60) return `${secs}s ago`;
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 48) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}
