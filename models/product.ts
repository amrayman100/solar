export type Signature = {
  by: string;
  at: EpochTimeStamp;
};

export type Product<T> = {
  name: string;
  currency: string;
  isEnabled: boolean;
  created: Signature;
  updated: Signature;
  parameters: T;
};

export type Invertor = { price: number; capacity: number };

export type GridTier = Product<{
  sunHours: number;
  bosRate: number;
  markup: number;
  labourRate: number;
  cosPerWatt: number;
  panelWatt: number;
  mountingPrice: number;
  panelDegradation: number;
  firstYearSpecificProd: number;
  invertors: Invertor[];
}>;

export function calculateKWH(monthlyConsumption: number) {
  return monthlyConsumption / 1.65;
}

export function calculateKWP(sunHours: number, kwh: number) {
  return kwh / (sunHours * 30);
}

export function calculateNumberOfPanels(kwp: number, panelWatt: number) {
  return Math.round(kwp / panelWatt);
}

export function calculateCostOfPanels(
  numberOfPanels: number,
  panelWattage: number,
  cosPerWatt: number
) {
  return numberOfPanels * panelWattage * cosPerWatt;
}

export function getInvertor(invertors: Invertor[], kwp: number) {
  invertors.forEach((invertor) => {
    const lowerBound = 0.8 * kwp;
    const upperBound = 1.2 * kwp;

    if (lowerBound >= invertor.capacity || invertor.capacity <= upperBound) {
      return invertor;
    }
  });
  return null;
}

export function calculateMountingStructureCost(
  mountingPrice: number,
  kwp: number
) {
  return kwp * 1000 * mountingPrice;
}

export function calculateLabourCost(labourRate: number, kwp: number) {
  return labourRate * kwp * 1000;
}

export function calculateBosCost(
  bosRate: number,
  mountingStructureCost: number,
  invertorCost: number,
  costOfPanels: number
) {
  return bosRate * (mountingStructureCost + invertorCost + costOfPanels);
}

export function calculateTotalCost(
  bosCost: number,
  invertorCost: number,
  labourCost: number,
  mountingCost: number
) {
  return bosCost + invertorCost + labourCost + mountingCost;
}

export function calculateSellingCost(totalCost: number, markup: number) {
  return totalCost * markup;
}

export function calculateFirstYearSavings(
  firstYearSpecificProd: number,
  kwp: number
) {
  return firstYearSpecificProd * kwp;
}

export function calculateTwentyFifthSavings(firstYearSavings: number) {
  return firstYearSavings * 25 * 0.8;
}
