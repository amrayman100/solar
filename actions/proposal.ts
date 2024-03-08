"use server";
import { db } from "@/lib/db";
import { productProposalTable, productTable } from "@/lib/schema";
import {
  GridTied,
  GridTiedParams,
  GridTiedProposal,
  GridTiedProposalDetails,
  Invertor,
  ProductProposal,
  calculateConcreteFootingCost,
  calculateDCCableCost,
  calculateDCEarthCableCost,
  calculateFirstYearSavings,
  calculateMc4Cost,
  calculateMountingStructureCost,
  calculateNumberofPanels,
  calculateSellingCost,
  calculateSystemSize,
  calculateTotalCost,
  calculateTwentyFifthSavings,
  calulateCostOfPanels,
  getEarthLeakageCost,
  getElectricityCompanyCost,
  getFusePrice,
  getInvertor,
  getInvertorACCableCost,
  getInvertorACEarthCableCost,
  getInvertorBaseCost,
  getInvertorCircuitBreakerCost,
  getInvertorFlexibleCost,
  getInvertorVSNCost,
  getLabourCost,
  getMaintenanceCost,
  getNumberOfStrings,
  getSwitchBoxCost,
  getTransportationCost,
} from "@/models/product";
import { eq } from "drizzle-orm";
import { json } from "stream/consumers";

export type ProposalRequestInfo = {
  monthlyConsumption: number;
  lat?: number;
  long?: number;
  name: string;
  email: string;
  phoneNumber: string;
};

export type CreateProposalServerFunction<T> = (
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

  const parameters = gridTied.parameters;

  const systemSize = calculateSystemSize(
    req.monthlyConsumption,
    parameters.tarif,
    parameters.specificProd
  );

  const numberOfPanels = calculateNumberofPanels(
    systemSize,
    parameters.panel.powerOutputWatt
  );

  const costOfPanels = calulateCostOfPanels(
    numberOfPanels,
    parameters.dollarRate,
    parameters.panel.pricePerWatt,
    parameters.panel.powerOutputWatt
  );

  const invertor = getInvertor(systemSize, parameters.invertors);
  if (!invertor) {
    throw new Error("cannot get invertor");
  }

  const invertorBaseCost = getInvertorBaseCost(invertor, parameters.dollarRate);
  const invertorACCableCost = getInvertorACCableCost(invertor);
  const invertorACCableEarthCost = getInvertorACEarthCableCost(invertor);
  const invertorCircuitBreaker = getInvertorCircuitBreakerCost(invertor);
  const invertorVSNCost = getInvertorVSNCost(invertor);
  const invertorFlexibleCost = getInvertorFlexibleCost(invertor);

  const mountingStructureCost = calculateMountingStructureCost(
    parameters.mountingPrice,
    systemSize
  );

  const concreteFootingCost = calculateConcreteFootingCost(
    numberOfPanels,
    parameters.panel.width,
    parameters.structureSpan,
    parameters.concreteFootingPrice
  );

  const dcCableCost = calculateDCCableCost(
    systemSize,
    parameters.dcCable.price
  );
  const dcEarthCableCost = calculateDCEarthCableCost(parameters.dcEarthCable);

  const numberOfStrings = getNumberOfStrings(numberOfPanels);
  const mc4Cost = calculateMc4Cost(parameters.mc4, numberOfStrings);
  const fuseCost = getFusePrice(parameters.fuse.price, numberOfStrings);

  const earthLeakageCost = getEarthLeakageCost(parameters.earthLeakage, "giza");
  const switchBoxCost = getSwitchBoxCost(parameters.switchBox, "giza");

  const earthCost = parameters.earth;

  const labourCost = getLabourCost(systemSize, parameters.labourBaseCost);
  const transportationCost = getTransportationCost(
    parameters.truckPrice,
    numberOfPanels
  );
  const maintenanceCost = getMaintenanceCost(parameters.maintenance);
  const electricityCompanyCost = getElectricityCompanyCost(
    parameters.electricityCompanyCheckup
  );

  console.log(
    systemSize,
    numberOfPanels,
    JSON.stringify(invertor),
    JSON.stringify({
      invertorBaseCost,
      invertorACCableCost,
      invertorACCableEarthCost,
      invertorCircuitBreaker,
      invertorVSNCost,
      invertorFlexibleCost,
    }),
    mountingStructureCost,
    {
      dcCableCost,
      dcEarthCableCost,
    },
    " number of strings " + numberOfStrings,
    " mc4 cost " + mc4Cost,
    " fuse cost " + fuseCost,
    " labour cost " + labourCost,
    " transportation cost " + transportationCost,
    " maintenance cost " + maintenanceCost,
    " electricity Company cost " + electricityCompanyCost,
    " earth leakage cost " + earthLeakageCost,
    " switch box cost " + switchBoxCost,
    " earth cost " + earthCost
  );

  const invertorTotalCost =
    invertorBaseCost +
    invertorACCableCost +
    invertorACCableEarthCost +
    invertorCircuitBreaker +
    invertorVSNCost +
    invertorFlexibleCost;

  const totalCost = calculateTotalCost(
    invertorTotalCost,
    labourCost,
    maintenanceCost,
    costOfPanels,
    concreteFootingCost,
    dcCableCost,
    dcEarthCableCost,
    earthCost.price,
    fuseCost,
    mc4Cost,
    switchBoxCost,
    earthLeakageCost,
    parameters.cleaningToolPrice,
    electricityCompanyCost,
    maintenanceCost,
    mountingStructureCost,
    transportationCost
  );

  const sellingCost = calculateSellingCost(totalCost, parameters.markup);

  const firstYearSavings = calculateFirstYearSavings(
    parameters.specificProd,
    systemSize
  );

  const twentyFifthYearSavings = calculateTwentyFifthSavings(
    firstYearSavings,
    parameters.panelDegradation
  );

  console.log(sellingCost, firstYearSavings, twentyFifthYearSavings);

  const proposal = {
    name: req.name,
    emailAddress: req.email,
    phoneNumber: req.phoneNumber,
    productId: gridTiedDb.id,
    addressLatitude: req.lat || 0,
    addressLongitude: req.long || 0,
    proposalDetails: {
      // kwp,
      // costOfPanels,
      // invertor,
      // costOfMountingStructure,
      // bosCost,
      // labourCost,
      // totalCost,
      // sellingCost,
      // firstYearSavings,
      // twentyFifthYearSavings,
    },
  };

  // const insertResult = await db
  //   .insert(productProposalTable)
  //   .values({
  //     productId: proposal.productId,
  //     name: proposal.name,
  //     emailAddress: proposal.emailAddress,
  //     phoneNumber: proposal.phoneNumber,
  //     addressLatitude: req.lat?.toString(),
  //     addressLongitude: req.long?.toString(),
  //     createdAt: new Date().toLocaleDateString(),
  //     createdBy: req.email,
  //     proposalDetails: {},
  //   })
  //   .returning();

  // if (insertResult.length < 0) {
  //   throw new Error("failed to insert");
  // }

  return proposal;
}
