import { Entity } from "./Entity";

export interface Topping extends Entity {
  name: string;
  value: number;
  amount: number;
  unit: string;
}

export type Toppings = Array<Topping>;

export type Cream = {
  id: string;
  name: string;
  amount: number;
  unit: string;
};

export type Creams = Array<Cream>;

export type Size = {
  id: string;
  name: string;
  value: number;
  amountCreams: number;
  amountOptions: number;
};

export type Menu = {
  id: string;
  name: string;
  sizes: Size[];
  creams: Creams;
  visible: boolean;
  toppings?: Toppings;
  description?: string;
  extras?: Toppings;
  value: number;
};
