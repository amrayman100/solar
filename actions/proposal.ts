"use server";
import { db } from "@/lib/db";
import { productProposalTable, productTable } from "@/lib/schema";
import {
  EVConsumption,
  EVParams,
  EVProposal,
  GridTied,
  GridTiedParams,
  GridTiedProposal,
  OffGridConsumption,
  OffGridParams,
  OffGridProposal,
  ProductProposal,
  SolarHeatingConsumption,
  SolarHeatingParams,
  SolarHeatingProposal,
  SolarIrrigationConsumption,
  SolarIrrigationParams,
  SolarIrrigationProposal,
  calculateActualC,
  calculateNumberOfOffGridBatteries,
  calculateNumberOfOffGridBatteryStrings,
  calculateNumberOfOffGridPanels,
  calculateOffGridBatteryCableCosts,
  calculateOffGridDCCableCost,
  calculateOffGridFusePrice,
  calculateOffGridMc4Cost,
  calculateOffGridMountingStructureCost,
  calculateOffGridSolarEnergyNeeded,
  calculateRealBatteryCapacityInterpolation,
  calculateSellingCost,
  calculateSolarIrrigationCost,
  calculateTotalPower,
  calculateTotalSurgePower,
  calulateCostOfPanels,
  ev,
  getEVCharger,
  getGridTiedProposal,
  getHouseHoldHeater,
  getInvertorForOffGrid,
  getPoolHeater,
  roundToDec,
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
  // const res1 = await db.insert(productTable).values(ev);

  // console.log(res1);

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
  const offGridProduct = await getOffGridProduct();

  const params = offGridProduct.parameters;

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

    const solarEnergyNeeded = calculateOffGridSolarEnergyNeeded(
      req.consumptionDetails.deviceLoads,
      req.consumptionDetails.isConnectedToGrid
    );

    console.log("solarEnergyNeeded", solarEnergyNeeded);

    const numberOfBatteryStrings = calculateNumberOfOffGridBatteryStrings(
      params.battery,
      inverter,
      solarEnergyNeeded,
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

    console.log(
      "isConnected to grid: ",
      req.consumptionDetails.isConnectedToGrid
    );

    if (!req.consumptionDetails.isConnectedToGrid) {
      numberOfPanels = calculateNumberOfOffGridPanels(
        solarEnergyNeeded,
        params.panel,
        4.5
      );

      console.log("numberOfPanels", numberOfPanels);
    }

    const costOfPanels = calulateCostOfPanels(
      numberOfPanels,
      params.dollarRate,
      params.panel
    );
    console.log(costOfPanels);

    const inverterBaseCost = inverter.price;
    console.log("inverterBaseCos: ", inverterBaseCost);

    const inverterAcCableCost =
      inverter.acCable.price * inverter.acCable.quantity;
    console.log("inverterAcCableCost: ", inverterAcCableCost);

    const inverterACEarthCableCost =
      inverter.acCable.acEarthCable.price *
      inverter.acCable.acEarthCable.quantity;
    console.log("inverterACEarthCableCost: ", inverterACEarthCableCost);

    const inverterCircuitBreakerCost =
      inverter.circuitBreaker.price * inverter.circuitBreaker.quantity;

    console.log("inverterCircuitBreakerCost: ", inverterCircuitBreakerCost);

    const batteriesCost = params.battery.price * numberOfBatteries;
    console.log("batteriesCost: ", batteriesCost);

    const mountingStructureCost = calculateOffGridMountingStructureCost(
      numberOfPanels,
      params.mountingPrice,
      params.panel
    );
    console.log("mountingStructureCost: ", mountingStructureCost);

    const dcCableCosts = calculateOffGridDCCableCost(
      numberOfPanels,
      params.dcCable
    );
    console.log("dcCableCosts: ", dcCableCosts);

    const batteryCableCosts = calculateOffGridBatteryCableCosts(
      numberOfBatteryStrings,
      params.battery
    );
    console.log("batteryCableCosts: ", batteryCableCosts);

    const labourCost = params.labourCost;
    console.log("labourCost: ", labourCost);

    const mc4Cost = calculateOffGridMc4Cost(params.mc4, numberOfPanels);
    console.log("mc4Cost: ", mc4Cost);

    const manualTransferSwitchCost =
      params.manualTransferSwitch.price * params.manualTransferSwitch.quantity;
    console.log(manualTransferSwitchCost, manualTransferSwitchCost);

    const batteryCircuitBreakerCost =
      params.battery.circuitBreaker.price *
      params.battery.circuitBreaker.quantity;
    console.log("batteryCircuitBreakerCost: ", batteryCircuitBreakerCost);

    const fuseCost = calculateOffGridFusePrice(params.fuse, numberOfPanels);
    console.log("fuseCost: ", fuseCost);

    const switchBoxCost = params.panel.switchBox.price;
    console.log("switchBoxCost: ", switchBoxCost);

    const cleaningToolCost = numberOfPanels > 0 ? params.cleaningToolPrice : 0;
    console.log("cleaningToolCost: ", cleaningToolCost);

    const batteryStandCost = req.consumptionDetails.placeBatteriesIndoors
      ? params.batteryStandPrice.insideHousePrice
      : params.batteryStandPrice.outsideHousePerFourBatteriesPrice;
    console.log("batteryStandCost: ", batteryStandCost);

    const totalCost =
      costOfPanels +
      inverterBaseCost +
      inverterAcCableCost +
      inverterACEarthCableCost +
      inverterCircuitBreakerCost +
      batteriesCost +
      mountingStructureCost +
      dcCableCosts +
      batteryCableCosts +
      labourCost +
      mc4Cost +
      manualTransferSwitchCost +
      batteryCircuitBreakerCost +
      fuseCost +
      switchBoxCost +
      cleaningToolCost +
      batteryStandCost;

    console.log("totalCost :", totalCost);

    const sellingCost = calculateSellingCost(totalCost, params.markup);

    const proposal = {
      name: req.name,
      emailAddress: req.email,
      phoneNumber: req.phoneNumber,
      productId: offGridProduct.id,
      addressLatitude: req.lat || 0,
      addressLongitude: req.long || 0,
      proposalDetails: {
        isConnectedToGrid: req.consumptionDetails.isConnectedToGrid,
        deviceLoads: req.consumptionDetails.deviceLoads,
        inverter: {
          inverterInfo: inverter,
          inverterACCableCost: inverterAcCableCost,
          inverterACCableEarthCost: inverterACEarthCableCost,
          inverterCircuitBreaker: inverterCircuitBreakerCost,
        },
        costOfPanels: costOfPanels,
        batteriesCost: batteriesCost,
        mountingStructureCost: mountingStructureCost,
        dcCableCosts: dcCableCosts,
        batteryCableCosts: batteryCableCosts,
        labourCost: labourCost,
        mc4Cost: mc4Cost,
        manualTransferSwitchCost: manualTransferSwitchCost,
        batteryCircuitBreakerCost: batteryCircuitBreakerCost,
        fuseCost: fuseCost,
        switchBoxCost: switchBoxCost,
        cleaningToolCost: cleaningToolCost,
        batteryStandCost: batteryStandCost,
        totalCost: totalCost,
        sellingCost: sellingCost,
        billing: {
          downPaymentFee: roundToDec(
            params.billingPercentage.downPaymentPercentage * sellingCost
          ),
          componentsSupplyFee: roundToDec(
            params.billingPercentage.componentsSupplyPercentage * sellingCost
          ),
          installationFee: roundToDec(
            params.billingPercentage.installationPercentage * sellingCost
          ),
          commissionFee: roundToDec(
            params.billingPercentage.commissionPercentage * sellingCost
          ),
        },
        battery: params.battery,
        numberOfBatteries: numberOfBatteries,
        panel: params.panel,
        numberOfPanels: numberOfPanels,
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
  } else {
    throw error("inverter not found");
  }
}

export async function createSolarIrrigationProposal(
  req: ProposalRequestInfo<SolarIrrigationConsumption>
): Promise<SolarIrrigationProposal> {
  const irrigationProduct = await getSolarIrrigation();

  console.log(irrigationProduct);

  const params = irrigationProduct.parameters;

  const cost = calculateSolarIrrigationCost(
    req.consumptionDetails.pumpCapacity,
    params.pricePerkW
  );

  const proposal = {
    name: req.name,
    emailAddress: req.email,
    phoneNumber: req.phoneNumber,
    productId: irrigationProduct.id,
    addressLatitude: req.lat || 0,
    addressLongitude: req.long || 0,
    proposalDetails: {
      cost,
      pumpCapacity: req.consumptionDetails.pumpCapacity,
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

export async function createSolarHeatingProposal(
  req: ProposalRequestInfo<SolarHeatingConsumption>
): Promise<SolarHeatingProposal> {
  const solarHeatingProduct = await getSolarHeating();

  const params = solarHeatingProduct.parameters;

  let proposal;
  if (req.consumptionDetails.isHousehold) {
    const heater = getHouseHoldHeater(
      params.houseHoldHeaters,
      req.consumptionDetails.numberOfRooms
    );

    proposal = {
      name: req.name,
      emailAddress: req.email,
      phoneNumber: req.phoneNumber,
      productId: solarHeatingProduct.id,
      addressLatitude: req.lat || 0,
      addressLongitude: req.long || 0,
      proposalDetails: {
        type: "house-hold",
        numberOfRooms: req.consumptionDetails.numberOfRooms,
        heater,
      },
    };
  } else {
    const heater = getPoolHeater(
      params.poolHeaters,
      req.consumptionDetails.poolVolume
    );

    proposal = {
      name: req.name,
      emailAddress: req.email,
      phoneNumber: req.phoneNumber,
      productId: solarHeatingProduct.id,
      addressLatitude: req.lat || 0,
      addressLongitude: req.long || 0,
      proposalDetails: {
        type: "pool",
        poolVolume: req.consumptionDetails.poolVolume,
        heater,
      },
    };
  }

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

export async function createEVProposal(
  req: ProposalRequestInfo<EVConsumption>
): Promise<EVProposal> {
  const product = await getEV();

  const params = product.parameters;

  const charger = getEVCharger(
    params.chargers,
    req.consumptionDetails.chargingPower
  );

  const proposal = {
    name: req.name,
    emailAddress: req.email,
    phoneNumber: req.phoneNumber,
    productId: product.id,
    addressLatitude: req.lat || 0,
    addressLongitude: req.long || 0,
    proposalDetails: {
      chargingPower: req.consumptionDetails.chargingPower,
      charger,
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

export async function getOffGridProduct() {
  try {
    const res = await db
      .select()
      .from(productTable)
      .limit(1)
      .where(eq(productTable.name, "off-grid"));

    const offGridDb = res[0];
    const offGrid = {
      id: offGridDb.id,
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
    return {
      id: 0,
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

export async function getSolarIrrigation() {
  try {
    const res = await db
      .select()
      .from(productTable)
      .limit(1)
      .where(eq(productTable.name, "solar-irrigation"));

    const irrrigationDb = res[0];
    const irrrigation = {
      id: irrrigationDb.id,
      name: irrrigationDb.name,
      isEnabled: irrrigationDb.isEnabled,
      created: {
        by: irrrigationDb.createdBy || "",
        at: irrrigationDb.createdAt || "",
      },
      updated: {
        by: irrrigationDb.updatedBy || "",
        at: irrrigationDb.updatedAt || "",
      },
      currency: irrrigationDb.currency,
      parameters: irrrigationDb.parameters as SolarIrrigationParams,
    };

    return irrrigation;
  } catch (err) {
    return {
      id: 0,
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
      parameters: {} as SolarIrrigationParams,
    };
  }
}

export async function getSolarHeating() {
  try {
    const res = await db
      .select()
      .from(productTable)
      .limit(1)
      .where(eq(productTable.name, "solar-heating"));

    const solarHeatingDb = res[0];
    const solarHeating = {
      id: solarHeatingDb.id,
      name: solarHeatingDb.name,
      isEnabled: solarHeatingDb.isEnabled,
      created: {
        by: solarHeatingDb.createdBy || "",
        at: solarHeatingDb.createdAt || "",
      },
      updated: {
        by: solarHeatingDb.updatedBy || "",
        at: solarHeatingDb.updatedAt || "",
      },
      currency: solarHeatingDb.currency,
      parameters: solarHeatingDb.parameters as SolarHeatingParams,
    };

    return solarHeating;
  } catch (err) {
    return {
      id: 0,
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
      parameters: {} as SolarHeatingParams,
    };
  }
}

export async function getEV() {
  try {
    const res = await db
      .select()
      .from(productTable)
      .limit(1)
      .where(eq(productTable.name, "ev"));

    const evDb = res[0];
    const ev = {
      id: evDb.id,
      name: evDb.name,
      isEnabled: evDb.isEnabled,
      created: {
        by: evDb.createdBy || "",
        at: evDb.createdAt || "",
      },
      updated: {
        by: evDb.updatedBy || "",
        at: evDb.updatedAt || "",
      },
      currency: evDb.currency,
      parameters: evDb.parameters as EVParams,
    };

    return ev;
  } catch (err) {
    return {
      id: 0,
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
      parameters: {} as EVParams,
    };
  }
}
