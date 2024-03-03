"use server";
import { db } from "@/lib/db";
import { productProposalTable, productTable } from "@/lib/schema";
import { match } from "ts-pattern";
import {
  GridTied,
  GridTiedParams,
  GridTiedProposal,
  GridTiedProposalDetails,
  ProductProposal,
  calculateBosCost,
  calculateCostOfPanels,
  calculateFirstYearSavings,
  calculateKWH,
  calculateKWP,
  calculateLabourCost,
  calculateMountingStructureCost,
  calculateNumberOfPanels,
  calculateSellingCost,
  calculateTotalCost,
  calculateTwentyFifthSavings,
  getInvertor,
} from "@/models/product";
import { error } from "console";
import { eq } from "drizzle-orm";

export type ProposalRequestInfo = {
  monthlyConsumption: number;
  lat?: number;
  long?: number;
  name: string;
  email: string;
  phoneNumber: string;
};

export type createProposal<T> = (
  req: ProposalRequestInfo
) => Promise<ProductProposal<T>>;

export async function createGridTiedProposal(
  req: ProposalRequestInfo
): Promise<GridTiedProposal> {
  const res = await db
    .select()
    .from(productTable)
    .limit(1)
    .where(eq(productTable.name, "grid-tied"));

  let gridTied: GridTied;

  if (res.length == 0) {
    throw new Error("product does not exist");
  }

  const gridTiedDb = res[0];
  gridTied = {
    name: gridTiedDb.name,
    isEnabled: gridTiedDb.isEnabled,
    created: {
      by: gridTiedDb.createdBy || "",
      at: gridTiedDb.createdAt || "",
    },
    updated: {
      by: gridTiedDb.updatedBy || "",
      at: gridTiedDb.updatedAt || "",
    },
    currency: gridTiedDb.currency,
    parameters: gridTiedDb.parameters as GridTiedParams,
  };

  const params = gridTied.parameters;

  const kwh = calculateKWH(req.monthlyConsumption, params.tarif);
  const kwp = calculateKWP(kwh, params.sunHours);

  const numberOfpanels = calculateNumberOfPanels(kwp, params.panelWatt);

  const costOfPanels = calculateCostOfPanels(
    numberOfpanels,
    params.panelWatt,
    params.panelCostPerWatt
  );

  const invertor = getInvertor(kwp, params.invertors);
  if (!invertor) {
    throw new Error("cannot get invertor");
  }

  const costOfMountingStructure = calculateMountingStructureCost(
    params.mountingPrice,
    kwp
  );

  const labourCost = calculateLabourCost(params.labourRate, kwp);

  const bosCost = calculateBosCost(
    params.bosRate,
    costOfMountingStructure,
    invertor.price,
    costOfPanels
  );

  const totalCost = calculateTotalCost(
    bosCost,
    invertor.price,
    labourCost,
    costOfMountingStructure,
    costOfPanels
  );

  const sellingCost = calculateSellingCost(totalCost, params.markup);

  const firstYearSavings = calculateFirstYearSavings(params.specificProd, kwp);

  const twentyFifthYearSavings = calculateTwentyFifthSavings(
    firstYearSavings,
    params.panelDegradation
  );

  const proposal = {
    name: req.name,
    emailAddress: req.email,
    phoneNumber: req.phoneNumber,
    productId: gridTiedDb.id,
    addressLatitude: req.lat || 0,
    addressLongitude: req.long || 0,
    proposalDetails: {
      kwp,
      costOfPanels,
      invertor,
      costOfMountingStructure,
      bosCost,
      labourCost,
      totalCost,
      sellingCost,
      firstYearSavings,
      twentyFifthYearSavings,
    },
  };

  const insertResult = await db
    .insert(productProposalTable)
    .values({
      productId: proposal.productId,
      name: proposal.name,
      emailAddress: proposal.emailAddress,
      phoneNumber: proposal.phoneNumber,
      addressLatitude: req.lat?.toString(),
      addressLongitude: req.long?.toString(),
      createdAt: new Date().toLocaleDateString(),
      createdBy: req.email,
      proposalDetails: proposal.proposalDetails,
    })
    .returning();

  if (insertResult.length < 0) {
    throw new Error("failed to insert");
  }

  return proposal;
}
