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

export type Product = {
	id?: string;
	size: Size;
	creams: Creams;
	toppings?: Toppings;
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

export const mockedSizes: Array<Size> = [
	{
		id: "1",
		name: "P",
		amountCreams: 2,
		amountOptions: 3,
		value: 10,
	},
	{
		id: "2",
		name: "M",
		amountCreams: 2,
		amountOptions: 3,
		value: 13,
	},
	{
		id: "3",
		name: "G",
		amountCreams: 2,
		amountOptions: 4,
		value: 16,
	},
	{
		id: "4",
		name: "GG",
		amountCreams: 3,
		amountOptions: 5,
		value: 19,
	},
];

export const mockedToppings: Toppings = [
	{
		name: "M&M",
		id: "1",
		value: 2,
		amount: 0,
		unit: "Pacotes",
	},
	{
		name: "Mousse Morango",
		id: "2",
		value: 2.5,
		amount: 0,
		unit: "Morangos",
	},
	{
		name: "Ovomaltine",
		id: "3",
		value: 1,
		amount: 0,
		unit: "Pacotes",
	},
	{
		name: "Choco Power",
		id: "4",
		value: 1,
		amount: 0,
		unit: "Pacotes",
	},
	{
		name: "Leite em pó",
		id: "5",
		value: 1,
		amount: 0,
		unit: "Sacos",
	},
	{
		name: "Farinha Lactea",
		id: "6",
		value: 1,
		amount: 0,
		unit: "Pacotes",
	},
	{
		name: "Granola",
		id: "7",
		value: 1,
		amount: 0,
		unit: "gramas",
	},
];

export const mockedExtras: Toppings = [
	{
		name: "M&M",
		id: "1",
		value: 2,
		amount: 0,
		unit: "Pacotes",
	},
	{
		name: "Mousse Morango",
		id: "2",
		value: 2.5,
		amount: 0,
		unit: "Morangos",
	},
	{
		name: "Ovomaltine",
		id: "3",
		value: 1,
		amount: 0,
		unit: "Pacotes",
	},
	{
		name: "Choco Power",
		id: "4",
		value: 1,
		amount: 0,
		unit: "Pacotes",
	},
	{
		name: "Leite em pó",
		id: "5",
		value: 1,
		amount: 0,
		unit: "Sacos",
	},
	{
		name: "Farinha Lactea",
		id: "6",
		value: 1,
		amount: 0,
		unit: "Pacotes",
	},
	{
		name: "Granola",
		id: "7",
		value: 1,
		amount: 0,
		unit: "gramas",
	},
];

export const mockedProduct: Product = {
	id: "1",
	creams: [mockedCreams[0], mockedCreams[1]],
	extras: [mockedToppings[2], mockedToppings[3]],
	size: mockedSizes[0],
	toppings: [mockedToppings[0], mockedToppings[1]],
	value:
		mockedSizes[0].value + mockedToppings[0].value + mockedToppings[1].value,
};
