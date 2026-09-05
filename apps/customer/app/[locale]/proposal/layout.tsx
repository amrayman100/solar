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
    title: "Solar Proposal Calculator",
    description: "Interactive solar proposal tools from Bolt Energy.",
    pathWithoutLocale: "/proposal",
    locale,
    noIndex: true,
  });
}

export default function ProposalLayout({ children }: Props) {
  return children;
}
