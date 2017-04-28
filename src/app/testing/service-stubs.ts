import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export const fuelPriceServiceStub = {

  fuelPrices: [
    {
      name: "RON95",
      price: 2.20
    },
    {
      name: "RON97",
      price: 2.50
    },
    {
      name: "Diesel",
      price: 2.05
    },
    {
      name: "Euro 5 Diesel",
      price: 2.15
    }
  ],
  
  getFuelPrices: () => {
    return Observable.of(testFuelPrices);
  }

};

const testFuelPrices = [
  {
    name: "RON95",
    price: 2.20
  },
  {
    name: "RON97",
    price: 2.50
  },
  {
    name: "Diesel",
    price: 2.05
  },
  {
    name: "Euro 5 Diesel",
    price: 2.15
  }
]