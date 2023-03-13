import { Menu } from "./Product";
import { User } from "./User";

export type Order = {
  id?: string;
  status: "done" | "canceled" | "delivering" | "making" | "waiting";
  payment_method?: "PIX" | "Cartão" | "Espécie";
  payment_date?: string;
  created_at: string;
  user?: User;
  product: Menu;
};

export type Orders = Array<Order>;

export const mockedOrders: Orders = [];
