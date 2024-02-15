import Image from "next/image";
import mountains from "../public/mountains.jpg";

export default function Background({ imageSrc }: { imageSrc: string }) {
  return (
    <Image
      alt="Mountains"
      src={imageSrc}
      placeholder="blur"
      blurDataURL={imageSrc}
      quality={100}
      fill
      sizes="100vw"
      style={{
        objectFit: "cover",
      }}
    />
  );
}
