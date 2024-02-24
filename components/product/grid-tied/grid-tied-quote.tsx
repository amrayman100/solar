"use client";
import { TypographyH3, TypographyH4 } from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import { GridTied } from "@/models/product";
import { Building, Home } from "lucide-react";

export function GridTiedQuote({ gridTied }: { gridTied: GridTied }) {
  return (
    <>
      <form
        className="mx-auto mt-10 border-solid p-10 rounded-xl border bg-card text-card-foreground shadow w-max"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          //   void queryform.handleSubmit();
        }}
      >
        <div>
          <div className="flex flex-col space-y-2 mb-4">
            <TypographyH3
              className="font-semibold"
              text="What type of housing do you live in?"
            />
            <div className="flex gap-10 place-content-center w-100 py-12">
              <div className="flex flex-col text-center items-center cursor-pointer">
                <Home size={100} />
                <TypographyH4 text="Single-familly" />
              </div>
              <div className="flex flex-col text-center items-center cursor-pointer">
                <Building size={100} />
                <TypographyH4 text="Multi-familly" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
