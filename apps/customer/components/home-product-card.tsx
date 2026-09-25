"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function HomeProductCard({
  title,
  description,
  image,
  imageAlt,
  href,
}: {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
}) {
  const t = useTranslations("cta");

  return (
    <div className="flex h-auto min-h-[380px] w-[270px] flex-col items-center overflow-hidden rounded-[15px] bg-[#f1f1f1]">
      <div className="relative w-full flex-shrink-0 overflow-hidden aspect-[2276/1739]">
        <Image src={image} alt={imageAlt} fill className="object-cover" sizes="270px" />
      </div>
      <div className="flex w-full flex-grow flex-col items-center justify-between px-4 pb-4 pt-4">
        <div className="flex flex-col items-center gap-[18px] text-center">
          <h3 className="text-base font-semibold text-black">{title}</h3>
          <p className="text-xs font-normal text-black">{description}</p>
        </div>
        <div className="mt-4 flex w-full flex-shrink-0 gap-1.5">
          <Link
            href={`${href}?quote=1`}
            className="flex h-11 min-w-0 flex-1 items-center justify-center rounded-lg bg-[#015231] px-2 text-center text-sm font-semibold leading-tight text-white hover:bg-[#014028]"
          >
            <span className="block w-full text-center">{t("calculateNow")}</span>
          </Link>
          <Link
            href={href}
            className="flex h-11 min-w-0 flex-1 items-center justify-center rounded-lg border border-[#123028] bg-white px-2 text-center text-sm font-semibold leading-tight text-[#123028] hover:bg-[#f7fbf9]"
          >
            <span className="block w-full text-center">{t("learnMore")}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
