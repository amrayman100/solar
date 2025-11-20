import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#015231] w-screen text-white">
      <div className="w-full px-4 lg:px-12 py-12">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Image
                alt="Logo"
                src="https://www.figma.com/api/mcp/asset/9aad1a59-8b82-4b8b-b278-9cd9c28aa5e0"
                blurDataURL="https://www.figma.com/api/mcp/asset/9aad1a59-8b82-4b8b-b278-9cd9c28aa5e0"
                placeholder="blur"
                quality={100}
                height={26}
                width={24}
                style={{
                  objectFit: "contain",
                }}
                unoptimized
              />
              <h3 className="text-xl font-bold text-white">Bolt Energy</h3>
            </div>
            <p className="text-sm leading-relaxed text-white">
              provides smart solar solutions for homes, farms, and industrial
              facilities. We offer on-grid and off-grid systems, as well as
              solar irrigation and heating. Our goal is to deliver safe,
              reliable, and cost effective energy with quality installation and
              support.
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-4 mt-2">
              <Image
                src="https://www.figma.com/api/mcp/asset/73e4b6ce-fdd2-4eb1-b501-8036ba1ec739"
                alt="Social Media"
                width={48}
                height={20}
                className="object-contain"
                unoptimized
              />
            </div>
          </div>

          {/* Products */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-white">Products</h4>
            <div className="flex flex-col gap-2 text-sm text-white">
              <Link
                href="/product/grid-tied"
                className="hover:opacity-80 transition-opacity"
              >
                Grid Tied
              </Link>
              <Link
                href="/product/off-grid"
                className="hover:opacity-80 transition-opacity"
              >
                Off Grid
              </Link>
              <Link
                href="/product/solar-irrigation"
                className="hover:opacity-80 transition-opacity"
              >
                Solar Irrigation
              </Link>
              <Link
                href="/product/solar-heating"
                className="hover:opacity-80 transition-opacity"
              >
                Solar Heating
              </Link>
            </div>
          </div>

          {/* Contact Us */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-white">Contact Us</h4>
            <div className="flex flex-col gap-3 text-sm text-white">
              {/* Address */}
              <div className="flex items-start gap-2">
                <Image
                  src="https://www.figma.com/api/mcp/asset/ee944488-12f5-4d50-b8ff-b38dd4808ade"
                  alt="Location"
                  width={11}
                  height={14}
                  className="mt-0.5 flex-shrink-0 object-contain"
                  unoptimized
                />
                <span>6th of October, Giza, Egypt</span>
              </div>
              {/* Email */}
              <div className="flex items-start gap-2">
                <Image
                  src="https://www.figma.com/api/mcp/asset/e42e05c7-2947-4e3c-932d-20847245b9ed"
                  alt="Email"
                  width={15}
                  height={12}
                  className="mt-0.5 flex-shrink-0 object-contain"
                  unoptimized
                />
                <a
                  href="mailto:info@bolt-energy.me"
                  className="hover:opacity-80 transition-opacity"
                >
                  info@bolt-energy.me
                </a>
              </div>
              {/* Phone */}
              <div className="flex items-start gap-2">
                <Image
                  src="https://www.figma.com/api/mcp/asset/2148b3ee-9d55-4d9b-a2f7-4ad11d606a40"
                  alt="Phone"
                  width={13}
                  height={13}
                  className="mt-0.5 flex-shrink-0 object-contain"
                  unoptimized
                />
                <a
                  href="tel:01044438446"
                  className="hover:opacity-80 transition-opacity"
                >
                  01044438446
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-6 mt-8">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm text-white">
              © 2024 Bolt Energy™. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
