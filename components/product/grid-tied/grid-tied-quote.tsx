"use client";
import { TypographyH3 } from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import { GridTied } from "@/models/product";
import { Home } from "lucide-react";

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
            <div className="flex gap-4">
              <Home size={100} />
              <Home size={100} />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
