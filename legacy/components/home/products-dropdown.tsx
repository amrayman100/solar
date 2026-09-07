"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const products = [
  { name: "Grid Tied", href: "/product/grid-tied" },
  { name: "Off Grid", href: "/product/off-grid" },
  { name: "Solar Irrigation", href: "/product/solar-irrigation" },
  { name: "Solar Heating", href: "/product/solar-heating" },
  { name: "EV Charging", href: "/product/ev" },
  { name: "Construction", href: "/product/construction" },
];

interface ProductsDropdownProps {
  triggerClassName?: string;
  triggerText?: string;
}

export function ProductsDropdown({ 
  triggerClassName,
  triggerText = "Our Products"
}: ProductsDropdownProps = {}) {
  const [open, setOpen] = React.useState(false);

  const defaultClassName = "scroll-m-20 text-4xl font-bold tracking-tight text-center text-[#015231] hover:text-[#00bd70] transition-colors flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00bd70] focus:ring-offset-2 rounded-md px-2 py-1";
  const headerClassName = "text-emerald-950 font-medium hover:text-emerald-800 transition-colors flex items-center gap-1 cursor-pointer focus:outline-none";

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className={triggerClassName || defaultClassName}>
          {triggerText}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg rounded-md"
      >
        {products.map((product) => (
          <DropdownMenuItem key={product.href} asChild>
            <Link
              href={product.href}
              className="text-[#015231] dark:text-emerald-50 hover:text-[#00bd70] hover:bg-emerald-50 dark:hover:bg-emerald-900/20 cursor-pointer w-full"
            >
              {product.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

