"use client";

import { usePathname } from "next/navigation";
import { HomeSearch } from "./HomeSearch";

export function FooterSearch() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return (
    <div className="mb-6">
      <HomeSearch />
    </div>
  );
}
