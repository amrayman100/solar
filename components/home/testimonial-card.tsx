"use client";

import { Star } from "lucide-react";
import Image from "next/image";

interface TestimonialCardProps {
  name: string;
  text: string;
}

export function TestimonialCard({ name, text }: TestimonialCardProps) {
  return (
    <div className="bg-[#f1f1f1] rounded-[24px] w-[365px] h-[166px] relative" style={{ overflow: 'visible' }}>
      {/* Name - 25px from left, 15px from top */}
      <h4 className="absolute left-[25px] top-[15px] font-bold text-base text-black leading-normal whitespace-nowrap">
        {name}
      </h4>
      
      {/* Text - 25px from left, 44px from top */}
      <p className="absolute left-[25px] top-[44px] right-[25px] font-medium text-[10px] text-black leading-normal">
        {text}
      </p>
      
      {/* Stars - 175px from left, 140px from top */}
      <div className="absolute left-[175px] top-[140px] flex gap-0">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-5 h-5 fill-[#00bd70] text-[#00bd70]"
          />
        ))}
      </div>
      
      {/* Profile Icon - 284px from left (81px from right), 120px from top, extends 8px below */}
      <div 
        className="absolute left-[284px] top-[120px] w-[60px] h-[60px] rounded-full overflow-visible"
        style={{ 
          marginBottom: '-8px',
          zIndex: 10
        }}
      >
        <Image
          src="https://www.figma.com/api/mcp/asset/12481556-9a58-4975-80eb-87a265d92bdd"
          alt="Profile"
          width={60}
          height={60}
          className="w-full h-full object-contain"
          unoptimized
        />
      </div>
    </div>
  );
}

