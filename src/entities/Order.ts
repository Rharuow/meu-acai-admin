import { Menu } from "./Product";
import { User } from "./User";

export type OrderStatus =
  | "done"
  | "canceled"
  | "delivering"
  | "making"
  | "waiting";

export type Order = {
  id?: string;
  product_id: string;
  user_id: string;
  job_day_id: string;
  status: OrderStatus;
  payment_method?: "PIX" | "Cartão" | "Espécie";
  payment_date?: string;
  created_at: string;
  user: User;
  product: Menu;
};

export type Orders = Array<Order>;

export const mockedOrders: Orders = [];
