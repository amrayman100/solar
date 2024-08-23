import { ProposalRequestInfo } from "@/actions/proposal";

export type Signature = {
  by: string;
  at: string;
};

export type BillingPercentage = {
  downPaymentPercentage: number;
  componentsSupplyPercentage: number;
  installationPercentage: number;
  commissionPercentage: number;
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
  id: number;
  emailAddress?: string;
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

export type OffGridPanel = Panel & {
  switchBox: SwitchBox;
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
  quantity: number;
};

export type AcCable = {
  brand: string;
  price: number;
  rating: string;
  quantity: number;
  acEarthCable: AcEarthCable;
};

export type OffGridDcCable = DCCable & {
  meterPerString: number;
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

export type OffGridInverter = Omit<Inverter, "flexible" | "vsn"> & {
  systemVoltage: number;
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
  citySpecificities: Array<CitySpecificity>;
};

export type SwitchBox = {
  brand: string;
  price: number;
  citySpecificities: Array<CitySpecificity>;
};

export type Fuse = {
  brand: string;
  price: number;
};

export type ManualTransferSwitch = {
  brand: string;
  quantity: number;
  rating: string;
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
  tarifEscalation: number;
  markup: number;
  billingPercentage: BillingPercentage;
  panelDegradation: number;
  specificProd: number;
  mountingPrice: number;
  inverters: Array<Inverter>;
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

export type ProposalBilling = {
  downPaymentFee: number;
  componentsSupplyFee: number;
  installationFee: number;
  commissionFee: number;
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
  firstYearSavings: number;
  twentyFifthYearSavings: number;
  panelDegradation: number;
  firstYearMonthlyBill: number;
  currentMonthlyBill: number;
  pricePerWatt: number;
  sellingCost: number;
  totalCost: number;
  billing: ProposalBilling;
  tarifEscalation: number;
};

export type OffGridProposalDetails = {
  isConnectedToGrid: boolean;
  deviceLoads: Array<DeviceLoad>;
  inverter: {
    inverterInfo: OffGridInverter;
    inverterACCableCost: number;
    inverterACCableEarthCost: number;
    inverterCircuitBreaker: number;
  };
  costOfPanels: number;
  mountingStructureCost: number;
  dcCableCosts: number;
  batteryCableCosts: number;
  labourCost: number;
  mc4Cost: number;
  manualTransferSwitchCost: number;
  batteryCircuitBreakerCost: number;
  fuseCost: number;
  switchBoxCost: number;
  cleaningToolCost: number;
  batteryStandCost: number;
  sellingCost: number;
  totalCost: number;
  billing: ProposalBilling;
  battery: OffGridBattery;
  numberOfBatteries: number;
  batteriesCost: number;
  panel: OffGridPanel;
  numberOfPanels: number;
};

export type DeviceLoadTemplate = {
  name: string;
  hasSurgePower: boolean;
  powerWatt: number;
  hasManualTransferSwitch: boolean;
  unit: "hp" | "watt";
};

export type DeviceLoad = DeviceLoadTemplate & {
  name: string;
  quantity: number;
  workingHours?: number;
  morningHours?: number;
  eveningHours?: number;
  hasManualTransferSwitch: boolean;
  isCustom: boolean;
  powerHP?: number;
  unit: "hp" | "watt";
};

export type CapacityVariance = {
  hoursTillEmpty: number;
  capacity: number;
};

export type OffGridBattery = {
  capacity: number;
  voltage: number;
  depthOfDischarge: number;
  capacityVariances: Array<CapacityVariance>;
  price: number;
  meterString: number;
  cableCost: number;
  circuitBreaker: CircuitBreaker;
  brand: string;
};

export type OffGridParams = {
  panel: OffGridPanel;
  battery: OffGridBattery;
  inverters: Array<OffGridInverter>;
  deviceLoadTemplates: Array<DeviceLoadTemplate>;
  mountingPrice: number;
  dcCable: OffGridDcCable;
  labourCost: number;
  mc4: MC4;
  manualTransferSwitch: ManualTransferSwitch;
  fuse: Fuse;
  transportationCost: number;
  flexible: Flexible;
  cleaningToolPrice: number;
  batteryStandPrice: {
    insideHousePrice: number;
    outsideHousePerFourBatteriesPrice: number;
  };
  dollarRate: number;
  billingPercentage: BillingPercentage;
  markup: number;
};

export type OffGridConsumption = {
  isConnectedToGrid: boolean;
  deviceLoads: Array<DeviceLoad>;
  placeBatteriesIndoors: boolean;
};

export type SolarIrrigationParams = {
  pricePerkW: number;
};

export type SolarIrrigationProposalDetails = {
  pumpCapacity: number;
  cost: number;
};

export type SolarHeater = {
  brand: string;
  price: number;
};

export type HouseholdSolarHeater = SolarHeater & {
  maxNumberOfRooms: number;
  litres: number;
};

export type PoolSolarHeater = SolarHeater & {
  minVolume: number;
  maxVolume: number;
};

export type SolarHeatingParams = {
  houseHoldHeaters: Array<HouseholdSolarHeater>;
  poolHeaters: Array<PoolSolarHeater>;
};

export type SolarHeatingProposalDetails = {
  type: string;
  heater: HouseholdSolarHeater | PoolSolarHeater | null;
  numberOfRooms?: number;
  poolVolume?: number;
};

export type SolarIrrigationConsumption = { pumpCapacity: number };

export type GridTied = Product<GridTiedParams>;

export type OffGrid = Product<OffGridParams>;

export type SolarIrrigation = Product<SolarIrrigationParams>;

export type GridTiedProposal = ProductProposal<GridTiedProposalDetails>;

export type OffGridProposal = ProductProposal<OffGridProposalDetails>;

export type SolarIrrigationProposal =
  ProductProposal<SolarIrrigationProposalDetails>;

export type SolarHeatingConsumption =
  | {
      numberOfRooms: number;
      isHousehold: true;
    }
  | {
      isHousehold: false;
      poolVolume: number;
    };

export type Charger = {
  power: number;
  price: number;
};

export type EVConsumption = {
  chargingPower: number;
};

export type SolarHeating = Product<SolarHeatingParams>;
export type SolarHeatingProposal = ProductProposal<SolarHeatingProposalDetails>;

export type EVParams = {
  chargers: Array<Charger>;
};

export type EVProposalDetails = {
  chargingPower: number;
  charger: Charger | null;
};

export type EV = Product<EVParams>;
export type EVProposal = ProductProposal<EVProposalDetails>;

export type WholeSaleMeters = {
  meterCapacity: number;
  numberOfMeters: number;
  type: "mono" | "bi";
};

export type WholeSaleSolarStreetLight = {
  lightPowerWatt: number;
  poleHeight: number;
  numberOfLights: number;
};

export type WholeSaleCables = {
  type: string;
  thickness: number;
  make: string;
  numberOfCables: number;
};

export type WholeSaleMountingStructure = {
  type: "alum" | "steel";
  quantityWattPerMetricTon: number;
};

export type WholeSalePanels = {
  inputWatt: number;
  numberOfPanels: number;
};

export type WholeSaleInverters = {
  capacityKW: number;
  numberOfInverters: number;
};

export type WholeSaleConsumption = {
  meters?: WholeSaleMeters;
  streetLights?: WholeSaleSolarStreetLight;
  panels?: WholeSalePanels;
  cables?: WholeSaleCables;
  inverters?: WholeSaleInverters;
  companyName?: string;
  mountingStructures?: WholeSaleMountingStructure;
};

export type WholeSaleProposalDetails = {
  order: WholeSaleConsumption;
};

export type WholeSale = Product<{}>;

export type WholeSaleProposal = ProductProposal<WholeSaleProposalDetails>;

export function calculateTotalPower(deviceLoads: Array<DeviceLoad>) {
  let totalPower = 0;

  deviceLoads.forEach((device) => {
    // const powerInWatt = device.powerWatt * 735.5;
    totalPower += device.powerWatt * device.quantity;
  });

  return totalPower;
}

export function calculateTotalSurgePower(deviceLoads: Array<DeviceLoad>) {
  let totalSurgePower = 0;

  deviceLoads.forEach((device) => {
    if (device.hasSurgePower) {
      // const powerInWatt = device.powerWatt * 735.5 * 3;
      totalSurgePower += device.powerWatt * device.quantity * 3;
    } else {
      totalSurgePower += device.powerWatt * device.quantity;
    }
  });

  return totalSurgePower;
}

export function getInvertorForOffGrid(
  inverters: OffGridInverter[],
  totalPower: number,
  surgePower: number
) {
  for (const inverter of inverters) {
    const surgedCapacity = inverter.capacity * 1.8;
    if (inverter.capacity > totalPower && surgedCapacity > surgePower) {
      return inverter;
    }
  }

  return null;
}

export function calculateActualC(
  battery: OffGridBattery,
  inverter: OffGridInverter,
  totalPower: number
) {
  console.log(battery.capacity, inverter.systemVoltage, totalPower);
  return (battery.capacity * inverter.systemVoltage) / totalPower;
}

function isBetween(n: number, a: number, b: number) {
  return (n - a) * (n - b) <= 0;
}

export function calculateRealBatteryCapacityInterpolation(
  battery: OffGridBattery,
  actualC: number
) {
  if (actualC < 1) {
    actualC = 1;
  }

  let upperBound: CapacityVariance | null = null;
  let lowerBound: CapacityVariance | null = null;
  let isFound = false;
  for (let i = 0; i < battery.capacityVariances.length - 1; i++) {
    lowerBound = battery.capacityVariances[i];
    upperBound = battery.capacityVariances[i + 1];

    isFound = isBetween(
      actualC,
      lowerBound.hoursTillEmpty,
      upperBound.hoursTillEmpty
    );

    if (isFound) break;
  }

  if (!isFound || !upperBound || !lowerBound) {
    lowerBound = battery.capacityVariances[0];
    upperBound = battery.capacityVariances[1];
  }

  const a = (actualC - lowerBound.hoursTillEmpty) * upperBound.capacity;
  const b = (upperBound.hoursTillEmpty - actualC) * lowerBound.capacity;
  const c = a + b;

  const x = actualC - lowerBound.hoursTillEmpty;
  const y = upperBound.hoursTillEmpty - actualC;
  const w = x + y;

  return c / w;
}

export function calculateNumberOfOffGridBatteryStrings(
  battery: OffGridBattery,
  inverter: OffGridInverter,
  energyNeeded: number,
  realBatteryCapacity: number
) {
  return Math.ceil(
    energyNeeded /
      roundToDec(
        inverter.systemVoltage * battery.depthOfDischarge * realBatteryCapacity
      )
  );
}

export function calculateNumberOfOffGridBatteries(
  numberOfStrings: number,
  battery: OffGridBattery,
  inverter: OffGridInverter
) {
  return Math.ceil(
    numberOfStrings * (inverter.systemVoltage / battery.voltage)
  );
}

export function calculateOffGridSolarEnergyNeeded(
  deviceLoads: Array<DeviceLoad>,
  isConnectedToGrid: boolean
) {
  let solarEnergyNeeded = 0;
  if (isConnectedToGrid) {
    deviceLoads.forEach((device) => {
      const totalPower = device.powerWatt * device.quantity;
      solarEnergyNeeded += (device.workingHours || 0) * totalPower;
    });
  } else {
    deviceLoads.forEach((device) => {
      const totalPower = device.powerWatt * device.quantity;
      console.log(totalPower);
      const hours =
        (device.morningHours || 0) * 0.3 + (device.eveningHours || 0);
      console.log(hours);
      solarEnergyNeeded += hours * totalPower;
    });
  }

  return solarEnergyNeeded;
}

export function calculateNumberOfOffGridPanels(
  solarEnergyNeeded: number,
  panel: OffGridPanel,
  sunHours: number
) {
  const solarEnergyNeededKW = solarEnergyNeeded / 1000;
  const panelRatingKW = panel.powerOutputWatt / 1000;
  const solarEnergy = Math.ceil(
    solarEnergyNeededKW / (sunHours * panelRatingKW)
  );

  return solarEnergy % 2 == 0 ? solarEnergy : solarEnergy + 1;
}

export function roundToDec(number: number) {
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
  panel: OffGridPanel | Panel
) {
  return roundToDec(
    numberOfPanels * dollarRate * panel.pricePerWatt * panel.powerOutputWatt
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
  return roundToDec(
    inverter.circuitBreaker.price * inverter.circuitBreaker.quantity
  );
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

export function calculateFirstYearSavings(
  specificProd: number,
  systemSize: number
) {
  return roundToDec(specificProd * systemSize);
}

export function calculateCumulativeSavings(
  years: number,
  firstYearSavings: number,
  panelDegradation: number,
  tarifEscalation: number
) {
  return roundToDec(
    firstYearSavings * years * panelDegradation * tarifEscalation
  );
}

//(firstYearSavings * tarif) - monthlyConsumption
export function calculateFirstYearMonthlyBill(
  firstYearSavings: number,
  tarif: number,
  monthlyConsumption: number
) {
  return roundToDec((firstYearSavings * tarif) / 12 - monthlyConsumption);
}

export function calculateTwentyFifthSavings(
  firstYearSavings: number,
  panelDegradation: number,
  tarifEscalation: number
) {
  return roundToDec(firstYearSavings * 25 * panelDegradation * tarifEscalation);
}

export function getGridTiedProposal(
  parameters: GridTiedParams,
  gridTiedId: number,
  city: string,
  monthlyConsumption: number,
  name: string,
  phoneNumber: string,
  lat?: number | undefined,
  long?: number | undefined,
  email?: string | undefined
) {
  debugger;
  const systemSize = calculateSystemSize(
    monthlyConsumption,
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
    parameters.panel
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

  const earthLeakageCost = getEarthLeakageCost(parameters.earthLeakage, city);
  const switchBoxCost = getSwitchBoxCost(parameters.switchBox, city);

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
    monthlyConsumption
  );

  const twentyFifthYearSavings = calculateTwentyFifthSavings(
    firstYearSavings,
    parameters.panelDegradation,
    parameters.tarifEscalation
  );

  const proposal: GridTiedProposal = {
    id: 0,
    name: name,
    emailAddress: email,
    phoneNumber: phoneNumber,
    productId: gridTiedId,
    addressLatitude: lat || 0,
    addressLongitude: long || 0,
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
      currentMonthlyBill: monthlyConsumption,
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

  return proposal;
}

export function calculateOffGridMountingStructureCost(
  numberOfSolarPanels: number,
  mountingPrice: number,
  panel: OffGridPanel
) {
  const systemSize = numberOfSolarPanels * (panel.powerOutputWatt / 1000);
  return roundToDec(systemSize * mountingPrice);
}

export function calculateOffGridDCCableCost(
  numberOfPanels: number,
  dcCable: OffGridDcCable
) {
  return roundToDec(
    (numberOfPanels / 2) * dcCable.meterPerString * dcCable.price
  );
}

export function calculateOffGridBatteryCableCosts(
  numberOfBatteryStrings: number,
  battery: OffGridBattery
) {
  return roundToDec(
    numberOfBatteryStrings * battery.meterString * battery.cableCost
  );
}

export function calculateOffGridMc4Cost(mc4: MC4, numberOfPanels: number) {
  return roundToDec(mc4.price * (numberOfPanels / 2));
}

export function calculateOffGridFusePrice(fuse: Fuse, numberOfPanels: number) {
  return roundToDec((numberOfPanels / 2) * fuse.price);
}

export function calculateSolarIrrigationCost(
  pumpCapacity: number,
  pricePerkW: number
) {
  return roundToDec(pumpCapacity * pricePerkW * 0.7457);
}

export function getPoolHeater(
  poolHeaters: Array<PoolSolarHeater>,
  poolVolume: number
): PoolSolarHeater | null {
  for (let i = 0; i < poolHeaters.length; i++) {
    const heater = poolHeaters[i];
    if (heater.minVolume <= poolVolume && poolVolume <= heater.maxVolume) {
      return heater;
    }
  }

  return null;
}

export function getHouseHoldHeater(
  houseHoldHeaters: Array<HouseholdSolarHeater>,
  numberOfRooms: number
): HouseholdSolarHeater | null {
  for (let i = 0; i < houseHoldHeaters.length; i++) {
    const heater = houseHoldHeaters[i];
    if (numberOfRooms <= heater.maxNumberOfRooms) {
      return heater;
    }
  }

  return null;
}

export function getEVCharger(
  chargers: Array<Charger>,
  consumptionChargingPower: number
) {
  for (let i = 0; i < chargers.length; i++) {
    const charger = chargers[i];
    console.log(charger.power, consumptionChargingPower);
    if (charger.power == consumptionChargingPower) {
      return charger;
    }
  }

  return null;
}

export function getOffGridProposal(
  req: ProposalRequestInfo<OffGridConsumption>,
  id: number,
  offGrid: OffGrid
): OffGridProposal {
  const params = offGrid.parameters;

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
      id: 0,
      name: req.name,
      emailAddress: req.email,
      phoneNumber: req.phoneNumber,
      productId: id,
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

    return proposal;
  } else {
    throw new Error("inverter not found");
  }
}

const deviceLoadTemplates: DeviceLoadTemplate[] = [
  {
    name: "lamp",
    powerWatt: 12,
    hasSurgePower: false,
    hasManualTransferSwitch: false,
    unit: "watt",
  },
  {
    name: "socket",
    powerWatt: 50,
    hasSurgePower: false,
    hasManualTransferSwitch: false,
    unit: "watt",
  },
  {
    name: "router",
    powerWatt: 50,
    hasSurgePower: false,
    hasManualTransferSwitch: false,
    unit: "watt",
  },
  {
    name: "tv",
    powerWatt: 200,
    hasSurgePower: false,
    hasManualTransferSwitch: false,
    unit: "watt",
  },
  {
    name: "fridge",
    powerWatt: 400,
    hasSurgePower: true,
    hasManualTransferSwitch: false,
    unit: "watt",
  },
  {
    name: "ac",
    powerWatt: 1676.25,
    hasSurgePower: true,
    hasManualTransferSwitch: false,
    unit: "hp",
  },
  {
    name: "ac-inverter",
    powerWatt: 1676.25,
    hasSurgePower: false,
    hasManualTransferSwitch: false,
    unit: "hp",
  },
  {
    name: "fan",
    powerWatt: 100,
    hasSurgePower: true,
    hasManualTransferSwitch: false,
    unit: "watt",
  },
  {
    name: "motor",
    powerWatt: 745,
    hasSurgePower: true,
    hasManualTransferSwitch: false,
    unit: "hp",
  },
  {
    name: "shutter",
    powerWatt: 330,
    hasSurgePower: true,
    hasManualTransferSwitch: false,
    unit: "watt",
  },
  {
    name: "waterHeater",
    powerWatt: 2000,
    hasSurgePower: false,
    hasManualTransferSwitch: false,
    unit: "watt",
  },
  {
    name: "camera",
    powerWatt: 70,
    hasSurgePower: false,
    hasManualTransferSwitch: false,
    unit: "watt",
  },
];

const devices: DeviceLoad[] = [
  {
    name: "lamp",
    powerWatt: 12,
    hasSurgePower: false,
    quantity: 1,
    morningHours: 1,
    hasManualTransferSwitch: false,
    isCustom: false,
    unit: "watt",
  },
  {
    name: "socket",
    powerWatt: 50,
    hasSurgePower: false,
    quantity: 3,
    morningHours: 1,
    hasManualTransferSwitch: false,
    isCustom: false,
    unit: "watt",
  },
  {
    name: "router",
    powerWatt: 50,
    hasSurgePower: false,
    quantity: 2,
    morningHours: 1,
    hasManualTransferSwitch: false,
    isCustom: false,
    unit: "watt",
  },
  {
    name: "fridge",
    powerWatt: 400,
    hasSurgePower: true,
    quantity: 1,
    morningHours: 1,
    hasManualTransferSwitch: false,
    isCustom: false,
    unit: "watt",
  },
  {
    name: "shutter",
    powerWatt: 330,
    hasSurgePower: true,
    quantity: 2,
    morningHours: 1,
    hasManualTransferSwitch: false,
    isCustom: false,
    unit: "watt",
  },
  {
    name: "camera",
    powerWatt: 70,
    hasSurgePower: false,
    quantity: 4,
    morningHours: 1,
    hasManualTransferSwitch: false,
    isCustom: false,
    unit: "watt",
  },
];

const inverters: OffGridInverter[] = [
  {
    capacity: 1000,
    brand: "1KW - MPPT",
    systemVoltage: 12,
    price: 15502,
    acCable: {
      brand: "El-Sweedy",
      rating: "1x4",
      price: 37.19,
      quantity: 100,
      acEarthCable: {
        brand: "El-Sweedy",
        rating: "1x6",
        price: 54.67,
        quantity: 15,
      },
    },
    circuitBreaker: {
      brand: "ABB",
      rating: "10A-40A",
      price: 510,
      quantity: 45,
    },
  },
  {
    capacity: 2000,
    brand: "2KW - MPPT",
    systemVoltage: 24,
    price: 15502,
    acCable: {
      brand: "El-Sweedy",
      rating: "1x4",
      price: 37.19,
      quantity: 100,
      acEarthCable: {
        brand: "El-Sweedy",
        rating: "1x6",
        price: 54.67,
        quantity: 15,
      },
    },
    circuitBreaker: {
      brand: "ABB",
      rating: "10A-40A",
      price: 510,
      quantity: 45,
    },
  },
  {
    capacity: 3000,
    brand: "3KW - MPPT",
    systemVoltage: 24,
    price: 15502,
    acCable: {
      brand: "El-Sweedy",
      rating: "1x4",
      price: 37.19,
      quantity: 100,
      acEarthCable: {
        brand: "El-Sweedy",
        rating: "1x6",
        price: 54.67,
        quantity: 15,
      },
    },
    circuitBreaker: {
      brand: "ABB",
      rating: "10A-40A",
      price: 510,
      quantity: 45,
    },
  },
  {
    capacity: 5000,
    brand: "5KW - MPPT",
    systemVoltage: 48,
    price: 33120,
    acCable: {
      brand: "El-Sweedy",
      rating: "1x6",
      price: 54.67,
      quantity: 100,
      acEarthCable: {
        brand: "El-Sweedy",
        rating: "1x6",
        price: 54.67,
        quantity: 15,
      },
    },
    circuitBreaker: {
      brand: "ABB",
      rating: "10A-40A",
      price: 510,
      quantity: 45,
    },
  },
  {
    capacity: 10000,
    brand: "2 x 5.2kWp - MPPT",
    systemVoltage: 48,
    price: 80000,
    acCable: {
      brand: "El-Sweedy",
      rating: "1x6",
      price: 54.67,
      quantity: 200,
      acEarthCable: {
        brand: "El-Sweedy",
        rating: "1x6",
        price: 54.67,
        quantity: 30,
      },
    },
    circuitBreaker: {
      brand: "ABB",
      rating: "10A-40A",
      price: 510,
      quantity: 90,
    },
  },
  {
    capacity: 15000,
    brand: "3 x 5.2kWp - MPPT",
    systemVoltage: 48,
    price: 120000,
    acCable: {
      brand: "El-Sweedy",
      rating: "1x6",
      price: 54.67,
      quantity: 300,
      acEarthCable: {
        brand: "El-Sweedy",
        rating: "1x6",
        price: 54.67,
        quantity: 45,
      },
    },
    circuitBreaker: {
      brand: "ABB",
      rating: "10A-40A",
      price: 510,
      quantity: 135,
    },
  },
  {
    capacity: 20000,
    brand: "4 x 5.2kWp - MPPT",
    systemVoltage: 48,
    price: 160000,
    acCable: {
      brand: "El-Sweedy",
      rating: "1x6",
      price: 54.67,
      quantity: 400,
      acEarthCable: {
        brand: "El-Sweedy",
        rating: "1x6",
        price: 54.67,
        quantity: 60,
      },
    },
    circuitBreaker: {
      brand: "ABB",
      rating: "10A-40A",
      price: 510,
      quantity: 180,
    },
  },
  {
    capacity: 25000,
    brand: "5 x 5.2kWp - MPPT",
    systemVoltage: 48,
    price: 200000,
    acCable: {
      brand: "El-Sweedy",
      rating: "1x6",
      price: 54.67,
      quantity: 500,
      acEarthCable: {
        brand: "El-Sweedy",
        rating: "1x6",
        price: 54.67,
        quantity: 75,
      },
    },
    circuitBreaker: {
      brand: "ABB",
      rating: "10A-40A",
      price: 510,
      quantity: 225,
    },
  },
  {
    capacity: 30000,
    brand: "6 x 5.2kWp - MPPT",
    systemVoltage: 48,
    price: 240000,
    acCable: {
      brand: "El-Sweedy",
      rating: "1x6",
      price: 54.67,
      quantity: 600,
      acEarthCable: {
        brand: "El-Sweedy",
        rating: "1x6",
        price: 54.67,
        quantity: 90,
      },
    },
    circuitBreaker: {
      brand: "ABB",
      rating: "10A-40A",
      price: 510,
      quantity: 270,
    },
  },
  {
    capacity: 35000,
    brand: "7 x 5.2kWp - MPPT",
    systemVoltage: 48,
    price: 280000,
    acCable: {
      brand: "El-Sweedy",
      rating: "1x6",
      price: 54.67,
      quantity: 700,
      acEarthCable: {
        brand: "El-Sweedy",
        rating: "1x6",
        price: 54.67,
        quantity: 105,
      },
    },
    circuitBreaker: {
      brand: "ABB",
      rating: "10A-40A",
      price: 510,
      quantity: 315,
    },
  },
  {
    capacity: 40000,
    brand: "8 x 5.2kWp - MPPT",
    systemVoltage: 48,
    price: 320000,
    acCable: {
      brand: "El-Sweedy",
      rating: "1x6",
      price: 54.67,
      quantity: 800,
      acEarthCable: {
        brand: "El-Sweedy",
        rating: "1x6",
        price: 54.67,
        quantity: 120,
      },
    },
    circuitBreaker: {
      brand: "ABB",
      rating: "10A-40A",
      price: 510,
      quantity: 360,
    },
  },
  {
    capacity: 45000,
    brand: "9 x 5.2kWp - MPPT",
    systemVoltage: 48,
    price: 360000,
    acCable: {
      brand: "El-Sweedy",
      rating: "1x6",
      price: 54.67,
      quantity: 900,
      acEarthCable: {
        brand: "El-Sweedy",
        rating: "1x6",
        price: 54.67,
        quantity: 135,
      },
    },
    circuitBreaker: {
      brand: "ABB",
      rating: "10A-40A",
      price: 510,
      quantity: 405,
    },
  },
];

const battery: OffGridBattery = {
  brand: "NewMax 200AH-12V LeadAcid Gel",
  cableCost: 300,
  price: 20000,
  meterString: 6,
  depthOfDischarge: 0.7,
  capacity: 200,
  voltage: 12,
  capacityVariances: [
    {
      hoursTillEmpty: 1,
      capacity: 132,
    },
    {
      hoursTillEmpty: 5,
      capacity: 174,
    },
    {
      hoursTillEmpty: 10,
      capacity: 190,
    },
    {
      hoursTillEmpty: 20,
      capacity: 200,
    },
  ],
  circuitBreaker: {
    brand: "ABB",
    rating: "200A",
    price: 5000,
    quantity: 1,
  },
};

export const offGridProduct: OffGrid = {
  name: "off-grid",
  currency: "EGP",
  isEnabled: true,
  parameters: {
    markup: 0.25,
    labourCost: 3000,
    battery: battery,
    inverters: inverters,
    deviceLoadTemplates,
    mc4: {
      brand: "Suntree",
      price: 60,
    },
    dcCable: {
      meterPerString: 20,
      price: 60,
      brand: "KBE",
      rating: "4mm2",
    },
    mountingPrice: 100,
    panel: {
      brand: "Tongwei Solar 555",
      powerOutputWatt: 555,
      pricePerWatt: 10.8,
      width: 1.14,
      switchBox: {
        brand: "ABB",
        price: 2000,
        citySpecificities: [],
      },
    },
    manualTransferSwitch: {
      brand: "ABB",
      rating: "10A-40A",
      price: 1000,
      quantity: 1,
    },
    fuse: {
      brand: "Suntree",
      price: 220,
    },
    flexible: {
      brand: "",
      quantity: 2,
      price: 600,
    },
    transportationCost: 2000,
    cleaningToolPrice: 800,
    batteryStandPrice: {
      insideHousePrice: 3000,
      outsideHousePerFourBatteriesPrice: 1400,
    },
    dollarRate: 1,
    billingPercentage: {
      downPaymentPercentage: 0.5,
      commissionPercentage: 0.05,
      componentsSupplyPercentage: 0.25,
      installationPercentage: 0.2,
    },
  },
};

export const solarIrrigation: SolarIrrigation = {
  name: "solar-irrigation",
  currency: "EGP",
  isEnabled: true,
  parameters: {
    pricePerkW: 17000,
  },
};

export const solarHeating: SolarHeating = {
  name: "solar-heating",
  currency: "EGP",
  isEnabled: true,
  parameters: {
    houseHoldHeaters: [
      {
        brand: "300l",
        price: 75000,
        maxNumberOfRooms: 4,
        litres: 180,
      },
      {
        brand: "300l",
        price: 95000,
        maxNumberOfRooms: 7,
        litres: 300,
      },
    ],
    poolHeaters: [
      {
        brand: "Heat Master I",
        price: 297500,
        minVolume: 15,
        maxVolume: 30,
      },
      {
        brand: "Heat Master II X20-26",
        price: 493750,
        minVolume: 30,
        maxVolume: 45,
      },
      {
        brand: "Heat Master III X20-40T",
        price: 618750,
        minVolume: 45,
        maxVolume: 80,
      },
      {
        brand: "Heat Master IV",
        price: 847500,
        minVolume: 80,
        maxVolume: 120,
      },
      {
        brand: "Heat Master V",
        price: 1643750,
        minVolume: 80,
        maxVolume: 120,
      },
    ],
  },
};

export const ev: EV = {
  name: "ev",
  currency: "EGP",
  isEnabled: true,
  parameters: {
    chargers: [
      {
        power: 7,
        price: 27000,
      },
      {
        power: 11,
        price: 29000,
      },
      {
        power: 22,
        price: 29000,
      },
    ],
  },
};

export const wholeSale: WholeSale = {
  name: "whole-sale",
  currency: "EGP",
  isEnabled: true,
  parameters: {},
};
