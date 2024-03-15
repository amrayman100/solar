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

export type ProductProposal<T> = {
  name: string;
  emailAddress: string;
  phoneNumber: string;
  productId: number;
  addressLatitude: number;
  addressLongitude: number;
  proposalDetails: T;
  created?: Signature;
};

export type Panel = {
  brand: string;
  powerOutputWatt: number;
  pricePerWatt: number;
  width: number;
};

export type CitySpecificity = {
  cityName: string;
  quantity: number;
};

export type AcEarthCable = {
  brand: string;
  rating: string;
  price: number;
  quantity: number;
};

export type CircuitBreaker = {
  brand: string;
  rating: string;
  price: number;
};

export type AcCable = {
  brand: string;
  price: number;
  rating: string;
  acEarthCable: AcEarthCable;
  quantity: number;
};

export type Flexible = {
  brand: string;
  quantity: number;
  price: number;
};

export type Inverter = {
  brand: string;
  price: number;
  capacity: number;
  acCable: AcCable;
  circuitBreaker: CircuitBreaker;
  flexible: Flexible;
  vsn: { quantity: number; price: number };
};

export type DCCable = {
  brand: string;
  price: number;
  rating: string;
};

export type DCEarthCable = {
  brand: string;
  quantity: number;
  rating: string;
  price: number;
};

export type MC4 = {
  brand: string;
  price: number;
};

export type EarthLeakage = {
  brand: string;
  rating: string;
  price: number;
  citySpecificities: CitySpecificity[];
};

export type SwitchBox = {
  brand: string;
  price: number;
  citySpecificities: CitySpecificity[];
};

export type Fuse = {
  brand: string;
  price: number;
};

export type Earth = {
  brand: string;
  price: number;
};

export type Maintenance = {
  price: number;
  amountOfVisits: number;
};

export type ElectricityCompanyCheckup = {
  price: number;
  amountOfVisits: number;
};

export type GridTiedParams = {
  panel: Panel;
  tarif: number;
  markup: number;
  panelDegradation: number;
  specificProd: number;
  mountingPrice: number;
  inverters: Inverter[];
  labourBaseCost: number;
  structureSpan: number;
  concreteFootingPrice: number;
  dollarRate: number;
  truckPrice: number;
  dcCable: DCCable;
  dcEarthCable: DCEarthCable;
  earthLeakage: EarthLeakage;
  switchBox: SwitchBox;
  fuse: Fuse;
  earth: Earth;
  cleaningToolPrice: number;
  maintenance: Maintenance;
  electricityCompanyCheckup: ElectricityCompanyCheckup;
  mc4: MC4;
};

export type GridTiedProposalDetails = {
  systemSize: number;
  costOfPanels: number;
  inverter: {
    inverterInfo: Inverter;
    inverterBaseCost: number;
    inverterACCableCost: number;
    inverterACCableEarthCost: number;
    inverterCircuitBreaker: number;
    inverterVSNCost: number;
    inverterFlexibleCost: number;
  };
  numberOfPanels: number;
  labourCost: number;
  concreteFootingCost: number;
  dcCableCost: number;
  dcEarthCableCost: number;
  earthCost: number;
  fuseCost: number;
  mc4Cost: number;
  switchBoxCost: number;
  earthLeakageCost: number;
  cleaningToolPrice: number;
  electricityCompanyCost: number;
  maintenanceCost: number;
  mountingStructureCost: number;
  transportationCost: number;
  totalCost: number;
  sellingCost: number;
  firstYearSavings: number;
  twentyFifthYearSavings: number;
  panelDegradation: number;
  currentMonthlyBill: number;
  pricePerWatt: number;
};

export type GridTied = Product<GridTiedParams>;

export type GridTiedProposal = ProductProposal<GridTiedProposalDetails>;

function roundToDec(number: number) {
  return Math.round(number * 10) / 10;
}

export function calculateSystemSize(
  monthlyConsumption: number,
  tarif: number,
  specificProd: number
) {
  return roundToDec((monthlyConsumption * 12) / tarif / specificProd);
}

export function calculateNumberofPanels(
  systemSize: number,
  panelPowerOutputWatt: number
) {
  const panelRating = panelPowerOutputWatt / 1000;
  return Math.round(systemSize / panelRating);
}

export function calulateCostOfPanels(
  numberOfPanels: number,
  dollarRate: number,
  panelCostPerWatt: number,
  panelPowerOutputWatt: number
) {
  return roundToDec(
    numberOfPanels * dollarRate * panelCostPerWatt * panelPowerOutputWatt
  );
}

export function getInverter(
  systemSize: number,
  inverters: Inverter[]
): Inverter | null {
  for (const inverter of inverters) {
    // kwp = systemSize
    const targetInverterCapacity = systemSize / 1.2;
    if (targetInverterCapacity <= inverter.capacity) {
      return inverter;
    }
  }

  return null;
}

export function getInverterBaseCost(inverter: Inverter, dollarRate: number) {
  return roundToDec(inverter.price * dollarRate);
}

export function getInverterACCableCost(inverter: Inverter) {
  return roundToDec(inverter.acCable?.price * inverter.acCable?.quantity);
}

export function getInverterACEarthCableCost(inverter: Inverter) {
  if (!inverter?.acCable?.acEarthCable) {
    return 0;
  }

  return roundToDec(
    inverter.acCable.acEarthCable.price * inverter.acCable.acEarthCable.quantity
  );
}

export function getInverterCircuitBreakerCost(inverter: Inverter) {
  return roundToDec(inverter.circuitBreaker.price);
}

export function getInverterVSNCost(inverter: Inverter) {
  return roundToDec(inverter.vsn.price * inverter.vsn.quantity);
}

export function getInverterFlexibleCost(inverter: Inverter) {
  return roundToDec(inverter.flexible.price * inverter.flexible.quantity);
}

export function calculateMountingStructureCost(
  mountingPrice: number,
  systemSize: number
) {
  return roundToDec(systemSize * mountingPrice);
}

export function calculateConcreteFootingCost(
  numberOfPanels: number,
  panelWidth: number,
  structureSpan: number,
  concreteFootingPrice: number
) {
  return roundToDec(
    ((numberOfPanels * panelWidth) / structureSpan) * concreteFootingPrice
  );
}

export function calculateDCCableCost(systemSize: number, dcCableCost: number) {
  return roundToDec(systemSize * dcCableCost * 10);
}

export function calculateDCEarthCableCost(dcEarthCable: DCEarthCable) {
  return roundToDec(dcEarthCable.price * dcEarthCable.quantity);
}

export function getNumberOfStrings(numberOfPanels: number) {
  if (numberOfPanels <= 20) {
    return 1;
  }

  const extraStrings = Math.round(numberOfPanels / 20);
  return extraStrings + 1;
}

export function calculateMc4Cost(mc4: MC4, numberOfStrings: number) {
  return roundToDec(mc4.price * numberOfStrings * 3);
}

export function getFusePrice(fusePrice: number, numberOfStrings: number) {
  return roundToDec(fusePrice * numberOfStrings);
}

export function getEarthCost(earth: Earth) {
  return earth.price;
}

export function getEarthLeakageCost(
  earthLeakage: EarthLeakage,
  cityName: string
) {
  const citySpecificity = earthLeakage.citySpecificities.find(
    (city) => city.cityName == cityName
  );

  if (!citySpecificity) {
    return 0;
  }

  return roundToDec(earthLeakage.price * citySpecificity.quantity);
}

export function getSwitchBoxCost(switchBox: SwitchBox, cityName: string) {
  const citySpecificity = switchBox.citySpecificities.find(
    (city) => city.cityName == cityName
  );

  if (!citySpecificity) {
    return 0;
  }

  return roundToDec(switchBox.price * citySpecificity.quantity);
}

export function getLabourCost(systemSize: number, labourBaseCost: number) {
  return roundToDec(systemSize * labourBaseCost);
}

export function getTransportationCost(
  truckPrice: number,
  numberOfPanels: number
) {
  let truckQuantity = Math.round(numberOfPanels / 31);
  if (truckQuantity == 0) truckQuantity = 1;

  return roundToDec(truckPrice * truckQuantity);
}

export function getMaintenanceCost(maintenance: Maintenance) {
  return roundToDec(maintenance.price * maintenance.amountOfVisits);
}

export function getElectricityCompanyCost(
  electricityCompanyCheckup: ElectricityCompanyCheckup
) {
  return roundToDec(
    electricityCompanyCheckup.amountOfVisits * electricityCompanyCheckup.price
  );
}

export function calculateTotalCost(
  inverterTotalCost: number,
  labourCost: number,
  costOfPanels: number,
  concreteFootingCost: number,
  dcCableCost: number,
  dcEarthCableCost: number,
  switchBoxCost: number,
  earthLeakageCost: number,
  earthCost: number,
  fusePrice: number,
  mc4Cost: number,
  cleaningToolCost: number,
  electricityCompanyCost: number,
  maintenanceCost: number,
  mountingStructureCost: number,
  transportationCost: number
) {
  return (
    inverterTotalCost +
    labourCost +
    costOfPanels +
    concreteFootingCost +
    dcCableCost +
    dcEarthCableCost +
    fusePrice +
    mc4Cost +
    earthCost +
    switchBoxCost +
    earthLeakageCost +
    cleaningToolCost +
    electricityCompanyCost +
    maintenanceCost +
    mountingStructureCost +
    transportationCost
  );
}

export function calculateSellingCost(totalCost: number, markup: number) {
  return roundToDec(totalCost + totalCost * markup);
}

export function calculateFirstYearSavings(specificProd: number, kwp: number) {
  return roundToDec(specificProd * kwp);
}

export function calculateFirstYearMonthlyBill(firstYearSavings: number) {
  return roundToDec(firstYearSavings / 12);
}

export function calculateCumulativeSavings(
  years: number,
  firstYearSavings: number,
  panelDegradation: number
) {
  return roundToDec(firstYearSavings * years * panelDegradation);
}

export function calculateTwentyFifthSavings(
  firstYearSavings: number,
  panelDegradation: number
) {
  return roundToDec(firstYearSavings * 25 * panelDegradation);
}
