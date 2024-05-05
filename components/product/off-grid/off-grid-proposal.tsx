"use client";

import { GridTiedProposal, OffGridProposal } from "@/models/product";
import { createGridTiedProposal } from "@/actions/proposal";
import { CreateProposal } from "../create-proposal-form";
import { ViewOffGridProposal } from "./view-off-grid-proposal";

export function GridTiedProposal() {
  return (
    <>
      <CreateProposal
        createProposalFunc={createGridTiedProposal}
        onProposalCreation={(proposal: OffGridProposal) =>
          console.log(proposal)
        }
        ViewProposal={ViewOffGridProposal}
      />
    </>
  );
}
