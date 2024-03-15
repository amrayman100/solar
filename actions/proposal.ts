"use server";
import { db } from "@/lib/db";
import { productProposalTable, productTable } from "@/lib/schema";
import {
  GridTied,
  GridTiedParams,
  GridTiedProposal,
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
} from "@/models/product";
import { eq } from "drizzle-orm";

export type ProposalRequestInfo = {
  monthlyConsumption: number;
  lat?: number;
  long?: number;
  city: string;
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

  const twentyFifthYearSavings = calculateTwentyFifthSavings(
    firstYearSavings,
    parameters.panelDegradation
  );

  const proposal = {
    name: req.name,
    emailAddress: req.email,
    phoneNumber: req.phoneNumber,
    productId: gridTiedDb.id,
    addressLatitude: req.lat || 0,
    addressLongitude: req.long || 0,
    proposalDetails: {
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
      proposalDetails: {},
    })
    .returning();

  if (insertResult.length < 0) {
    throw new Error("failed to insert");
  }

  return proposal;
}

export async function createProduct() {
  const res = await db
    .update(productTable)
    .set({
      parameters: {
        panel: {
          brand: "Suntech 555",
          powerOutputWatt: 555,
          pricePerWatt: 10.8,
          width: 1.14,
        },
        tarif: 1.65,
        markup: 0.2,
        labourBaseCost: 600,
        panelDegradation: 0.8,
        specificProd: 1600,
        structureSpan: 1.8,
        concreteFootingPrice: 600,
        mountingPrice: 3000,
        dollarRate: 1,
        truckPrice: 3000,
        dcCable: { brand: "kbe", price: 60, rating: "1x6" },
        dcEarthCable: {
          brand: "Sewedy",
          price: 54.67,
          quantity: 50,
          rating: "1x6",
        },
        earthLeakage: {
          brand: "ABB",
          price: 2000,
          rating: "25A",
          citySpecificities: [
            { cityName: "Giza Governorate", quantity: 0 },
            { cityName: "Cairo Governorate", quantity: 1 },
          ],
        },
        earth: { brand: "Rod", price: 3000 },
        switchBox: {
          brand: "ABB",
          price: 1000,
          citySpecificities: [
            { cityName: "Giza Governorate", quantity: 1 },
            { cityName: "Cairo Governorate", quantity: 2 },
          ],
        },
        fuse: { brand: "Suntree", price: 220 },
        cleaningToolPrice: 1000,
        maintenance: { price: 400, amountOfVisits: 4 },
        electricityCompanyCheckup: { price: 1000, amountOfVisits: 1 },
        mc4: { brand: "Suntree", price: 60 },
        inverters: [
          {
            brand: "Sungrow 5RT",
            capacity: 5,
            price: 61800,
            acCable: {
              brand: "Sewedy",
              rating: "4x4",
              quantity: 30,
              price: 175,
              acEarthCable: {
                rating: "1x6",
                brand: "Sewedy",
                price: 54.67,
                quantity: 30,
              },
            },
            circuitBreaker: { brand: "ABB", rating: "10A-40A", price: 1500 },
            flexible: { brand: "30m", quantity: 1, price: 600 },
            vsn: { quantity: 0, price: 6000 },
          },
          {
            brand: "Sungrow 6RT",
            capacity: 6,
            price: 75000,
            acCable: {
              rating: "4x4",
              brand: "Sewedy",
              quantity: 30,
              price: 175,
              acEarthCable: {
                rating: "1x6",
                price: 54.67,
                quantity: 30,
                brand: "Sewedy",
              },
            },
            circuitBreaker: { brand: "ABB", rating: "10A-40A", price: 1500 },
            flexible: { brand: "30m", quantity: 1, price: 600 },
            vsn: { quantity: 0, price: 6000 },
          },
          {
            brand: "Sungrow 8RT",
            capacity: 8,
            price: 79200,
            acCable: {
              rating: "4x4",
              brand: "Sewedy",
              quantity: 30,
              price: 175,
              acEarthCable: {
                rating: "1x6",
                price: 54.67,
                quantity: 30,
                brand: "Sewedy",
              },
            },
            circuitBreaker: { brand: "ABB", rating: "10A-40A", price: 1500 },
            flexible: { brand: "30m", quantity: 1, price: 600 },
            vsn: { quantity: 0, price: 6000 },
          },
          {
            brand: "Sungrow 10RT",
            capacity: 10,
            price: 88200,
            acCable: {
              rating: "4x4",
              brand: "Sewedy",
              quantity: 30,
              price: 175,
              acEarthCable: {
                rating: "1x6",
                price: 54.67,
                quantity: 30,
                brand: "Sewedy",
              },
            },
            circuitBreaker: { brand: "ABB", rating: "10A-40A", price: 1500 },
            flexible: { brand: "30m", quantity: 1, price: 600 },
            vsn: { quantity: 0, price: 6000 },
          },
          {
            brand: "Sungrow 12RT",
            capacity: 12,
            price: 91800,
            acCable: {
              brand: "Sewedy",
              rating: "4x4",
              quantity: 30,
              price: 175,
              acEarthCable: {
                brand: "Sewedy",
                rating: "1x6",
                price: 54.67,
                quantity: 30,
              },
            },
            circuitBreaker: { brand: "ABB", rating: "10A-40A", price: 1500 },
            flexible: { brand: "30m", quantity: 1, price: 600 },
            vsn: { quantity: 0, price: 6000 },
          },
          {
            brand: "Sungrow 15RT",
            capacity: 15,
            price: 96000,
            acCable: {
              brand: "Sewedy",
              rating: "4x6",
              quantity: 30,
              price: 252,
              acEarthCable: {
                brand: "Sewedy",
                rating: "1x6",
                price: 54.67,
                quantity: 30,
              },
            },
            circuitBreaker: { brand: "ABB", rating: "10A-40A", price: 1500 },
            flexible: { brand: "30m", quantity: 1, price: 600 },
            vsn: { quantity: 0, price: 6000 },
          },
          {
            brand: "Sungrow 20RT",
            capacity: 20,
            price: 99900,
            acCable: {
              brand: "Sewedy",
              rating: "4x10",
              quantity: 30,
              price: 382,
              acEarthCable: {
                brand: "Sewedy",
                rating: "1x10",
                price: 96.35,
                quantity: 30,
              },
            },
            circuitBreaker: { brand: "ABB", rating: "10A-40A", price: 1500 },
            flexible: { brand: "30m", quantity: 1, price: 600 },
            vsn: { quantity: 0, price: 6000 },
          },
          {
            brand: "Sungrow 33CX-P2",
            capacity: 33,
            price: 144000,
            acCable: {
              brand: "Sewedy",
              rating: "4x16",
              quantity: 30,
              price: 586,
              acEarthCable: {
                brand: "Sewedy",
                rating: "1x16",
                price: 151.37,
                quantity: 30,
              },
            },
            circuitBreaker: { brand: "ABB", rating: "125A", price: 1881 },
            flexible: { brand: "30m", quantity: 2, price: 600 },
            vsn: { quantity: 1, price: 6000 },
          },
          {
            brand: "Sungrow 40CX-P2",
            capacity: 40,
            price: 162000,
            acCable: {
              brand: "Sewedy",
              rating: "4x16",
              quantity: 30,
              price: 586,
              acEarthCable: {
                brand: "Sewedy",
                rating: "1x16",
                price: 151.37,
                quantity: 30,
              },
            },
            circuitBreaker: { brand: "ABB", rating: "125A", price: 1881 },
            flexible: { brand: "30m", quantity: 2, price: 600 },
            vsn: { quantity: 1, price: 6000 },
          },
          {
            brand: "Sungrow 50CX-P2",
            capacity: 50,
            price: 171600,
            acCable: {
              brand: "Sewedy",
              rating: "3x25+16",
              quantity: 30,
              price: 1062,
              acEarthCable: {
                brand: "Sewedy",
                rating: "1x16",
                price: 151.37,
                quantity: 30,
              },
            },
            circuitBreaker: { brand: "ABB", rating: "125A", price: 1881 },
            flexible: { brand: "30m", quantity: 2, price: 600 },
            vsn: { quantity: 1, price: 6000 },
          },
          {
            brand: "Sungrow 125CX-P2",
            capacity: 125,
            price: 336600,
            acCable: {
              brand: "Sewedy",
              rating: "3x35+16",
              quantity: 30,
              price: 1462,
              acEarthCable: {
                brand: "Sewedy",
                rating: "1x16",
                price: 151.37,
                quantity: 30,
              },
            },
            circuitBreaker: { brand: "ABB", rating: "125A", price: 1881 },
            flexible: { brand: "30m", quantity: 2, price: 600 },
            vsn: { quantity: 1, price: 6000 },
          },
        ],
      },
    })
    .where(eq(productTable.id, 9));

  console.log(res);
}
