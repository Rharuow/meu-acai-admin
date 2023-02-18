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

export const mockedOrders: Orders = [
  {
    id: "1",
    job_day_id: "1",
    status: OrderStatus.done,
    product_id: "1",
    user_id: "1",
    created_at: "07/01/2023",
    payment_date: "07/01/2023",
    payment_method: "PIX",
    jobDay: mockedJobDay,
    user: mockedUser,
    product: mockedProduct,
  },
  {
    id: "2",
    job_day_id: "1",
    status: OrderStatus.done,
    product_id: "1",
    user_id: "1",
    created_at: "08/01/2023",
    payment_date: "08/01/2023",
    payment_method: "Cartão",
    jobDay: mockedJobDay,
    user: mockedUser,
    product: mockedProduct,
  },
  {
    id: "3",
    job_day_id: "1",
    status: OrderStatus.done,
    product_id: "1",
    user_id: "1",
    created_at: "09/01/2023",
    payment_date: "09/01/2023",
    payment_method: "Cartão",
    jobDay: mockedJobDay,
    user: mockedUser,
    product: mockedProduct,
  },
  {
    id: "4",
    job_day_id: "1",
    status: OrderStatus.done,
    product_id: "1",
    user_id: "1",
    created_at: "10/01/2023",
    payment_date: "10/01/2023",
    payment_method: "Cartão",
    jobDay: mockedJobDay,
    user: mockedUser,
    product: mockedProduct,
  },
  {
    id: "5",
    job_day_id: "1",
    status: OrderStatus.done,
    product_id: "1",
    user_id: "1",
    created_at: "11/01/2023",
    payment_date: "11/01/2023",
    payment_method: "Espécie",
    jobDay: mockedJobDay,
    user: mockedUser,
    product: mockedProduct,
  },
  {
    id: "6",
    job_day_id: "1",
    status: OrderStatus.making,
    product_id: "1",
    user_id: "1",
    created_at: "12/01/2023",
    jobDay: mockedJobDay,
    user: mockedUser,
    product: mockedProduct,
  },
  {
    id: "7",
    job_day_id: "1",
    status: OrderStatus.delivering,
    product_id: "1",
    user_id: "1",
    created_at: "12/01/2023",
    jobDay: mockedJobDay,
    user: mockedUser,
    product: mockedProduct,
  },
  {
    id: "8",
    job_day_id: "1",
    status: OrderStatus.done,
    product_id: "1",
    user_id: "1",
    created_at: "12/01/2023",
    jobDay: mockedJobDay,
    user: mockedUser,
    product: mockedProduct,
  },
  {
    id: "9",
    job_day_id: "1",
    status: OrderStatus.waiting,
    product_id: "1",
    user_id: "2",
    created_at: "12/01/2023",
    jobDay: mockedJobDay,
    user: mockedUser,
    product: mockedProduct,
  },
  {
    id: "10",
    job_day_id: "1",
    status: OrderStatus.waiting,
    product_id: "1",
    user_id: "1",
    created_at: "12/01/2023",
    jobDay: mockedJobDay,
    user: mockedUser,
    product: mockedProduct,
  },
];
