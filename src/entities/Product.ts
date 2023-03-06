import { Entity } from "./Entity";

export interface Topping extends Entity {
  name: string;
  value: number;
  visible: boolean;
  amount: number;
  unit: string;
}

export type Toppings = Array<Topping>;

export type Cream = {
  id: string;
  name: string;
  visible: boolean;
  amount: number;
  unit: string;
};

export type Creams = Array<Cream>;

export type Size = {
  id: string;
  name: string;
  value: number;
  visible: boolean;
  amountCreams: number;
  amountOptions: number;
};

export type Menu = {
  id: string;
  name: string;
  size: Size;
  creams: Creams;
  visible: boolean;
  toppings?: Toppings;
  description?: string;
  extras?: Toppings;
  value: number;
};
