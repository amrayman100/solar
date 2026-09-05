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
    <div className="flex h-[380px] w-[270px] flex-col items-center overflow-hidden rounded-[15px] bg-[#f1f1f1]">
      <div className="relative w-full flex-shrink-0 overflow-hidden aspect-[2276/1739]">
        <Image src={image} alt={imageAlt} fill className="object-cover" sizes="270px" />
      </div>
      <div className="flex w-full flex-grow flex-col items-center justify-between px-4 pb-4 pt-4">
        <div className="flex flex-col items-center gap-[18px] text-center">
          <h3 className="text-base font-semibold text-black">{title}</h3>
          <p className="text-xs font-normal text-black">{description}</p>
        </div>
        <div className="mt-auto flex w-full flex-shrink-0 gap-[5px]">
          <Link
            href={href}
            className="flex h-[27px] flex-1 items-center justify-center rounded-lg bg-[#00bd70] px-2 text-xs font-medium text-white hover:bg-[#00bd70]/90"
          >
            {t("calculateNow")}
          </Link>
          <Link
            href={href}
            className="flex h-[27px] flex-1 items-center justify-center rounded-lg bg-[#e6e6e6] px-2.5 text-xs font-medium text-black hover:bg-[#e6e6e6]/90"
          >
            {t("learnMore")}
          </Link>
        </div>
      </div>
    </div>
  );
}
