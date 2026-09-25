import Image from "next/image";
import { Link } from "@/i18n/navigation";

export function TrackRecordCard({
  title,
  power,
  location,
  image,
  imageAlt,
  href,
}: {
  title: string;
  power: string;
  location: string;
  image: string;
  imageAlt?: string;
  href?: string;
}) {
  const alt = imageAlt ?? `${power} ${title.toLowerCase()} in ${location}`;

  const content = (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-[15px] bg-[#f1f1f1]">
      <div className="relative h-[190px] w-full shrink-0 overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover"
          sizes="270px"
          quality={75}
        />
      </div>
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-1.5 px-4 py-3 text-center">
        <h3 className="line-clamp-2 w-full text-center text-sm font-semibold leading-snug text-black">
          {title}
        </h3>
        <p className="text-center text-xs font-semibold text-black">{power}</p>
        <p className="line-clamp-2 w-full text-center text-xs font-medium leading-snug text-[#123028]">
          {location}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex h-[320px] w-[270px] shrink-0 transition-opacity hover:opacity-90">
        {content}
      </Link>
    );
  }

  return <div className="h-[320px] w-[270px] shrink-0">{content}</div>;
}
