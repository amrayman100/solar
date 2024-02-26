"use server";
import { db } from "@/lib/db";
import { productTable } from "@/lib/schema";
import {
  GridTied,
  GridTiedParams,
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
import { eq } from "drizzle-orm";

export async function createProposal(monthlyConsumption: number) {
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

  const kwh = calculateKWH(monthlyConsumption, params.tarif);
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

  return {
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
  };
}
