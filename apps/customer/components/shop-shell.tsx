"use client";

import { ShopCategoryNav } from "@/components/shop-category-nav";
import { usePathname } from "@/i18n/navigation";

export function ShopShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const match = pathname.match(/\/shop\/category\/([^/]+)/);
  const activeSlug = match?.[1];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-6 lg:px-8">
      <ShopCategoryNav activeSlug={activeSlug} />
      <div className="pb-10">{children}</div>
    </div>
  );
}
