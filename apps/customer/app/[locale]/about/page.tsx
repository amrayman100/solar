import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-(--primary)">{t("title")}</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-gray-800">
        <p>{t("p1")}</p>
        <p>{t("p2")}</p>
        <ul className="list-disc space-y-2 ps-5">
          <li>{t("item1")}</li>
          <li>{t("item2")}</li>
          <li>{t("item3")}</li>
          <li>{t("item4")}</li>
          <li>{t("item5")}</li>
          <li>{t("item6")}</li>
        </ul>
      </div>
    </main>
  );
}
