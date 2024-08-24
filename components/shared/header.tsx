"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Zap } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "../ui/button";
import { ModeToggle } from "./theme-button";
import { TypographyH2, TypographyH3, TypographyH4 } from "./typography";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

export default function Header() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <div className="sticky top-0 z-40 bg-white dark:bg-black">
      {/* mobile nav menu */}
      <div className="flex lg:hidden md:hidden">
        <Sheet>
          <div className="flex mt-2 justify-between w-full">
            <div className="flex gap-2">
              <div className="hidden dark:block">
                <Image
                  alt="Logo"
                  src={"/logo-dark.png"}
                  blurDataURL={"/logo-dark.png"}
                  placeholder="blur"
                  quality={100}
                  height={80}
                  width={80}
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="block dark:hidden">
                <Image
                  alt="Logo"
                  src={"/logo.png"}
                  blurDataURL={"/logo.png"}
                  placeholder="blur"
                  quality={100}
                  height={80}
                  width={80}
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
            <SheetTrigger>
              <Menu size={32} className="self-center" cursor={"pointer"} />
            </SheetTrigger>
          </div>
          <SheetContent className="text-center">
            <SheetHeader className="text-center">
              {/* <SheetTitle className="text-center">
                <div className="flex justify-between mt-8 text-center">
                  <TypographyH4 text={"Menu"} className="text-center" />
                </div>
              </SheetTitle> */}
            </SheetHeader>
            <Link href="/" legacyBehavior passHref className="mt-10">
              <a className="scroll-m-20 text-xl font-semibold tracking-tight">
                Home
              </a>
            </Link>
            <div className="flex flex-col">
              <Link href="/contact-us" legacyBehavior passHref>
                <a className="scroll-m-20 text-xl font-semibold tracking-tight">
                  Contact Us
                </a>
              </Link>
              <TypographyH4 text="Products" />
              <Link href="/product/grid-tied" legacyBehavior passHref>
                Grid Tied
              </Link>
              <Link href="/product/solar-irrigation" legacyBehavior passHref>
                Solar Irrigation
              </Link>
              <Link href="/product/solar-heating" legacyBehavior passHref>
                Solar Heating
              </Link>
              <Link href="/product/ev" legacyBehavior passHref>
                EV Charging
              </Link>
              <Link href="/product/off-grid" legacyBehavior passHref>
                Off Grid Batteries
              </Link>
            </div>
            <div className="flex flex-col mt-2">
              <TypographyH4 text="Services" />
              <Link href="/services/maintenance" legacyBehavior passHref>
                Maintenance
              </Link>
              <Link href="/services/solar-monitoring" legacyBehavior passHref>
                Smart Monitoring
              </Link>
            </div>
            <div className="flex flex-col mt-2">
              <Link href="/product/construction" legacyBehavior passHref>
                <a className="scroll-m-20 text-xl font-semibold tracking-tight">
                  Bolt Construction
                </a>
              </Link>
              <Link href="/proposal/whole-sale" legacyBehavior passHref>
                <a className="scroll-m-20 text-xl font-semibold tracking-tight">
                  Whole Sale
                </a>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      {/* desktop nav menu */}
      <div className="sticky top-0 z-40 hidden lg:flex md:flex justify-between p-4 lg:mx-12">
        <div
          className="flex place-items-center gap-3 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <div className="hidden dark:flex">
            <Image
              alt="Logo"
              src={"/logo-dark.png"}
              blurDataURL={"/logo-dark.png"}
              placeholder="blur"
              quality={100}
              height={80}
              width={80}
              style={{
                objectFit: "cover",
              }}
            />
            <TypographyH3 text="Bolt Energy" className="self-center" />
          </div>
          <div className="flex dark:hidden">
            <Image
              alt="Logo"
              src={"/logo.png"}
              blurDataURL={"/logo.png"}
              placeholder="blur"
              quality={100}
              height={80}
              width={80}
              style={{
                objectFit: "cover",
              }}
            />
            <TypographyH3 text="Bolt Energy" className="self-center" />
          </div>
        </div>
        <div className="flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger onClick={(e) => e.preventDefault()}>
                  Products
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                    <ListItem
                      href="/product/grid-tied"
                      title="Grid Tied"
                    ></ListItem>
                    <ListItem
                      href="/product/solar-irrigation"
                      title="Solar Irrigation"
                    ></ListItem>
                    <ListItem
                      href="/product/solar-heating"
                      title="Solar Heating"
                    ></ListItem>
                    <ListItem href="/product/ev" title="EV Charging"></ListItem>
                    <ListItem
                      href="/product/off-grid"
                      title="Off Grid Batteries"
                    ></ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger onClick={(e) => e.preventDefault()}>
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                    <ListItem
                      href="/services/maintenance"
                      title="Maintenance"
                    ></ListItem>
                    <ListItem
                      href="/services/solar-monitoring"
                      title="Smart Monitoring"
                    ></ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/product/construction" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Bolt Construction
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/proposal/whole-sale" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Wholesale
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Button
            variant="default"
            className="self-center"
            onClick={() => router.push("/contact-us")}
          >
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
