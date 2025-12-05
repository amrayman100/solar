import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { RTLProvider } from "@/components/rtl-provider";
import { ReactQueryClientProvider } from "@/components/react-query-client-provider";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Bolt Energy | Solar Energy Egypt",
    template: "%s | Bolt Energy Egypt",
  },
  description:
    "Bolt Energy designs and installs solar energy systems across Egypt, delivering grid-tied, off-grid, and irrigation solutions with expert engineering and support.",
  keywords: [
    "solar egypt",
    "solar energy egypt",
    "egypt solar panels",
    "bolt energy",
    "solar installation egypt",
    "grid tied solar egypt",
    "off grid solar egypt",
    "solar irrigation egypt",
    "solar heating egypt",
    "طاقة شمسية مصر",
    "الطاقة الشمسية في مصر",
  ],
  openGraph: {
    title: "Bolt Energy | Solar Energy Egypt",
    description:
      "Leading solar energy company in Egypt providing grid-tied, off-grid, and irrigation solar solutions with professional installation and support.",
    type: "website",
    images: [
      {
        url: "/drone-4-1.jpeg",
        width: 1200,
        height: 630,
        alt: "Bolt Energy solar installation in Egypt",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bolt Energy | Solar Energy Egypt",
    description:
      "Solar panel design and installation across Egypt. Grid-tied, off-grid, irrigation, and heating solutions by Bolt Energy.",
    images: ["/drone-4-1.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ReactQueryClientProvider>
        <RTLProvider>
          <body className={poppins.className + " flex flex-col min-h-screen"}>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
            <Toaster />
          </body>
        </RTLProvider>
      </ReactQueryClientProvider>
    </html>
  );
}
