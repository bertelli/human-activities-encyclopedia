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
  const firstParagraph = activity.description.split("\n")[0];

  return (
    <>
      <Link
        href={`/activity/${activity.slug}`}
        className="grid grid-cols-1 md:grid-cols-2 gap-2 no-underline text-black mb-2"
      >
        <div className="group aspect-square relative flex items-center justify-center rounded-sm hover:bg-[#f5f5f5] transition-colors">
          <span className="w-80 h-80 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.34,2.2,0.64,1)] group-hover:scale-115">
            <CategoryIcon
              name={activity.name}
              categoryName={activity.category_name}
              iconVoxels={activity.icon_voxels as never}
              size="featured-home"
            />
          </span>
        </div>
        <div className="flex flex-col justify-center gap-2 py-4">
          <span className="text-xl font-bold">{activity.name}</span>
          <span className="text-sm text-[#555] leading-relaxed">{firstParagraph}</span>
          <span className="text-sm underline">Read more</span>
        </div>
      </Link>
      <div className="border-b border-black mb-6" />
    </>
  );
}
