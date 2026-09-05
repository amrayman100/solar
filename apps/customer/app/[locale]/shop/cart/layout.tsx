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
    title: "Shopping Cart",
    description: "Your Bolt Energy shopping cart.",
    pathWithoutLocale: "/shop/cart",
    locale,
    noIndex: true,
  });
}

export default function CartLayout({ children }: Props) {
  return children;
}
