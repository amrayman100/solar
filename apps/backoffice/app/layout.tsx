import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ConvexClientProvider } from "@/lib/convex";
import { getToken } from "@/lib/auth-server";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bolt Energy — Backoffice",
  description: "Internal dashboard for proposals, catalogue, and orders",
  robots: { index: false, follow: false },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getToken();

  return (
    <html lang="en">
      <body className={`${poppins.className} min-h-screen bg-(--background) text-(--foreground)`}>
        <ConvexClientProvider initialToken={token}>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
