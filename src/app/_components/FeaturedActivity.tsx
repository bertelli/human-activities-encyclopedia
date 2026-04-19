"use client";

import Link from "next/link";
import { CategoryIcon } from "./CategoryIcon";

type Activity = {
  id: number;
  name: string;
  slug: string;
  description: string;
  category_name: string;
  icon_voxels?: unknown;
};

export function FeaturedActivity({ activity }: { activity: Activity }) {
  const firstParagraph = activity.description.split("\n")[0].slice(0, 200);

  return (
    <>
      <Link
        href={`/activity/${activity.slug}`}
        className="group grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 no-underline text-black mb-2"
      >
        <div className="aspect-square relative flex items-center justify-center rounded-sm hover:bg-[#f5f5f5] transition-colors">
          <span className="w-32 h-32 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.34,2.2,0.64,1)] group-hover:scale-115">
            <CategoryIcon
              name={activity.name}
              categoryName={activity.category_name}
              iconVoxels={activity.icon_voxels as never}
              size="lg-home"
            />
          </span>
        </div>
        <div className="flex flex-col justify-center gap-2 col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 2xl:col-span-5 py-4">
          <span className="text-xl font-bold">{activity.name}</span>
          <span className="text-sm text-[#555] leading-relaxed">{firstParagraph}…</span>
          <span className="text-sm underline">Read more</span>
        </div>
      </Link>
      <div className="border-b border-black mb-6" />
    </>
  );
}
