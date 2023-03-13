import React from "react";
import LottiePlayer from "lottie-react";
import useSWR from "swr";
import { Card } from "react-bootstrap";

import { getOrders } from "@/src/service/docs/order";
import { useStoreContext } from "@/src/context/store";

import noOrder from "@/src/components/lottie/no-order.json";
import waitOrder from "@/src/components/lottie/waiting-order.json";

import ReactLoading from "@/src/rharuow-admin/components/ReactLoading";

function LastOrder() {
  const { data, isLoading, error } = useSWR("lastorders", getOrders);

  console.log(data);

  const { isOpen } = useStoreContext();

  return (
    <Card bg="secondary" className="w-100">
      <Card.Body className="d-flex flex-wrap justify-content-center">
        {isLoading ? (
          <ReactLoading type="spinningBubbles" color="#46295a" height={28} />
        ) : data && data?.length > 0 ? (
          <>
            {data.map((order) => (
              <span key={order.id}>{order.id}</span>
            ))}
          </>
        ) : (
          <>
            <div className="w-100 d-flex justify-content-center flex-wrap">
              <LottiePlayer animationData={isOpen ? waitOrder : noOrder} />
              <span className="fw-bold">
                {isOpen ? "Esperando por pedidos" : "Ná há pedidos!"}
              </span>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default LastOrder;
