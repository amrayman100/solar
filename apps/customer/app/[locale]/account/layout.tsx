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
    title: "My Account",
    description: "Manage your Bolt Energy account and orders.",
    pathWithoutLocale: "/account",
    locale,
    noIndex: true,
  });
}

export default function AccountLayout({ children }: Props) {
  return children;
}
