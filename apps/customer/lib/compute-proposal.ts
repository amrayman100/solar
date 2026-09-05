import {
  calculateSolarIrrigationCost,
  getConstructionProposal,
  getEVCharger,
  getGridTiedProposal,
  getHouseHoldHeater,
  getOffGridProposal,
  getPoolHeater,
  type Construction,
  type ConstructionConsumption,
  type DeviceLoad,
  type EVParams,
  type GridTiedParams,
  type OffGrid,
  type OffGridConsumption,
  type ProposalRequestInfo,
  type SolarHeatingParams,
  type SolarIrrigationParams,
  type WholeSaleConsumption,
} from "@bolt-energy/models";

export type QuoteInput = {
  name: string;
  phoneNumber: string;
  email?: string;
  city: string;
  lat?: number;
  long?: number;
  details: Record<string, unknown>;
};

function contact(input: QuoteInput) {
  return {
    name: input.name,
    phoneNumber: input.phoneNumber,
    email: input.email,
    city: input.city,
    lat: input.lat,
    long: input.long,
  };
}

export function computeProposal(
  slug: string,
  parameters: unknown,
  input: QuoteInput
): unknown {
  const details = input.details;
  if (slug === "grid-tied") {
    return getGridTiedProposal(
      parameters as GridTiedParams,
      0,
      input.city,
      Number(details.monthlyConsumption),
      input.name,
      input.phoneNumber,
      input.lat,
      input.long,
      input.email
    );
  }
  if (slug === "off-grid") {
    const req: ProposalRequestInfo<OffGridConsumption> = {
      ...contact(input),
      consumptionDetails: {
        isConnectedToGrid: Boolean(details.isConnectedToGrid),
        placeBatteriesIndoors: Boolean(details.placeBatteriesIndoors),
        deviceLoads: (details.deviceLoads as DeviceLoad[]) ?? [],
      },
    };
    const offGrid: OffGrid = {
      name: "off-grid",
      currency: "EGP",
      isEnabled: true,
      parameters: parameters as OffGrid["parameters"],
    };
    return getOffGridProposal(req, 0, offGrid);
  }
  if (slug === "solar-irrigation") {
    const params = parameters as SolarIrrigationParams;
    const pumpCapacity = Number(details.pumpCapacity);
    return {
      name: input.name,
      phoneNumber: input.phoneNumber,
      emailAddress: input.email,
      proposalDetails: {
        pumpCapacity,
        cost: calculateSolarIrrigationCost(pumpCapacity, params.pricePerkW),
      },
    };
  }
  if (slug === "solar-heating") {
    const params = parameters as SolarHeatingParams;
    const isHousehold = Boolean(details.isHousehold);
    if (isHousehold) {
      const numberOfRooms = Number(details.numberOfRooms);
      return {
        name: input.name,
        phoneNumber: input.phoneNumber,
        emailAddress: input.email,
        proposalDetails: {
          type: "house-hold",
          numberOfRooms,
          heater: getHouseHoldHeater(params.houseHoldHeaters, numberOfRooms),
        },
      };
    }
    const poolVolume = Number(details.poolVolume);
    return {
      name: input.name,
      phoneNumber: input.phoneNumber,
      emailAddress: input.email,
      proposalDetails: {
        type: "pool",
        poolVolume,
        heater: getPoolHeater(params.poolHeaters, poolVolume),
      },
    };
  }
  if (slug === "ev") {
    const params = parameters as EVParams;
    const power = Number(details.chargerPower);
    return {
      name: input.name,
      phoneNumber: input.phoneNumber,
      emailAddress: input.email,
      proposalDetails: {
        charger: getEVCharger(params.chargers, power),
      },
    };
  }
  if (slug === "construction") {
    const construction: Construction = {
      name: "construction",
      currency: "EGP",
      isEnabled: true,
      parameters: parameters as Construction["parameters"],
    };
    const type = String(details.type);
    let consumption: ConstructionConsumption;
    if (type === "homeFinishing") {
      consumption = {
        type: "homeFinishing",
        finishingType: details.finishingType as "basic" | "premium" | "luxury",
        m2: Number(details.m2),
      };
    } else if (type === "solar-panel-installations") {
      consumption = {
        type: "solar-panel-installations",
        plantSizeKws: Number(details.plantSizeKws),
      };
    } else {
      consumption = {
        type: "generalContracting",
        subject: String(details.subject ?? ""),
      };
    }
    return getConstructionProposal(
      { ...contact(input), consumptionDetails: consumption },
      0,
      construction
    );
  }
  if (slug === "whole-sale") {
    const order = details.order as WholeSaleConsumption;
    return {
      name: input.name,
      phoneNumber: input.phoneNumber,
      emailAddress: input.email,
      proposalDetails: { order },
    };
  }
  throw new Error("Unknown solution");
}
