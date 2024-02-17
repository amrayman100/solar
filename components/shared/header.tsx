"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Zap, XIcon } from "lucide-react";

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
import { TypographyH2, TypographyH4 } from "./typography";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
  return (
    <div className="">
      {/* mobile nav menu */}
      <div className="flex lg:hidden md:hidden">
        <Sheet>
          <div className="flex mt-2 justify-between w-full">
            <div className="flex">
              <TypographyH2 text={"Bolt Energy"} />
              <Zap className="h-6 w-6 self-center" />
            </div>
            <SheetTrigger>
              <Menu size={32} className="self-center" cursor={"pointer"} />
            </SheetTrigger>
          </div>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                <div className="flex justify-between">Menu</div>
              </SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      {/* desktop nav menu */}
      <div className="hidden lg:flex md:flex justify-between p-4 lg:mx-12">
        <div className="flex place-items-center gap-2">
          <TypographyH4 text="Bolt Energy" />
          <Zap className="h-6 w-6" />
          <ModeToggle />
        </div>
        <div className="flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  Products and Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                    <ListItem href="/dashboard" title="Products">
                      Products
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                    <ListItem href="/dashboard" title="Components">
                      Components
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/dashboard" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Button variant="default">Calculate Your Savings</Button>
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
