import React, { useState } from "react";
import Switch from "react-switch";

import { mockedOrders } from "@/src/entities/Order";
import LastOrder from "./LastOrder";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);

  const waitingOrder = mockedOrders.find((order) => order.status === "making");

  const handleStatus = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="d-flex p-3 flex-wrap">
      <LastOrder isOpen={isOpen} />
    </div>
  );
}
