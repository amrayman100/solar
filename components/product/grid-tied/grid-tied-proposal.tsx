"use client";

import { GridTiedProposal } from "@/models/product";
import { createGridTiedProposal } from "@/actions/proposal";
import { CreateProposal, PropSteps } from "../create-proposal-form";
import { ViewGridTiedProposal } from "./view-grid-tied-proposal";
import { useReadLocalStorage } from "usehooks-ts";
import { AddressDescription } from "@/components/map/map";

export function NewGridTiedProposal() {
  const localStorageData = useReadLocalStorage<{
    address: AddressDescription;
    monthlyConsumption: number;
  } | null>("consumption-details") as {
    address: AddressDescription;
    monthlyConsumption: number;
  };

  return (
    <>
      {
        <CreateProposal
          steps={new Set<PropSteps>(["map", "housing"])}
          consumptionDetails={{
            monthlyConsumption: localStorageData?.monthlyConsumption || 0,
          }}
          address={
            localStorageData?.address || {
              lat: 0,
              lng: 0,
            }
          }
          createProposalFunc={createGridTiedProposal}
          onProposalCreation={(proposal: GridTiedProposal) =>
            console.log(proposal)
          }
          ViewProposal={ViewGridTiedProposal}
        />
      }
    </>
  );
}
