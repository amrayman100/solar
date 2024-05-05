"use client";

import { GridTiedProposal } from "@/models/product";
import { createGridTiedProposal } from "@/actions/proposal";
import { CreateProposal } from "../create-proposal-form";
import { ViewGridTiedProposal } from "./view-grid-tied-proposal";
import { useReadLocalStorage } from "usehooks-ts";
import { AddressDescription } from "@/components/map/map";

export function GridTiedProposal() {
  const localStorageData = useReadLocalStorage<{
    address: AddressDescription;
    monthlyConsumption: number;
  } | null>("consumption-details") as {
    address: AddressDescription;
    monthlyConsumption: number;
  };

  return (
    <>
      {localStorageData && (
        <CreateProposal
          consumptionDetails={{
            monthlyConsumption: localStorageData.monthlyConsumption,
          }}
          address={localStorageData.address}
          createProposalFunc={createGridTiedProposal}
          onProposalCreation={(proposal: GridTiedProposal) =>
            console.log(proposal)
          }
          ViewProposal={ViewGridTiedProposal}
        />
      )}
    </>
  );
}
