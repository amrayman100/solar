"use server";
import { db } from "@/lib/db";
import { productProposalTable, productTable } from "@/lib/schema";
import {
  GridTied,
  GridTiedParams,
  GridTiedProposal,
  GridTiedProposalDetails,
  ProductProposal,
  calculateConcreteFootingCost,
  calculateDCCableCost,
  calculateDCEarthCableCost,
  calculateFirstYearMonthlyBill,
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
  getInverter,
  getInverterACCableCost,
  getInverterACEarthCableCost,
  getInverterBaseCost,
  getInverterCircuitBreakerCost,
  getInverterFlexibleCost,
  getInverterVSNCost,
  getLabourCost,
  getMaintenanceCost,
  getNumberOfStrings,
  getSwitchBoxCost,
  getTransportationCost,
  roundToDec,
} from "@/models/product";
import { eq } from "drizzle-orm";

export type ProposalRequestInfo = {
  monthlyConsumption: number;
  lat?: number;
  long?: number;
  city: string;
  name: string;
  email?: string;
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

  const inverter = getInverter(systemSize, parameters.inverters);
  if (!inverter) {
    throw new Error("cannot get inverter");
  }

  const inverterBaseCost = getInverterBaseCost(inverter, parameters.dollarRate);
  const inverterACCableCost = getInverterACCableCost(inverter);
  const inverterACCableEarthCost = getInverterACEarthCableCost(inverter);
  const inverterCircuitBreaker = getInverterCircuitBreakerCost(inverter);
  const inverterVSNCost = getInverterVSNCost(inverter);
  const inverterFlexibleCost = getInverterFlexibleCost(inverter);

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

  const earthLeakageCost = getEarthLeakageCost(
    parameters.earthLeakage,
    req.city
  );
  const switchBoxCost = getSwitchBoxCost(parameters.switchBox, req.city);

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

  const inverterTotalCost =
    inverterBaseCost +
    inverterACCableCost +
    inverterACCableEarthCost +
    inverterCircuitBreaker +
    inverterVSNCost +
    inverterFlexibleCost;

  const totalCost = calculateTotalCost(
    inverterTotalCost,
    labourCost,
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

  const firstYearMonthlyBill = calculateFirstYearMonthlyBill(
    firstYearSavings,
    parameters.tarif,
    req.monthlyConsumption
  );

  const twentyFifthYearSavings = calculateTwentyFifthSavings(
    firstYearSavings,
    parameters.panelDegradation,
    parameters.tarifEscalation
  );

  const proposal: GridTiedProposal = {
    name: req.name,
    emailAddress: req.email,
    phoneNumber: req.phoneNumber,
    productId: gridTiedDb.id,
    addressLatitude: req.lat || 0,
    addressLongitude: req.long || 0,
    proposalDetails: {
      tarifEscalation: parameters.tarifEscalation,
      numberOfPanels,
      systemSize,
      labourCost,
      costOfPanels,
      concreteFootingCost,
      dcCableCost,
      dcEarthCableCost,
      fuseCost,
      mc4Cost,
      switchBoxCost,
      earthLeakageCost,
      electricityCompanyCost,
      maintenanceCost,
      mountingStructureCost,
      transportationCost,
      earthCost: earthCost.price,
      cleaningToolPrice: parameters.cleaningToolPrice,
      inverter: {
        inverterInfo: inverter,
        inverterBaseCost,
        inverterACCableCost,
        inverterACCableEarthCost,
        inverterCircuitBreaker,
        inverterVSNCost,
        inverterFlexibleCost,
      },
      sellingCost,
      totalCost,
      firstYearSavings,
      twentyFifthYearSavings,
      panelDegradation: parameters.panelDegradation,
      currentMonthlyBill: req.monthlyConsumption,
      pricePerWatt: parameters.panel.pricePerWatt,
      firstYearMonthlyBill,
      billing: {
        downPaymentFee: roundToDec(
          parameters.billingPercentage.downPaymentPercentage * sellingCost
        ),
        componentsSupplyFee: roundToDec(
          parameters.billingPercentage.componentsSupplyPercentage * sellingCost
        ),
        installationFee: roundToDec(
          parameters.billingPercentage.installationPercentage * sellingCost
        ),
        commissionFee: roundToDec(
          parameters.billingPercentage.commissionPercentage * sellingCost
        ),
      },
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
