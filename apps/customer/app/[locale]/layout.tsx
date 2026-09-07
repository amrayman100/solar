import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Poppins } from "next/font/google";
import { routing } from "@/i18n/routing";
import { ConvexClientProvider } from "@/lib/convex";
import { getToken } from "@/lib/auth-server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { CartCheckoutPrompt } from "@/components/cart-checkout-prompt";
import { SITE_URL } from "@/lib/structured-data";
import "../globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const gaId = process.env.NEXT_PUBLIC_GA_ID ?? "G-SDXGEP99RN";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bolt Energy | Solar Energy Egypt",
    template: "%s | Bolt Energy Egypt",
  },
  description:
    "Bolt Energy designs and installs solar energy systems across Egypt, delivering grid-tied, off-grid, and irrigation solutions with expert engineering and support.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
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

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const token = await getToken();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={`${poppins.className} min-h-screen bg-(--background) text-(--foreground)`}>
        <ConvexClientProvider initialToken={token}>
          <NextIntlClientProvider messages={messages}>
            <div className="flex min-h-screen w-full flex-col">
              <SiteHeader />
              <div className="flex-1">{children}</div>
              <SiteFooter />
              <WhatsAppFab />
              <CartCheckoutPrompt />
            </div>
          </NextIntlClientProvider>
        </ConvexClientProvider>
      </body>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}
