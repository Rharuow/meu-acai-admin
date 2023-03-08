import React from "react";
import LottiePlayer from "lottie-react";

import { Card } from "react-bootstrap";

import noOrder from "@/src/components/lottie/no-order.json";

function LastOrder() {
  return (
    <Card bg="secondary" className="w-100">
      <Card.Body className="d-flex flex-wrap justify-content-center">
        <LottiePlayer animationData={noOrder} />
        <div className="w-100 d-flex justify-content-center">
          <span className="fw-bold">Ná há pedidos!</span>
        </div>
      </Card.Body>
    </Card>
  );
}

export default LastOrder;
