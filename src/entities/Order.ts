import { JobDay } from "./JobDay";
import { Menu } from "./Product";
import { User } from "./User";

export enum OrderStatus {
  "done" = "done",
  "canceled" = "canceled",
  "delivering" = "delivering",
  "making" = "making",
  "waiting" = "waiting",
}

export type Order = {
  id: string;
  product_id: string;
  user_id: string;
  job_day_id: string;
  status: OrderStatus;
  payment_method?: "PIX" | "Cartão" | "Espécie";
  payment_date?: string;
  created_at: string;
  user: User;
  product: Menu;
  jobDay: JobDay;
};

export type Orders = Array<Order>;

export const mockedOrders: Orders = [];
