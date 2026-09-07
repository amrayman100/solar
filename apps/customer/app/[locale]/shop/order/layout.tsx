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
    title: "Order Confirmation",
    description: "Your Bolt Energy order details.",
    pathWithoutLocale: "/shop/order",
    locale,
    noIndex: true,
  });
}

export default function OrderLayout({ children }: Props) {
  return children;
}
