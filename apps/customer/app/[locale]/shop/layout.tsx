import { createLocalizedPageMetadata } from "@/lib/seo";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return createLocalizedPageMetadata({
    title: "Solar Shop Egypt | Panels, Inverters & Components",
    description:
      "Browse Bolt Energy's solar shop for panels, inverters, and system components. Quality equipment with expert support across Egypt.",
    pathWithoutLocale: "/shop",
    locale,
    keywords: [
      "solar shop egypt",
      "buy solar panels egypt",
      "solar inverters egypt",
      "bolt energy shop",
    ],
  });
}

export default function ShopLayout({ children }: Props) {
  return children;
}
