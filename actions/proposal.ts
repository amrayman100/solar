"use server";
import { db } from "@/lib/db";
import { productProposalTable, productTable } from "@/lib/schema";
import {
  Construction,
  ConstructionConsumption,
  ConstructionParams,
  ConstructionProposal,
  ConstructionProposalDetails,
  EVConsumption,
  EVParams,
  EVProposal,
  GridTied,
  GridTiedParams,
  GridTiedProposal,
  HouseholdSolarHeater,
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
  WholeSaleConsumption,
  WholeSaleProposal,
  calculateSolarIrrigationCost,
  getConstructionProposal,
  getEVCharger,
  getGridTiedProposal,
  getHouseHoldHeater,
  getOffGridProposal,
  getPoolHeater,
  offGridProduct,
} from "@/models/product";
import { eq } from "drizzle-orm";
import { sendProposalNotification } from "@/lib/email";

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
  // const res1 = await db.insert(productTable).values(offGridProduct);

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

  proposal.id = insertResult[0].id;
  const emailSent = await sendProposalNotification({
    name: req.name,
    email: req.email,
    phoneNumber: req.phoneNumber,
    productType: gridTied.name,
    proposalData: `System Size: ${proposal.proposalDetails.systemSize} kW\nNumber of Panels: ${proposal.proposalDetails.numberOfPanels}\nTotal Cost: ${proposal.proposalDetails.totalCost} EGP\nFirst Year Savings: ${proposal.proposalDetails.firstYearSavings} EGP\nCurrent Monthly Bill: ${proposal.proposalDetails.currentMonthlyBill} EGP\nFirst Year Monthly Bill: ${proposal.proposalDetails.firstYearMonthlyBill} EGP`,
  });

  console.log(emailSent);

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

  const proposal = getOffGridProposal(req, offGridProduct.id, offGridProduct);

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

  proposal.id = insertResult[0].id;

  await sendProposalNotification({
    name: req.name,
    email: req.email,
    phoneNumber: req.phoneNumber,
    productType: offGridProduct.name,
    proposalData: `Number of Panels: ${proposal.proposalDetails.numberOfPanels}\nNumber of Batteries: ${proposal.proposalDetails.numberOfBatteries}\nTotal Cost: ${proposal.proposalDetails.totalCost} EGP\nBattery Capacity: ${proposal.proposalDetails.battery.capacity} kWh`,
  });

  return proposal;
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
    id: 0,
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

  proposal.id = insertResult[0].id;

  await sendProposalNotification({
    name: req.name,
    email: req.email,
    phoneNumber: req.phoneNumber,
    productType: irrigationProduct.name,
    proposalData: `Pump Capacity: ${proposal.proposalDetails.pumpCapacity} HP\nEstimated Cost: ${proposal.proposalDetails.cost} EGP`,
  });

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
      id: 0,
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
      id: 0,
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

  proposal.id = insertResult[0].id;

  await sendProposalNotification({
    name: req.name,
    email: req.email,
    phoneNumber: req.phoneNumber,
    productType: solarHeatingProduct.name,
    proposalData:
      proposal.proposalDetails.type === "house-hold"
        ? `Type: Household Heating\nNumber of Rooms: ${
            proposal.proposalDetails.numberOfRooms
          }\nHeater Brand: ${
            proposal.proposalDetails.heater?.brand
          }\nHeater Capacity: ${
            (proposal.proposalDetails.heater as HouseholdSolarHeater)?.litres
          } litres\nEstimated Cost: ${
            proposal.proposalDetails.heater?.price
          } EGP`
        : `Type: Pool Heating\nPool Volume: ${proposal.proposalDetails.poolVolume} m³\nHeater Brand: ${proposal.proposalDetails.heater?.brand}\nEstimated Cost: ${proposal.proposalDetails.heater?.price} EGP`,
  });

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
    id: 0,
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

  proposal.id = insertResult[0].id;

  await sendProposalNotification({
    name: req.name,
    email: req.email,
    phoneNumber: req.phoneNumber,
    productType: product.name,
    proposalData: `Charging Power: ${proposal.proposalDetails.chargingPower} kW\nCharger Power: ${proposal.proposalDetails.charger?.power} kW\nEstimated Cost: ${proposal.proposalDetails.charger?.price} EGP`,
  });
  return proposal;
}

export async function createWholesaleProposal(
  req: ProposalRequestInfo<WholeSaleConsumption>
): Promise<WholeSaleProposal> {
  const product = await getWholeSale();

  const proposal = {
    id: 0,
    name: req.name,
    emailAddress: req.email,
    phoneNumber: req.phoneNumber,
    productId: product.id,
    addressLatitude: req.lat || 0,
    addressLongitude: req.long || 0,
    proposalDetails: {
      order: { ...req.consumptionDetails },
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

  proposal.id = insertResult[0].id;

  await sendProposalNotification({
    name: req.name,
    email: req.email,
    phoneNumber: req.phoneNumber,
    productType: product.name,
    proposalData: `Order Details:\n${Object.entries(
      proposal.proposalDetails.order
    )
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n")}`,
  });
  return proposal;
}

export async function createConstructionProposal(
  req: ProposalRequestInfo<ConstructionConsumption>
): Promise<ConstructionProposal> {
  const product = await getBoltConstruction();
  const proposal = getConstructionProposal(req, product.id, product);

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

  proposal.id = insertResult[0].id;

  await sendProposalNotification({
    name: req.name,
    email: req.email,
    phoneNumber: req.phoneNumber,
    productType: product.name,
    proposalData: `Project Type: ${proposal.proposalDetails.type}\n${
      proposal.proposalDetails.type === "homeFinishing"
        ? `Finishing Type: ${proposal.proposalDetails.finishingType}\nCost: ${proposal.proposalDetails.cost} EGP`
        : proposal.proposalDetails.type === "generalContracting"
        ? `Subject: ${proposal.proposalDetails.subject}`
        : `Plant Size: ${proposal.proposalDetails.plantSizeKws} kW`
    }`,
  });
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

export async function getWholeSale() {
  try {
    const res = await db
      .select()
      .from(productTable)
      .limit(1)
      .where(eq(productTable.name, "whole-sale"));

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
      parameters: evDb.parameters as {},
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
      parameters: {} as {},
    };
  }
}

export async function getBoltConstruction() {
  try {
    const res = await db
      .select()
      .from(productTable)
      .limit(1)
      .where(eq(productTable.name, "construction"));

    const constructionDb = res[0];
    const construction = {
      id: constructionDb.id,
      name: constructionDb.name,
      isEnabled: constructionDb.isEnabled,
      created: {
        by: constructionDb.createdBy || "",
        at: constructionDb.createdAt || "",
      },
      updated: {
        by: constructionDb.updatedBy || "",
        at: constructionDb.updatedAt || "",
      },
      currency: constructionDb.currency,
      parameters: constructionDb.parameters as ConstructionParams,
    };

    return construction;
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
      parameters: {} as ConstructionParams,
    };
  }
}

export async function setProductProposalInterest(
  id: number,
  isInterested: boolean
) {
  try {
    return await db
      .update(productProposalTable)
      .set({ isInterested: isInterested })
      .where(eq(productProposalTable.id, id))
      .returning({ updatedId: productProposalTable.id });
  } catch (err) {
    return err;
  }
}
