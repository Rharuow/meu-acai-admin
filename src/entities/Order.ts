import { JobDay, mockedJobDay } from "./JobDay";
import { mockedProduct, Product } from "./Product";
import { mockedUser, User } from "./User";

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
  product: Product;
  jobDay: JobDay;
};

export type Orders = Array<Order>;

export const mockedOrders: Orders = [];
