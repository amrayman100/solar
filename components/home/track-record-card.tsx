"use client";

import Image from "next/image";

interface TrackRecordCardProps {
  title: string;
  power: string;
  location: string;
  image: string;
}

export function TrackRecordCard({
  title,
  power,
  location,
  image,
}: TrackRecordCardProps) {
  return (
    <div className="bg-[#f1f1f1] flex flex-col gap-3 items-center overflow-hidden rounded-[15px] w-full max-w-[270px] h-[292px]">
      <div className="relative w-full h-[206px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-1 items-center justify-center px-4 pb-4">
        <h3 className="font-semibold text-base text-black text-center w-full">
          {title}
        </h3>
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="flex gap-1 items-center">
            <svg
              width="6"
              height="12"
              viewBox="0 0 6 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 0L3.4641 4.5L6 6L3.4641 7.5L3 12L2.5359 7.5L0 6L2.5359 4.5L3 0Z"
                fill="black"
              />
            </svg>
            <p className="font-semibold text-xs text-black text-center">
              {power}
            </p>
          </div>
          <div className="flex gap-1.5 items-center">
            <svg
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 0C1.79086 0 0 1.79086 0 4C0 7 4 12 4 12C4 12 8 7 8 4C8 1.79086 6.20914 0 4 0ZM4 5.5C3.17157 5.5 2.5 4.82843 2.5 4C2.5 3.17157 3.17157 2.5 4 2.5C4.82843 2.5 5.5 3.17157 5.5 4C5.5 4.82843 4.82843 5.5 4 5.5Z"
                fill="black"
              />
            </svg>
            <p className="font-semibold text-xs text-black text-center">
              {location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
