import React from "react";

import { mockedOrders } from "@/src/entities/Order";
import LastOrder from "./LastOrder";

export default function HomePage() {
  const waitingOrder = mockedOrders.find((order) => order.status === "making");

  return (
    <div className="d-flex p-3 flex-wrap">
      <LastOrder />
    </div>
  );
}
