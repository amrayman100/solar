"use server";
import { db } from "@/lib/db";
import { productProposalTable, productTable } from "@/lib/schema";
import {
  GridTied,
  GridTiedParams,
  GridTiedProposal,
  OffGridProposal,
  ProductProposal,
  getGridTiedProposal,
} from "@/models/product";
import { error } from "console";
import { eq } from "drizzle-orm";

export type ProposalRequestInfo<T> = {
  consumptionDetails: T;
  lat?: number;
  long?: number;
  city: string;
  name: string;
  email?: string;
  phoneNumber: string;
};

export type CreateProposalServerFunction<A, T> = (
  req: ProposalRequestInfo<A>
) => Promise<ProductProposal<T>>;

export async function createGridTiedProposal(
  req: ProposalRequestInfo<{ monthlyConsumption: number }>
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

  const parameters = gridTied.parameters;

  const proposal = getGridTiedProposal(
    parameters,
    gridTiedDb.id,
    req.city,
    req.consumptionDetails.monthlyConsumption,
    req.name,
    req.phoneNumber,
    req.lat,
    req.long,
    req.email
  );

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

export async function updateProduct(gridTied: GridTied) {
  await db
    .update(productTable)
    .set({
      parameters: gridTied.parameters,
      updatedAt: gridTied.updated?.at,
      updatedBy: gridTied.created?.by,
    })
    .where(eq(productTable.id, 9));
  return true;
}

export async function getProduct() {
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

  return gridTied;
}

export async function createOffGridProposal(
  req: ProposalRequestInfo<{}>
): Promise<OffGridProposal> {
  throw error("not implemented yet");
}
