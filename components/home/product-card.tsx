"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  calculateLink: string;
  learnMoreLink: string;
}

export function ProductCard({
  title,
  description,
  image,
  calculateLink,
  learnMoreLink,
}: ProductCardProps) {
  return (
    <div className="bg-[#f1f1f1] flex flex-col items-center overflow-hidden rounded-[15px] w-[270px] h-[380px]">
      <div className="relative w-full aspect-[2276/1739] overflow-hidden flex-shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-4 items-center justify-between px-4 pb-4 pt-4 w-full flex-grow">
        <div className="flex flex-col gap-[18px] items-center text-center">
          <h3 className="font-semibold text-base text-black">{title}</h3>
          <p className="font-normal text-xs text-black">{description}</p>
        </div>
        <div className="flex gap-[5px] items-center w-full flex-shrink-0 mt-auto">
          <Button
            asChild
            className="bg-[#00bd70] hover:bg-[#00bd70]/90 h-[27px] px-2 py-2.5 rounded-lg flex-1 text-xs font-medium text-white"
          >
            <Link href={calculateLink}>Calculate Now</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="bg-[#e6e6e6] hover:bg-[#e6e6e6]/90 h-[27px] px-2.5 py-2.5 rounded-lg flex-1 text-xs font-medium text-black border-0"
          >
            <Link href={learnMoreLink}>Learn More</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

