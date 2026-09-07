import { ShopShell } from "@/components/shop-shell";

export default function ShopBrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ShopShell>
      {children}
    </ShopShell>
  );
}
