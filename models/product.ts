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

export type GridTier = Product<{
  sunHours: number;
  bosRate: number;
  markup: number;
  labourRate: number;
  cosPerWatt: number;
  panelWatt: number;
  mountingPrice: number;
  panelDegradation: number;
  invertors: { price: number; capacity: number }[];
}>;

/*
4.5 => sunHours 
0.3 => bosRate
13LE => cost per wattage
25 => markup
1600 kwh per kwp per year => specific prod
panel degredation => 80%
cost of panels = # number of panels * panel watt *

cost of wattage = cost of panels * cost per watt

cost of panels =  number of panels * panel wattage * cost per watt

invertor capacities = (0.8 * kwp ) >= (invBound) <= 1.2 * kwp

(20 , 20) diff up or down take

invertor capacity, price

5 -> # of panels * panel wattage * mounting price

6- labor rate * # of panels * panel wattage

7- bos = bosRate * (mounting struct + invertor + cost of panels)


8- Total cost = bos + invertor + panels + labour + mounting


9- selling price = total cost * markup

10- savings -> 1st year specific prod * kwp
25 year ((1st year savings) * 25 ) * 80%
*/
