export type Signature = {
  by: string;
  at: string;
};

export type Product<T> = {
  name: string;
  currency: string;
  isEnabled: boolean;
  created?: Signature;
  updated?: Signature;
  parameters: T;
};

export type Invertor = { price: number; capacity: number };

export type GridTiedParams = {
  tarif: number;
  sunHours: number;
  bosRate: number;
  markup: number;
  labourRate: number;
  panelCostPerWatt: number;
  panelWatt: number;
  mountingPrice: number;
  panelDegradation: number;
  specificProd: number;
  invertors: Invertor[];
};

export type GridTied = Product<GridTiedParams>;

function roundToDec(number: number) {
  return Math.round(number * 10) / 10;
}

export function calculateKWH(monthlyConsumption: number, tarif: number) {
  return roundToDec(monthlyConsumption / tarif);
}

export function calculateKWP(kwh: number, sunHours: number) {
  return roundToDec(kwh / (sunHours * 30));
}

export function calculateNumberOfPanels(kwp: number, panelWatt: number) {
  return Math.round((kwp * 1000) / panelWatt);
}

export function calculateCostOfPanels(
  numberOfPanels: number,
  panelWattage: number,
  panelCostPerWatt: number
) {
  return roundToDec(numberOfPanels * panelWattage * panelCostPerWatt);
}

export function getInvertor(
  kwp: number,
  invertors: Invertor[]
): Invertor | null {
  for (const invertor of invertors) {
    const targetInvertorCapacity = kwp / 1.2;
    if (targetInvertorCapacity <= invertor.capacity) {
      return invertor;
    }
  }

  return null;
}

export function calculateMountingStructureCost(
  mountingPrice: number,
  kwp: number
) {
  return roundToDec(kwp * 1000 * mountingPrice);
}

export function calculateLabourCost(labourRate: number, kwp: number) {
  return roundToDec(labourRate * kwp * 1000);
}

export function calculateBosCost(
  bosRate: number,
  mountingStructureCost: number,
  invertorCost: number,
  costOfPanels: number
) {
  return roundToDec(
    bosRate * (mountingStructureCost + invertorCost + costOfPanels)
  );
}

export function calculateTotalCost(
  bosCost: number,
  invertorCost: number,
  labourCost: number,
  mountingCost: number,
  costOfPanels: number
) {
  return bosCost + invertorCost + labourCost + mountingCost + costOfPanels;
}

export function calculateSellingCost(totalCost: number, markup: number) {
  return roundToDec(totalCost * markup);
}

export function calculateFirstYearSavings(specificProd: number, kwp: number) {
  return roundToDec(specificProd * kwp);
}

export function calculateTwentyFifthSavings(
  firstYearSavings: number,
  panelDegradation: number
) {
  return roundToDec(firstYearSavings * 25 * panelDegradation);
}
