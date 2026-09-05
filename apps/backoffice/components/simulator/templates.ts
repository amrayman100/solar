import type { Inverter, OffGridInverter } from "@bolt-energy/models";

export const GRID_TIED_CITIES = [
  "Giza Governorate",
  "Cairo Governorate",
] as const;

export function blankGridTiedInverter(): Inverter {
  return {
    brand: "New inverter",
    price: 0,
    capacity: 5,
    acCable: {
      brand: "",
      price: 0,
      rating: "",
      quantity: 0,
      acEarthCable: {
        brand: "",
        rating: "",
        price: 0,
        quantity: 0,
      },
    },
    circuitBreaker: {
      brand: "",
      rating: "",
      price: 0,
      quantity: 0,
    },
    flexible: {
      brand: "",
      quantity: 0,
      price: 0,
    },
    vsn: { quantity: 0, price: 0 },
  };
}

export function blankOffGridInverter(): OffGridInverter {
  return {
    brand: "New inverter",
    price: 0,
    capacity: 1000,
    systemVoltage: 12,
    acCable: {
      brand: "",
      price: 0,
      rating: "",
      quantity: 0,
      acEarthCable: {
        brand: "",
        rating: "",
        price: 0,
        quantity: 0,
      },
    },
    circuitBreaker: {
      brand: "",
      rating: "",
      price: 0,
      quantity: 0,
    },
  };
}
