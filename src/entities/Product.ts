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
  size: Size;
  creams: Creams;
  visible: boolean;
  toppings?: Toppings;
  description?: string;
  extras?: Toppings;
  value: number;
};

export const mockedCreams: Creams = [
  { name: "Açai", id: "1", amount: 3, unit: "Litros" },
  { name: "Cupuaçu", id: "2", amount: 2, unit: "Litros" },
  { name: "Ninho", id: "3", amount: 2, unit: "Pacotes" },
  { name: "Oreo", id: "4", amount: 4, unit: "Caixa" },
  { name: "Ovomaltine", id: "5", amount: 1, unit: "Litros" },
  { name: "Ninho Trufa", id: "6", amount: 2, unit: "Litros" },
  { name: "Amendoim e Castanha", id: "7", amount: 3, unit: "Litros" },
];
