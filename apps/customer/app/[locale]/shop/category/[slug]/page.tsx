"use client";

import { useParams } from "next/navigation";
import { ShopCatalogue } from "@/components/shop-catalogue";

export default function ShopCategoryPage() {
  const params = useParams<{ slug: string }>();
  return <ShopCatalogue categorySlug={params.slug} />;
}
