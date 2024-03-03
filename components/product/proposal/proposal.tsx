"use client";

import { GridTiedProposal } from "@/models/product";
import { CreateProposal } from "./create-proposal-from";
import { createGridTiedProposal } from "@/actions/proposal";

export function Proposal() {
  return (
    <>
      <CreateProposal
        createProposalFunc={createGridTiedProposal}
        onProposalCreation={(proposal: GridTiedProposal) =>
          console.log(proposal)
        }
      />
    </>
  );
}
