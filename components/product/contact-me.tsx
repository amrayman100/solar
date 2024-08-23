"use client";

import { useMutation } from "@tanstack/react-query";
import { TypographyH3, TypographyH4 } from "../shared/typography";
import { Button } from "../ui/button";
import { setProductProposalInterest } from "@/actions/proposal";

type Props = {
  proposalId: number;
  caption: string;
};

export function ContactMe({ proposalId, caption }: Props) {
  const mutation = useMutation({
    mutationFn: (req: boolean) => {
      return setProductProposalInterest(proposalId, req);
    },
  });

  return (
    <>
      <div>
        {mutation.isSuccess ? (
          <TypographyH4
            text="We will Contact you in 48 hours!"
            className="text-white"
          />
        ) : (
          <>
            <TypographyH3 text={caption} className="text-white" />
            <Button className="mt-2" onClick={() => mutation.mutate(true)}>
              Yes Contact Me
            </Button>
          </>
        )}
      </div>
    </>
  );
}
