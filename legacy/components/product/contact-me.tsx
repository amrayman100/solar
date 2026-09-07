"use client";

import { useMutation } from "@tanstack/react-query";
import { TypographyH3, TypographyH4 } from "../shared/typography";
import { Button } from "../ui/button";
import { setProductProposalInterest } from "@/actions/proposal";
import { cva } from "class-variance-authority";

type Props = {
  proposalId: number;
  caption: string;
  darkMode?: boolean;
};

export function ContactMe({ proposalId, caption, darkMode }: Props) {
  const mutation = useMutation({
    mutationFn: (req: boolean) => {
      return setProductProposalInterest(proposalId, req);
    },
  });

  const textStyling = darkMode ? cva("text-black") : cva("text-white");

  return (
    <>
      <div className="flex-col text-center w-max">
        {mutation.isSuccess ? (
          <TypographyH4
            text="Amazing, we will contact you as soon as possible!!"
            className={textStyling()}
          />
        ) : (
          <>
            <TypographyH3 text={caption} className={textStyling()} />
            <Button className="mt-2" onClick={() => mutation.mutate(true)}>
              Contact Me
            </Button>
          </>
        )}
      </div>
    </>
  );
}
