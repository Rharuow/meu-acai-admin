import LottiePlayer from "lottie-react";
import React from "react";
import { Card } from "react-bootstrap";

import noOrder from "@/src/components/lottie/no-order.json";

export default function Order() {
  return (
    <div>
      <Card bg="secondary">
        <Card.Body className="d-flex flex-wrap justify-content-center">
          <LottiePlayer animationData={noOrder} />
          <div className="w-100 d-flex justify-content-center">
            <span className="fw-bold">Ná há pedidos!</span>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
