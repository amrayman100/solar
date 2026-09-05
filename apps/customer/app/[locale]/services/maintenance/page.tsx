import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-(--primary)">{t("maintenanceTitle")}</h1>
      <p className="mt-4 leading-relaxed text-(--muted-foreground)">{t("maintenanceBody")}</p>
      <Link href="/contact-us" className="mt-6 inline-block font-semibold text-(--primary)">
        {t("maintenanceCta")}
      </Link>
    </main>
  );
}
