"use client";

import { GridTiedProposal, OffGridProposal } from "@/models/product";
import { createOffGridProposal } from "@/actions/proposal";
import { CreateProposal } from "../create-proposal-form";
import { ViewOffGridProposal } from "./view-off-grid-proposal";

export function GridTiedProposal() {
  return (
    <>
      <CreateProposal
        consumptionDetails={{}}
        address={{ lat: 30, lng: 30, city: "Cairo Governate", fullAddress: "" }}
        createProposalFunc={createOffGridProposal}
        onProposalCreation={(proposal: OffGridProposal) =>
          console.log(proposal)
        }
        ViewProposal={ViewOffGridProposal}
      />
    </>
  );
}
