"use server";
import { db } from "@/lib/db";
import { productProposalTable, productTable } from "@/lib/schema";
import {
  GridTied,
  GridTiedParams,
  GridTiedProposal,
  OffGridConsumption,
  OffGridParams,
  OffGridProposal,
  ProductProposal,
  calculateActualC,
  calculateNumberOfOffGridBatteries,
  calculateNumberOfOffGridBatteryStrings,
  calculateNumberOfOffGridPanels,
  calculateOffGridSolarEnergyNeeded,
  calculateRealBatteryCapacityInterpolation,
  calculateTotalPower,
  calculateTotalSurgePower,
  getGridTiedProposal,
  getInvertorForOffGrid,
  offGridProduct,
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
  const res1 = await db.insert(productTable).values(offGridProduct);

  console.log(res1);
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
  req: ProposalRequestInfo<OffGridConsumption>
): Promise<OffGridProposal> {
  console.log(req.consumptionDetails);
  const gridTiedProduct = await getOffGridProduct();
  const params = gridTiedProduct.parameters;

  const totalPower = calculateTotalPower(req.consumptionDetails.deviceLoads);
  const surgePower = calculateTotalSurgePower(
    req.consumptionDetails.deviceLoads
  );

  const inverter = getInvertorForOffGrid(
    params.inverters,
    totalPower,
    surgePower
  );

  if (inverter) {
    const actaulC1 = calculateActualC(params.battery, inverter, totalPower);
    console.log("actual C", actaulC1);

    const realBatteryCapacity = calculateRealBatteryCapacityInterpolation(
      params.battery,
      actaulC1
    );

    console.log("realBatteryCapacity", realBatteryCapacity);

    const numberOfBatteryStrings = calculateNumberOfOffGridBatteryStrings(
      params.battery,
      inverter,
      surgePower,
      realBatteryCapacity || 0
    );

    console.log("numberOfBatteryStrings", numberOfBatteryStrings);

    const numberOfBatteries = calculateNumberOfOffGridBatteries(
      numberOfBatteryStrings,
      params.battery,
      inverter
    );

    console.log("numberOfBatteries", numberOfBatteries);

    let numberOfPanels = 0;

    if (!req.consumptionDetails.isConnectedToGrid) {
      const solarEnergyNeeded = calculateOffGridSolarEnergyNeeded(
        req.consumptionDetails.deviceLoads
      );

      console.log("solarEnergyNeeded", solarEnergyNeeded);

      numberOfPanels = calculateNumberOfOffGridPanels(
        solarEnergyNeeded,
        params.panel,
        4.5
      );

      console.log("numberOfPanels", numberOfPanels);
    }
  }

  throw error("not implemented yet");
}

export async function getOffGridProduct() {
  try {
    const res = await db
      .select()
      .from(productTable)
      .limit(1)
      .where(eq(productTable.name, "off-grid"));

    const offGridDb = res[0];
    const offGrid = {
      name: offGridDb.name,
      isEnabled: offGridDb.isEnabled,
      created: {
        by: offGridDb.createdBy || "",
        at: offGridDb.createdAt || "",
      },
      updated: {
        by: offGridDb.updatedBy || "",
        at: offGridDb.updatedAt || "",
      },
      currency: offGridDb.currency,
      parameters: offGridDb.parameters as OffGridParams,
    };

    return offGrid;
  } catch (err) {
    console.log("err 123", err);
    return {
      name: "",
      isEnabled: false,
      created: {
        by: "",
        at: "",
      },
      updated: {
        by: "",
        at: "",
      },
      currency: "egp",
      parameters: {} as OffGridParams,
    };
  }
}
