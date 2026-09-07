"use client";

import Image from "next/image";
import { Star } from "lucide-react";

export function TestimonialCard({ name, text }: { name: string; text: string }) {
  return (
    <div
      className="relative h-[166px] w-[365px] rounded-[24px] bg-[#f1f1f1]"
      style={{ overflow: "visible" }}
    >
      <h4 className="absolute left-[25px] top-[15px] whitespace-nowrap text-base font-bold leading-normal text-black">
        {name}
      </h4>
      <p className="absolute left-[25px] right-[25px] top-[44px] text-[10px] font-medium leading-normal text-black">
        {text}
      </p>
      <div className="absolute left-[175px] top-[140px] flex gap-0">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className="h-5 w-5 fill-[#00bd70] text-[#00bd70]" />
        ))}
      </div>
      <div
        className="absolute left-[284px] top-[120px] z-10 h-[60px] w-[60px] overflow-visible rounded-full"
        style={{ marginBottom: "-8px" }}
      >
        <Image
          src="/testimonial-profile-icon.svg"
          alt=""
          width={60}
          height={60}
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
}
