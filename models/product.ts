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

export type OffGridInverter = Omit<
  Inverter,
  "acCable" | "circuitBreaker" | "flexible" | "vsn"
> & {
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

export type OffGridProposalDetails = {};

export type DeviceLoadTemplate = {
  name: string;
  hasSurgePower: boolean;
  powerWatt: number;
};

export type DeviceLoad = DeviceLoadTemplate & {
  quantity: number;
  workingHours?: number;
  morningHours?: number;
  eveningHours?: number;
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
};

export type OffGridParams = {
  isConnectedToGrid: boolean;
  panel: Panel;
  deviceLoadTemplates: Array<DeviceLoadTemplate>;
};

export type GridTied = Product<GridTiedParams>;

export type GridTiedProposal = ProductProposal<GridTiedProposalDetails>;

export type OffGridProposal = ProductProposal<OffGridProposalDetails>;

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
  return (battery.capacity * inverter.systemVoltage) / totalPower;
}

function isBetween(n: number, a: number, b: number) {
  return (n - a) * (n - b) <= 0;
}

export function calculateRealBatteryCapacityInterpolation(
  battery: OffGridBattery,
  actualC: number
) {
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
    return null;
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
  totalEnergyNeeded: number,
  realBatteryCapacity: number
) {
  return roundToDec(
    totalEnergyNeeded /
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
  return roundToDec(numberOfStrings * inverter.systemVoltage * battery.voltage);
}

export function calculateSolarEnergyNeeded(
  deviceLoads: Array<DeviceLoad>,
  totalPower: number
) {
  let solarEnergyNeeded = 0;
  deviceLoads.forEach((device) => {
    totalPower = device.powerWatt * device.quantity;
    solarEnergyNeeded +=
      (device.morningHours || 0 + (device.eveningHours || 0)) * totalPower;
  });

  return solarEnergyNeeded;
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

// off grid

// inputs = { load is a dropdown list of  // air conditoner ///}

// 7agat be mawateer (ac, fridge , fan, water motor , shutter) or not ()
// ac with invertor is mawteer

//watt -> HP

//hp to watt -> hp * 0.745 * 1000

// total of each item

// each item as surge power

// surge factor

// check #1 total power

// check surge = 1.5 * 5000

/*
1.75 * 5000 >= surgePower


baseline battery => invertor
12v battery


system voltage = for 5000 48 => invertor

numberOFBatteries => system voltage / 12

isElectrictySuppliedByGov => are you connected (utlity grid) to the goverment grid/electricty


isElectrictySuppliedByGov yes => working hours


isElectrictySuppliedByGov yes => morning hours , evening hours

for each item
battery capacity need => working hour * total capacity

total battery capacity needed = battery capacity need += (1---n)

battery ( rateBatteryCapacity : 200, volt: 12, real capacites : [(20,200), (10,190)])

1,5,20 => ratedTimeForBatteryToDischarge
200,190,174,132 -> realratedCapacityBattery

timeForDisachargeBattery: ratedBattery * systemVoltage / total power loaf


x = 

real battery capacity = (((x - smallRatedTime) * ratedLarge)) + ((ratedLarge - x) * ratedSmall)) / (largeRated - smallRated )


invertor for off grid -> circuit breaker quantity
manual transfer switch



*/

/*


  #1 do you have a utility grid? (do you have a govermental source of electricty) yes/no    utilityGrid
  yes => solar panels number = 0
  no => we will calculate solar panels

  yes => show working hours column only
  no => show evening hours and morning hours



  #2 User enters his loads (loads of electricty devices) (use from predefined tables (can edit the power) or other)
    => then calculate total power (sum) (will be used for the invertor)
    => surge power (fridge -> shutter) surge power = total power * 3 (will save field hasSurgedMotor)
    => surge power summation 

  #3 choose invertor
     invertor power > totalPower && (invertor power * 1.8) > surge power


  #4 batteries
    => invertor power , invertor system voltage
    => battery calculation => utilityGrid => true =>
    if(utilityGrid) {
      energy needed => total power * working hours (for each load)
      totalEnergyCapacityNeeded = summ( battery capacitty for all loads)

      // Bbattey will will use is 200

      batttery rated C (hours of emptying) = 20, 10, 5, 1
      battery rated capacity (ma5zoon) = 200, 190, 174, 132


      actualC = (batteryCapacity(200 msln) * invertorSystemVoltage) / totalPower

      example actualC = 3

      Interpolation 

      realBatteryCapacity = ((actaulC - 1) * 174 ) + ((5 - actualC) * 132)) / (actualC - 1) + (5 - actualC)

      numberOfStrings = totalEnergyNeeded / round(invertorSystemVoltage * depthOfDischarge * realBatteryCapacity)

      numberOfBatteries =  numberOfStrings * (invertorSystemVoltage * batteryVoltage)
    } 
    else {

      energy needed => morning hours * total power * 0.2(variable) + evening hours * total power
      totalEnergyCapacityNeeded = summ( battery capacitty for all loads)

      actualC = (batteryCapacity(200 msln) * invertorSystemVoltage) / totalPower

      example actualC = 3

      Interpolation 

      realBatteryCapacity = ((actaulC - 1) * 174 ) + ((5 - actualC) * 132)) / (actualC - 1) + (5 - actualC)

      numberOfStrings = totalEnergyNeeded / round(invertorSystemVoltage * depthOfDischarge * realBatteryCapacity)

      numberOfBatteries =  numberOfStrings * (invertorSystemVoltage * batteryVoltage)


      // here we need solar //

      solarNeededEngergy = (morning hours + evening hours) * total power (summation for all loads)

      numberOfPanels = solarNeededEnergy / sunHours * panel.powerOutputWatt (panel rating) => lazem yet2sem 3ala 2 law 9 5aly 10

      if(numberOfPanels * panel.powerOutputWatt  > inverter.Capacity) {

        pricing += chargeController (fixed 5000 geneh)
      }



    }






*/

/*

battery = {
  batteryCapacity,
  batteryVoltage
}



*/
